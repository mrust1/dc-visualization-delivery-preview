import { writable, get, derived } from 'svelte/store';
import { vse, id, hub} from "../settings/urlparams";
import { connected } from "../data/vis.service.js";

let defaultTabs = [];

if(canFetchStaged()) {
  defaultTabs.push('Staged');
}

if(canFetchPublished()) {
  defaultTabs.push('Live');
}

if(canFetchStaged() && canFetchPublished()) {
  defaultTabs.push('Diff');
}

export let selected = writable('');

let defaultTab = setTimeout(()=>{
  selected.set(defaultTabs[0] || 'help');
}, 500);

export let tabs = writable(defaultTabs);

function canFetchStaged() {
  return vse && id;
}

function canFetchPublished() {
  return hub && id;
}

function enableRealtime() {
  clearTimeout(defaultTab);
  let t = get(tabs);
  if (t.indexOf('Diff') === -1 && (canFetchStaged() || canFetchPublished())) {
    t.push('Diff');
  }
  t.unshift('Realtime');
  tabs.set(t);
  selected.set('Realtime');
}

connected.subscribe((c)=>{
  if(!c) {
    return;
  }
  enableRealtime();
})

export const options = derived(tabs, ($tabs) => {
	return $tabs.map((val)=>{
    let l = val.toLowerCase()
    if(l === 'realtime' || l === 'live' || l === 'staged') {
      return l;
    }
  }).filter(item => item);
}, []);