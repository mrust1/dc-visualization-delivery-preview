import { writable, get } from 'svelte/store';
import { cdService } from './cd.service.js';
import { visService, connected } from './vis.service.js';
import { selected } from '../menu/menu.store';
import { depth, hub, format, locale } from '../settings/settings.store';
export let mainContent = writable();
export let secondaryContent = writable();
export let base = writable('live');
export let compare = writable('staged');
export let options = writable(['live', 'staged', 'realtime']);
let unsubscribe;
let unsubSettings;
let unsubSave;
let unsubLocale;
let clearAll = [];

visService.connect();

export const stagedData = async () => {
  if (get(connected)) {
    unsubSave = visService.listenForSave(async () => {
      mainContent.set(await loadData());
    });
    unsubLocale = visService.listenForLocaleChange(async () => {
      mainContent.set(await loadData());
    });
  }
  return mainContent.set(await loadData());
};

export const visData = async () => {
  unsubscribe = visService.listenForChanges((change) => {
    mainContent.set(change);
  });
  return mainContent.set(await visService.fetchContent());
};

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
          message: e.message,
        },
      };
    }
    return val;
  }
};

const update = async () => {
  const s = get(selected);
  if (unsubscribe) {
    unsubscribe();
  }
  if (unsubSettings) {
    unsubSettings();
  }
  if (unsubSave) {
    unsubSave();
  }
  if (unsubLocale) {
    unsubLocale();
  }

  clearAll.forEach((item) => item());
  clearAll = [];

  if (s === 'Live') {
    mainContent.set(await loadData(true));
  } else if (s === 'Staged') {
    stagedData();
  } else if (s === 'Realtime') {
    visData();
  } else if (s === 'Diff') {
    switch (get(compare)) {
      case 'live':
        mainContent.set(await loadData(true));
        break;
      case 'staged':
        mainContent.set(await loadData());
        if (get(connected)) {
          clearAll.push(
            visService.listenForSave(async () => {
              mainContent.set(await loadData());
            })
          );
        }
        break;
      case 'realtime':
        mainContent.set(await visService.fetchContent());
        if (get(connected)) {
          clearAll.push(
            visService.listenForChanges((change) => {
              mainContent.set(change);
            })
          );
        }
        break;
    }

    switch (get(base)) {
      case 'live':
        secondaryContent.set(await loadData(true));
        break;
      case 'staged':
        secondaryContent.set(await loadData());
        if (get(connected)) {
          clearAll.push(
            visService.listenForSave(async () => {
              secondaryContent.set(await loadData());
            })
          );
        }
        break;
      case 'realtime':
        secondaryContent.set(await visService.fetchContent());
        if (get(connected)) {
          clearAll.push(
            visService.listenForChanges((change) => {
              secondaryContent.set(change);
            })
          );
        }
        break;
    }
  }
};

selected.subscribe(update);
locale.subscribe(update);
depth.subscribe(update);
hub.subscribe(update);
format.subscribe(update);
base.subscribe(update);
compare.subscribe(update);
