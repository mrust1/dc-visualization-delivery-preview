import wretch from 'wretch';
import { get } from 'svelte/store';
import {id, vse, format, locale, depth, v2, store, hub} from "../settings/settings.store";
import params from '../settings/urlparams';
class CDService {

  constructor() {

  }

  constructBase(live) {
    if(live){
      return get(v2)
      ? `https://${get(hub)}.cdn.content.amplience.net/content/id/`
      : `https://cdn.c1.amplience.net/cms/content/query/`;
    } else {
      return get(v2)
      ? `https://${get(vse)}/content/id/`
      : `https://${get(vse)}/cms/content/query/`;
    }
  }

  constructFullPath(live) {
    return get(v2) ? this.cdv2(live) : this.cdv1(live);
  }

  cdv1(live) {
    let query = {
      'sys.iri': `http://content.cms.amplience.com/${get(id)}`,
    };
    let scope = get(depth) === 'root' ? 'root' : 'tree';
    let fullBodyObject = get(format) === 'linked' ? 'false' : 'true';
    return `${this.constructBase(live)}?query=${encodeURI(JSON.stringify(query))}&store=${
      get(store)
    }&scope=${scope}&fullBodyObject=${fullBodyObject}`;
  }

  cdv2(live) {
    let url = `${this.constructBase(live)}${get(id)}?depth=${get(depth)}&format=${
      get(format)
    }`;
    if (get(locale)) {
      url = `${url}&locale=${get(locale)}`;
    }
    return url;
  }

  async fetchContent(live) {
    if(get(id)==='{{content.sys.id}}' || get(id) === undefined) {
      throw(new Error('no content item'));
    }
    let content = await wretch(this.constructFullPath(live)).get().json();
    return content;
  }
}

export const cdService = new CDService();