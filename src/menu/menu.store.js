import { writable, get, derived } from 'svelte/store';
import { connected } from '../data/vis.service.js';

let defaultTabs = [];

export let selected = writable('');

let defaultTab = setTimeout(() => {
  selected.set(defaultTabs[0] || 'help');
}, 500);

export let tabs = writable(defaultTabs);

function enableRealtime() {
  clearTimeout(defaultTab);
  let t = get(tabs);
  t.unshift('Realtime');
  tabs.set(t);
  selected.set('Realtime');
}

if (connected) {
  enableRealtime();
}

export const options = derived(
  tabs,
  ($tabs) => {
    return $tabs
      .map((val) => {
        let l = val.toLowerCase();
        if (l === 'realtime') {
          return l;
        }
      })
      .filter((item) => item);
  },
  []
);
