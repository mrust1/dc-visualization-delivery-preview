import {init, form} from 'dc-visualization-sdk';
export 
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
    return form.changed(method, this.options);
  }

  async connect() {
    await init();
    return true;
  }
}

export const visService = new VisService();