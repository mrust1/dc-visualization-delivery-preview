import {init, form} from 'dc-visualization-sdk';

export class VisService {
  constructor({ vse, depth, format, locale, id, v2, store }) {
    this.id = id;
    this.depth = depth;
    this.format = format;
    this.locale = locale;
    this.vse = vse;
    this.v2 = v2;
    this.store = store;
    this.subscribed = false;
    this.options = {
      format: 'linked',
      depth: 'all'
    }
  }

  setParams({ format, depth, v2, store }) {
    this.format = format;
    this.depth = depth;
    this.v2 = v2;
    this.store = store;
  }

  async fetchContent() {
    return await form.get(this.options);
  }

  listenForChanges(method) {
    if(!this.subscribed) {
      form.changed(method, this.options);
      this.subscribed = true;
    }
  }

  async connect() {
    await init();
    return true;
  }
}
