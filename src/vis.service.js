import {init, form} from 'dc-visualization-sdk';

class VisService {
  constructor() {
    this.options = {
      format: 'linked',
      depth: 'all'
    }
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

export const visService = new VisService();