<script>
  import CheckMark from './CheckMark.svelte';
  import UpdateAlert from './UpdateAlert.svelte';
  import Spinner from 'svelte-spinner';
  import { visService, connected, timeout } from '../data/vis.service';
  import { locale } from '../settings/settings.store';

  let settings = { devices: [] };
  let device = '';
  let deliveryKey = '';
  let editIcon = '';
  let saveIcon = '';
  let snapshotId = null;
  let contentTypeUri = '';
  let contentItemId = '';

  timeout.subscribe(async (t) => {
    if (!t) {
      return;
    }
  });

  connected.subscribe(async (c) => {
    if (!c) {
      return;
    }
    visService.sdk.form.changed(() => flash(editIcon), { allowInvalid: true });
    visService.sdk.form.saved(() => flash(saveIcon));
    settings = await visService.sdk.settings.get();
    locale.set(await visService.sdk.locale.get());
    device = await visService.sdk.device.get();
    const context = await visService.sdk.context.get();

    deliveryKey = context.deliveryKey;
    snapshotId = context.snapshotId;
    contentItemId = context.contentId;
    contentTypeUri = context.contentTypeUri;

    visService.sdk.device.changed((value) => (device = value));
    visService.sdk.locale.changed((value) => locale.set(value));
    visService.sdk.context.changed((value) => {
      deliveryKey = value.deliveryKey;
      snapshotId = value.snapshotId;
      contentItemId = value.contentId;
      contentTypeUri = value.contentTypeUri;
    });
  });

  function flash(element) {
    requestAnimationFrame(() => {
      // instant red bg flash in
      element.style.transition = 'none';
      element.style.fill = 'rgba(255,62,0,1)';

      setTimeout(() => {
        // slow 1s fade out
        element.style.transition = 'fill 0.5s';
        element.style.fill = '';
      });
    });
  }
</script>

<footer class="{$connected ? 'full' : ''} {$timeout ? 'hide' : ''}">
  <div class="bar">
    <div class="icon">
      {#if $connected}
        <CheckMark animate={$connected} />
      {:else}
        <Spinner size="2rem" speed="800" color="#777" thickness="2" gap="40" />
      {/if}
    </div>
    <div class="status">{$connected ? 'Connected' : 'Connecting...'}</div>
    <div class="save">
      <svg
        bind:this={saveIcon}
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill="white"
        ><path d="M0 0h24v24H0z" fill="none" /><path
          d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"
        /></svg
      >
    </div>
    <div class="edit">
      <svg
        bind:this={editIcon}
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill="white"
        ><path d="M0 0h24v24H0z" fill="none" /><path
          d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
        /></svg
      >
    </div>
  </div>
  {#if $connected}
    <div class="data">
      <div class="vse"><span class="label">vse:</span> {settings.vse}</div>
      <div class="snapshotId">
        <span class="label">Snapshot Id: </span>{snapshotId}
      </div>
      <div class="contentItemId">
        <span class="label">Content Id: </span>{contentItemId}
      </div>
      <div class="contentTypeId">
        <span class="label">Content Type Uri: </span>{contentTypeUri}
      </div>
      <div class="locale">
        <span class="label">Locale: </span><UpdateAlert data={$locale}
          >{$locale}</UpdateAlert
        >
      </div>
      <div class="deliveryKey">
        <span class="label">Delivery Key: </span><UpdateAlert data={deliveryKey}
          >{deliveryKey}</UpdateAlert
        >
      </div>
      <div class="device">
        <span class="label">Device: </span><UpdateAlert data={device}
          >{device.name}<span class="label"
            >({device.width}x{device.height})</span
          >
          - {device.orientation}</UpdateAlert
        >
      </div>
      <div class="devices">
        <span class="label">Num Devices: </span>{settings.devices.length}
      </div>
    </div>
  {/if}
</footer>

<style>
  footer {
    width: 100%;
    height: 3rem;
    background: #eee;
    color: #666;
    padding: 0.5rem;
    box-sizing: border-box;
    transition: opacity 0.5s;
    opacity: 1;
  }
  .hide {
    opacity: 0;
  }
  .bar {
    display: grid;
    grid-template-columns: 2rem 1fr 2rem 2rem;
    grid-template-rows: 1fr;
    gap: 0px 0.5rem;
    grid-template-areas: 'icon status save edit';
    height: 2rem;
  }
  .icon {
    grid-area: 'icon';
    width: 2rem;
    place-self: center;
  }
  .status {
    grid-area: 'status';
    align-self: center;
  }
  .save {
    grid-area: 'save';
    width: 2rem;
    place-self: center;
  }
  .edit {
    grid-area: 'edit';
    width: 2rem;
    place-self: center;
  }
  .full {
    height: 10rem;
  }

  .data {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    gap: 0px 0px;
    grid-template-areas:
      'vse snapshotId'
      'contentItemId contentTypeId'
      'locale deliveryKey'
      'device devices';
    height: 6.5rem;
    margin-top: 0.5rem;
    background: white;
    padding: 0 0.5rem;
    overflow-y: auto;
  }

  @media only screen and (max-width: 600px) {
    .data {
      grid-template-columns: 1fr;
      grid-template-areas:
        'vse'
        'snapshotId'
        'contentItemId'
        'contentTypeId'
        'locale'
        'deliveryKey'
        'device'
        'devices';
    }
  }
  .data div {
    align-self: center;
    color: #444;
    font-family: monospace;
    word-break: break-all;
  }
  .label {
    color: #888;
  }
  .vse {
    grid-area: vse;
  }
  .contentItemId {
    grid-area: contentItemId;
  }
  .snapshotId {
    grid-area: snapshotId;
  }
  .contentTypeId {
    grid-area: contentTypeId;
  }
  .locale {
    grid-area: locale;
  }
  .deliveryKey {
    grid-area: deliveryKey;
  }
  .device {
    grid-area: device;
  }
  .devices {
    grid-area: devices;
  }
</style>
