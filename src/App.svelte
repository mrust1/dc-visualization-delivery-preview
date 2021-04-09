<script>
  import { CDService } from "./cd.service.js";
  import { VisService } from "./vis.service.js";
  import Settings from "./Settings.svelte";
  import MenuBar from "./MenuBar.svelte";
  import hljs from "highlight.js/lib/core";
  import json from "highlight.js/lib/languages/json";
  import "highlight.js/styles/github.css";
  import * as params from "./urlparams";
  hljs.registerLanguage("json", json);
  const cdService = new CDService(params);
  const visService = new VisService(params);
  const tabs = ["Staged", "Live", "Diff"];
  let selected = "Staged";
  let error = false;
  let content = {};
  let load;
  let useVisConnection = false;

  visService.connect().then((e)=>{if(e===true){
    useVisConnection = true;
  }});

  setTimeout(()=>{
    if(!useVisConnection){
      load = loadData();
    }
  }, 100);

  $: if(useVisConnection) {
    load = loadData();
    visService.listenForChanges((change)=>{
      content = change;
    })
  }

  const loadData = async () => {
    error = false;
    try {
      content = useVisConnection ? await visService.fetchContent() : await cdService.fetchContent();
    } catch (e) {
      try {
        content = JSON.parse(e.message);
      } catch (b) {
        content = {
          error: {
            message: e.message,
            params,
          },
        };
      }
      error = true;
    }
  };
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
<main class={error ? 'grid-container error' : 'grid-container'}>
  <div class="tools">
    <MenuBar {tabs} {selected} on:change={(e)=>selected = e.detail}>
    <div slot="settings"><Settings
      
      v2 = {params.v2}
      format = {params.format}
      depth = {params.depth}
      store = {params.store}
      on:change={(e) => {
        cdService.setParams(e.detail);
        visService.setParams(e.detail);
        loadData();
      }} /></div>
    
    </MenuBar>
  </div>
  {#if selected==='Staged'}
    {#await load then show}
      <div class="code">
        <pre>
          <code class="json">
            {@html hljs.highlight('json', JSON.stringify(content, null, 2), true).value}
          </code>
        </pre>
      </div>
    {/await}
  {/if}
  {#if selected==='Live'}
      <h1>Live</h1>
  {/if}
  {#if selected==='Diff'}
      <h1>DIFF</h1>
  {/if}
</main>
