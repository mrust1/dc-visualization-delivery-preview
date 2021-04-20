import { writable, get } from 'svelte/store';
import { cdService } from "./cd.service.js";
import { visService } from "./vis.service.js";
import { selected, hasConnected } from "../menu/menu.store";
import { depth, hub, format } from "../settings/settings.store";
export let mainContent = writable({});
export let secondaryContent = writable({});
export let connected = writable(false);
let unsubscribe;
let unsubSettings;
let unsubSave;

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

  if(s === 'Published') {
    mainContent.set(await loadData(true));
  } else if(s === 'Staged') {
    saveData();
  } else if(s === 'Realtime') {
    visData();
    settingsData();
  } else if(s === 'Diff') {
    mainContent.set(await loadData())
    secondaryContent.set(await loadData(true));
  }
}

visService.connect().then((e)=>{if(e===true){
  connected.set(true);
  hasConnected();
}});

selected.subscribe(update);
depth.subscribe(update);
hub.subscribe(update);
format.subscribe(update);


export const saveData = async () => {
  if(visService.connected) {
    unsubSave = visService.listenForSave((change)=>{
      mainContent.set(await visService.fetchContent());
    });
  }
  return mainContent.set(await visService.fetchContent());
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