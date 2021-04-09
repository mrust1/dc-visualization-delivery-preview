import wretch from 'wretch';

export class CDService {
  constructor({ vse, depth, format, locale, id, v2, store, hub }) {
    this.id = id;
    this.depth = depth;
    this.format = format;
    this.locale = locale;
    this.vse = vse;
    this.v2 = v2;
    this.store = store;
    this.hub = hub;
  }
  constructBase(live) {
    if(live){
      return this.v2
      ? `https://${this.hub}.cdn.content.amplience.net/content/id/`
      : `https://cdn.c1.amplience.net/cms/content/query/`;
    } else {
      return this.v2
      ? `https://${this.vse}/content/id/`
      : `https://${this.vse}/cms/content/query/`;
    }
  }

  constructFullPath(live) {
    return this.v2 ? this.cdv2(live) : this.cdv1(live);
  }

  cdv1(live) {
    let query = {
      'sys.iri': `http://content.cms.amplience.com/${this.id}`,
    };
    let scope = this.depth === 'root' ? 'root' : 'tree';
    let fullBodyObject = this.format === 'linked' ? 'false' : 'true';
    return `${this.constructBase(live)}?query=${encodeURI(JSON.stringify(query))}&store=${
      this.store
    }&scope=${scope}&fullBodyObject=${fullBodyObject}`;
  }

  cdv2(live) {
    let url = `${this.constructBase(live)}${this.id}?depth=${this.depth}&format=${
      this.format
    }`;
    if (this.locale) {
      url = `${url}&locale=${this.locale}`;
    }
    return url;
  }

  setParams({ format, depth, v2, store }) {
    this.format = format;
    this.depth = depth;
    this.v2 = v2;
    this.store = store;
  }

  async fetchContent(live) {
    if(this.id==='{{content.sys.id}}' || this.id!==undefined) {
      throw(new Error('no content item'));
    }
    let content = await wretch(this.constructFullPath(live)).get().json();
    return content;
  }
}
