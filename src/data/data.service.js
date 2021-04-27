import { writable, get } from 'svelte/store';
import { cdService } from "./cd.service.js";
import { visService, connected } from "./vis.service.js";
import { selected } from "../menu/menu.store";
import { depth, hub, format } from "../settings/settings.store";
export let mainContent = writable({});
export let secondaryContent = writable({});
let unsubscribe;
let unsubSettings;
let unsubSave;
let unsubLocale;

visService.connect();

export const stagedData = async () => {
  if(get(connected)) {
    unsubSave = visService.listenForSave(async (change)=>{
      mainContent.set(await loadData());
    });
    unsubLocale = visService.listenForLocaleChange(async (change)=>{
      mainContent.set(await loadData());
    });
  }
  return mainContent.set(await loadData());
}

export const settingsData = async () => {
  unsubSettings = visService.listenForSettingsChanges((change)=>{
    secondaryContent.set(settings);
  });
  return secondaryContent.set(await visService.fetchsettings());
}

export const visData = async () => {
  unsubscribe = visService.listenForChanges((change)=>{
    mainContent.set(change);
  });
  return mainContent.set(await visService.fetchContent());
}

export const loadData = async (live) => {
  let val;
  try {
    val = await cdService.fetchContent(live);
    return val;
  } catch (e) {

    try {
      val = JSON.parse(e.message);
    } catch (b) {
      val = {
        error: {
          message: e.message
        },
      };
    }
    return val;
  }
};

const update = async () => {
  const s = get(selected);
  if(unsubscribe) {
    unsubscribe();
  }
  if(unsubSettings){
    unsubSettings();
  }
  if(unsubSave){
    unsubSave();
  }
  if(unsubLocale){
    unsubLocale();
  }

  if(s === 'Published') {
    mainContent.set(await loadData(true));
  } else if(s === 'Staged') {
    stagedData();
  } else if(s === 'Realtime') {
    visData();
    settingsData();
  } else if(s === 'Diff') {
    mainContent.set(await loadData())
    secondaryContent.set(await loadData(true));
  }
}

selected.subscribe(update);
depth.subscribe(update);
hub.subscribe(update);
format.subscribe(update);



