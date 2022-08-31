import { writable, get } from 'svelte/store';
import { visService } from './vis.service.js';
import { selected } from '../menu/menu.store';
import { depth, hub, format, locale } from '../settings/settings.store';
export let mainContent = writable();
export let base = writable('live');
export let options = writable(['realtime']);
let unsubscribe;

let clearAll = [];

visService.connect();

export const visData = async () => {
  unsubscribe = visService.listenForChanges((change) => {
    console.log('change', change);
    mainContent.set(change);
  });
  var result = await visService.fetchContent();
  return mainContent.set(result);
};

const update = async () => {
  const s = get(selected);
  if (unsubscribe) {
    unsubscribe();
  }

  clearAll.forEach((item) => item());
  clearAll = [];
  /*
  if (s === 'Live') {
    mainContent.set(await loadData(true));
  }  else */
  if (s === 'Realtime') {
    visData();
  }
};

selected.subscribe(update);
locale.subscribe(update);
depth.subscribe(update);
hub.subscribe(update);
format.subscribe(update);
base.subscribe(update);
