import wretch from 'wretch';
import { get } from 'svelte/store';
import {
  id,
  vse,
  format,
  locale,
  depth,
  hub,
} from '../settings/settings.store';
class CDService {
  constructor() {}

  constructFullPath(live) {
    return this.cdv2(live);
  }

  cdv2(live) {
    let url = `${this.constructBase(live)}${get(id)}?depth=${get(
      depth
    )}&format=${get(format)}`;
    if (get(locale)) {
      url = `${url}&locale=${get(locale)}`;
    }
    return url;
  }

  constructBase(live) {
    if (live) {
      return `https://${get(hub)}.cdn.content.amplience.net/content/id/`;
    } else {
      return `https://${get(vse)}/content/id/`;
    }
  }

  async fetchContent(live) {
    if (get(id) === '{{content.sys.id}}' || get(id) === undefined) {
      throw new Error('no content item');
    }
    console.log(this.constructFullPath(live))
    let content = await wretch(this.constructFullPath(live)).get().json();
    return content;
  }
}

export const cdService = new CDService();
