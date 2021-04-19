import { writable, get } from 'svelte/store';
import { vse, id, hub} from "../settings/urlparams";

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

function canFetchStaged() {
  return vse && id;
}

function canFetchPublished() {
  return hub && id;
}

export function hasConnected() {
  let t = get(tabs);
  if (t.indexOf('Diff') === -1 && (canFetchStaged() || canFetchPublished())) {
    t.push('Diff');
  }
  t.unshift('Realtime');
  tabs.set(t);
  selected.set('Realtime');
}
export let tabs = writable(defaultTabs);
export let selected = writable('Live');
