import { init, form, settings } from 'dc-visualization-sdk';
import { get } from 'svelte/store';
import { depth, format } from "../settings/settings.store";
class VisService {
  constructor() {
    this.connected = false;
  }
  
  async fetchContent() {
    return await form.get({
      format: get(format),
      depth: get(depth)
    });
  }

  async fetchsettings() {
    return await settings.get();
  }

  listenForSave(method) {
    return form.saved(method, {
      format: get(format),
      depth: get(depth)
    });
  }

  listenForSettingsChanges(method) {
    return settings.changed(method);
  }

  async fetchlocale() {
    return await locale.get();
  }

  listenForLocaleChanges(method) {
    return locale.changed(method);
  }

  listenForChanges(method) {
    return form.changed(method, {
      format: get(format),
      depth: get(depth)
    });
  }

  async connect() {
    await init();
    this.connected = true;
    return true;
  }
}

export const visService = new VisService();