<script>
  import { loadData, setLive, setStaged, setDiff, mainContent, secondaryContent} from './data.service';
  import JsonViewer from "./JsonViewer.svelte";
  import Settings from "./Settings.svelte";
  import Diff from "./Diff.svelte";
  import MenuBar from "./MenuBar.svelte";
  import * as params from "./urlparams";
  const tabs = ["Staged", "Live", "Diff"];
  let selected = "Staged";

  $: if(selected === 'Live') {
    setLive();
  }
  $: if(selected === 'Staged') {
    setStaged();
  }
  $: if(selected === 'Diff') {
    setDiff();
  }
  
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
<main>
  <div class="tools">
    <MenuBar {tabs} {selected} on:change={(e)=>selected = e.detail}>
    <div slot="settings">
      <Settings/>
    </div>
    </MenuBar>
  </div>
  {#if selected === 'Staged' || selected === 'Live'}
    <div class="code">
      <JsonViewer content={$mainContent}/>
    </div>
  {:else if selected==='Diff'}
      <Diff json1={$mainContent} json2={$secondaryContent}/>
  {/if}
</main>
