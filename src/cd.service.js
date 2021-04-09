import wretch from 'wretch';

export class CDService {
  constructor({ vse, depth, format, locale, id, v2, store }) {
    this.id = id;
    this.depth = depth;
    this.format = format;
    this.locale = locale;
    this.vse = vse;
    this.v2 = v2;
    this.store = store;
  }

  constructBase() {
    return this.v2
      ? `https://${this.vse}/content/id/`
      : `https://${this.vse}/cms/content/query/`;
  }

  constructFullPath() {
    return this.v2 ? this.cdv2() : this.cdv1();
  }

  cdv1() {
    let query = {
      'sys.iri': `http://content.cms.amplience.com/${this.id}`,
    };
    let scope = this.depth === 'root' ? 'root' : 'tree';
    let fullBodyObject = this.format === 'linked' ? 'false' : 'true';
    return `${this.constructBase()}?query=${encodeURI(JSON.stringify(query))}&store=${
      this.store
    }&scope=${scope}&fullBodyObject=${fullBodyObject}`;
  }

  cdv2() {
    let url = `${this.constructBase()}${this.id}?depth=${this.depth}&format=${
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

  async fetchContent() {
    if(this.id==='{{content.sys.id}}' || this.id!==undefined) {
      throw(new Error('no content item'));
    }
    let content = await wretch(this.constructFullPath(this.id)).get().json();
    return content;
  }
}
