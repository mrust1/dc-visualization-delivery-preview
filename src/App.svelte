<script>
  import { setLive, setStaged, setRealtime, setDiff, mainContent, secondaryContent} from './data/data.service';
  import { selected } from './menu/menu.store';
  import JsonViewer from "./json-viewers/JsonViewer.svelte";
  import Diff from "./json-viewers/Diff.svelte";
  import Menu from "./menu/Menu.svelte";
  selected.subscribe((s)=>{
    if(s === 'Published') {
      setLive();
    } else if(s === 'Staged') {
      setStaged();
    } else if(s === 'Realtime') {
      setRealtime();
    } else if(s === 'Diff') {
      setDiff();
    }
  })

  
</script>

<style>
  main {
    border: 1em solid white;
  }

  .grid-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 3rem 1fr;
    grid-template-areas: "tools" "code";
    grid-gap: 0.5rem;
  }

  .tools {
    grid-area: tools;
  }

  .code {
    grid-area: code;
  }
</style>

<div />
<main class="grid-container">
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
</main>
