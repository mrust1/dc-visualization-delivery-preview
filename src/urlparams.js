import * as settings from "./settings.store";
const sparams = new URLSearchParams(window.location.search);
const vse = sparams.get('vse');
const id = sparams.get('id');
const v2 = sparams.get('v2') !== 'false';
const hub = sparams.get('hub');
// once we have Nullish Coalescing, this will look much nicer
const store =
  sparams.get('store') && sparams.get('store') !== ''
    ? sparams.get('store')
    : 'store';
const format =
  sparams.get('format') && sparams.get('format') !== ''
    ? sparams.get('format')
    : 'inlined';
const depth =
  sparams.get('depth') && sparams.get('depth') !== ''
    ? sparams.get('depth')
    : 'all';
const locale = sparams.get('locale');
settings.vse.set(vse);
settings.id.set(id);
settings.v2.set(v2);
settings.hub.set(hub);
settings.store.set(store);
settings.format.set(format);
settings.depth.set(depth);
settings.locale.set(locale);
export { vse, id, format, depth, locale, v2, store, hub};
