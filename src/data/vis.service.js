import { init } from "dc-visualization-sdk";
import { writable, get } from "svelte/store";
import { depth, format } from "../settings/settings.store";

export const connected = new writable(false);
export const timeout = new writable(false);
class VisService {
  constructor() {
    this.sdk;
  }

  async fetchContent() {
    return await this.sdk.form.get({
      format: get(format),
      depth: get(depth),
    });
  }

  async fetchsettings() {
    return await this.sdk.settings.get();
  }

  listenForSave(method) {
    return this.sdk.form.saved(method, {
      format: get(format),
      depth: get(depth),
    });
  }

  listenForLocaleChange(method) {
    return this.sdk.locale.changed(method);
  }

  async fetchLocale() {
    return await this.sdk.locale.get();
  }

  listenForSettingsChanges(method) {
    return this.sdk.settings.changed(method);
  }

  async fetchlocale() {
    return await this.sdk.locale.get();
  }

  listenForLocaleChanges(method) {
    return this.sdk.locale.changed(method);
  }

  listenForChanges(method) {
    return this.sdk.form.changed(method, {
      format: get(format),
      depth: get(depth),
    });
  }

  async connect() {
    const t = setTimeout(() => {
      timeout.set(true);
    }, 5000);
    try {
      const sdk = await init();
      this.sdk = sdk;
      connected.set(true);
      clearTimeout(t);
      return true;
    } catch (e) {
      console.error(e);
    }
  }
}

export const visService = new VisService();
