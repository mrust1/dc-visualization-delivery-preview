import {init, form} from 'dc-visualization-sdk';
import { get } from 'svelte/store';
import { depth, format } from "../settings/settings.store";
class VisService {
  constructor() {}
  
  async fetchContent() {
    return await form.get({
      format: get(format),
      depth: get(depth)
    });
  }

  listenForChanges(method) {
    return form.changed(method, {
      format: get(format),
      depth: get(depth)
    });
  }

  async connect() {
    await init();
    return true;
  }
}

export const visService = new VisService();