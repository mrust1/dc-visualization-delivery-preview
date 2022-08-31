import { init } from 'dc-visualization-sdk';
import { writable } from 'svelte/store';

export const connected = new writable(false);
export const timeout = new writable(false);
class VisService {
  constructor() {
    this.sdk;
    this.lastSuccess;
  }

  async fetchContent() {
    let content;
    try {
      content = await this.sdk.form.get({
        format: 'inlined',
        depth: 'all',
        allowInvalid: true,
      });
      console.log('fetchContent : ', content);
      this.lastSuccess = content;
    } catch (e) {
      content = this.lastSuccess || {};
      console.error(e);
    }
    console.log('fetchContent2   : ', content);
    return content;
  }

  async fetchsettings() {
    console.log('fetchsettings ');
    return await this.sdk.settings.get();
  }

  listenForSave(method) {
    console.log('listenForSave : ', method);
    return this.sdk.form.saved(
      (c) => {
        this.lastSuccess = c;
        method(c);
      },
      {
        format: 'inlined',
        depth: 'all',
      }
    );
  }

  listenForLocaleChange(method) {
    console.log('listenForLocaleChange : ', method);
    return this.sdk.locale.changed(method);
  }

  async fetchLocale() {
    console.log('fetchLocale - ');
    return await this.sdk.locale.get();
  }

  listenForSettingsChanges(method) {
    console.log('listenForSettingsChanges : ', method);
    return this.sdk.settings.changed(method);
  }

  listenForLocaleChanges(method) {
    console.log('listenForLocaleChanges 2 : ', method);
    return this.sdk.locale.changed(method);
  }

  listenForChanges(method) {
    console.log('listenForChanges 2 : ', method);
    return this.sdk.form.changed(
      (c) => {
        this.lastSuccess = c;
        console.log('listenForChanges 2  -- : ', c);
        method(c);
      },
      {
        format: 'inlined',
        depth: 'all',
        allowInvalid: true,
      }
    );
  }

  async connect() {
    const t = setTimeout(() => {
      timeout.set(true);
    }, 5000);
    try {
      const sdk = await init({
        debug: true,
      });
      this.sdk = sdk;
      console.log('connect : sdk : ', sdk);
      connected.set(true);
      clearTimeout(t);
      return true;
    } catch (e) {
      console.error(e);
    }
  }
}

export const visService = new VisService();
