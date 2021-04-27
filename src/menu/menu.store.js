import { writable, get } from 'svelte/store';
import { vse, id, hub} from "../settings/urlparams";
import { connected } from "../data/vis.service.js";

let defaultTabs = [];

if(canFetchStaged()) {
  defaultTabs.push('Staged');
}

if(canFetchPublished()) {
  defaultTabs.push('Published');
}

if(canFetchStaged() && canFetchPublished()) {
  defaultTabs.push('Diff');
}

export let selected = writable('');

let defaultTab = setTimeout(()=>{
  selected.set(defaultTabs[0])
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