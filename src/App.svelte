<script>
  import { mainContent } from './data/data.service';
  import { connected, timeout } from './data/vis.service';
  import { selected } from './menu/menu.store';
  import JsonViewer from './json-viewers/JsonViewer.svelte';
  import Help from './Help.svelte';
  import Diff from './json-viewers/diff/Diff.svelte';
  import Realtime from './realtime/Realtime.svelte';
  import Menu from './menu/Menu.svelte';
  import { SvelteToast } from '@zerodevx/svelte-toast';
</script>

<div />
<main
  class="grid-container"
  style="grid-template-rows: 2.5rem 1fr {$timeout
    ? ''
    : $connected
    ? '10rem'
    : '3rem'}; grid-template-areas: 'tools' 'code' {$timeout
    ? ''
    : "'realtime'"};"
>
  <SvelteToast />
  <div class="tools">
    <Menu />
  </div>
  {#if $selected === 'Realtime' || $selected === 'Staged' || $selected === 'Live'}
    {#if $mainContent}
      <div class="code">
        <JsonViewer content={$mainContent} />
      </div>
    {/if}
  {:else if $selected === 'Diff'}
    <div class="code">
      <Diff />
    </div>
  {:else if $selected === 'help'}
    <Help />
  {/if}

  <div class="realtime" style="display:{$timeout ? 'none' : ''}">
    <Realtime />
  </div>
</main>

<style>
  main {
    border: 1em solid white;
  }

  .grid-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 0.5rem;
  }

  .tools {
    grid-area: tools;
  }

  .code {
    grid-area: code;
    overflow-y: auto;
  }

  .realtime {
    grid-area: realtime;
  }
</style>
