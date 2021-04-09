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
export { vse, id, format, depth, locale, v2, store, hub};
