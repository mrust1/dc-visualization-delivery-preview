<script>
  import { mainContent, secondaryContent} from './data/data.service';
  import { selected } from './menu/menu.store';
  import JsonViewer from "./json-viewers/JsonViewer.svelte";
  import Diff from "./json-viewers/Diff.svelte";
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
  }

  .settings {
    grid-area: settings;
  }
</style>

<div />
<main class="grid-container" style="grid-template-rows: 3rem 1fr {$selected === 'Realtime' ? '1fr' : ''}; grid-template-areas: 'tools' 'code' {$selected === 'Realtime' ? '\'settings\'':''};">
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

  {#if $selected === 'Realtime'}
  <div class="settings">
    <h2>Settings</h2>
    <JsonViewer content={$secondaryContent}/>
  </div>
  {/if}
</main>
