<script>
  import { mainContent, secondaryContent} from './data/data.service';
  import { connected, timeout } from './data/vis.service';
  import { selected } from './menu/menu.store';
  import JsonViewer from "./json-viewers/JsonViewer.svelte";
  import Diff from "./json-viewers/Diff.svelte";
  import Realtime from "./realtime/Realtime.svelte";
  import Menu from "./menu/Menu.svelte";
  
</script>

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
<div />
<main class="grid-container" style="grid-template-rows: 3rem 1fr {$timeout ? '' : $connected ? '10rem' : '3rem'}; grid-template-areas: 'tools' 'code' {$timeout ? '' : '\'realtime\''};">
  <div class="tools">
    <Menu/>
  </div>
  {#if $selected === 'Realtime' || $selected === 'Staged' || $selected === 'Published'}
    <div class="code">
      <JsonViewer content={$mainContent}/>
    </div>
  {:else if $selected === 'Diff'}
      <Diff json1={$mainContent} json2={$secondaryContent}/>
  {/if}

  <div class="realtime" style="display:{$timeout ? 'none' : ''}">
    <Realtime />
  </div>
</main>
