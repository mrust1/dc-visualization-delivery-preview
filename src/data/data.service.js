import { writable, get } from 'svelte/store';
import { cdService } from "./cd.service.js";
import { visService } from "./vis.service.js";
import { selected, hasConnected } from "../menu/menu.store";
import { depth, hub, format } from "../settings/settings.store";
export let mainContent = writable({});
export let secondaryContent = writable({});
export let connected = writable(false);

const update = async () => {
  const s = get(selected);
  if(unsubscribe) {
    unsubscribe();
  }
  if(s === 'Published') {
    mainContent.set(await loadData(true));
  } else if(s === 'Staged') {
    mainContent.set(await loadData());
  } else if(s === 'Realtime') {
    mainContent.set(await visData());
  } else if(s === 'Diff') {
    mainContent.set(await loadData())
    secondaryContent.set(await loadData(true));
  }
}

let unsubscribe;
visService.connect().then((e)=>{if(e===true){
  connected.set(true);
  hasConnected();
}});

selected.subscribe(update);
depth.subscribe(update);
hub.subscribe(update);
format.subscribe(update);

export const visData = async () => {
  unsubscribe = visService.listenForChanges((change)=>{
    mainContent.set(change);
  });
  return await visService.fetchContent()
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