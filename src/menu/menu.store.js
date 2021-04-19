import { writable, get } from 'svelte/store';
import { vse, id, store, hub} from "../settings/urlparams";
import { connected } from "../data/data.service";

let defaultTabs = [];
if(vse && id) {
  defaultTabs.push('Staged');
}

if(hub && id) {
  defaultTabs.push('Published');
}

if(hub && id && vse) {
  defaultTabs.push('Diff');
}

export let tabs = writable(defaultTabs);
export let selected = writable('Live');

connected.subscribe(connected => {
  if(connected) {
    let t = get(tabs);
    if (t.indexOf('Diff') === -1 && ((hub && id) || (vse && id))) {
      t.push('Diff');
    }
    t.unshift('Realtime');
    tabs.set(t);
    selected.set('Realtime');
  }
});

