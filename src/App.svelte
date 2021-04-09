<script>
  import { CDService } from "./cd.service.js";
  import { VisService } from "./vis.service.js";
  import APIOptions from "./APIOptions.svelte";
  import hljs from "highlight.js/lib/core";
  import json from "highlight.js/lib/languages/json";
  import "highlight.js/styles/github.css";
  import * as params from "./urlparams";
  hljs.registerLanguage("json", json);
  const cdService = new CDService(params);
  const visService = new VisService(params);
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
  .error pre {
    border: 1px solid red;
  }

  .grid-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 2em 1fr;
    grid-template-areas: "tools" "code";
    grid-gap: 0.5em;
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
    <APIOptions
      v2 = {params.v2}
      format = {params.format}
      depth = {params.depth}
      store = {params.store}
      on:change={(e) => {
        cdService.setParams(e.detail);
        visService.setParams(e.detail);
        loadData();
      }} />
  </div>
  {#await load then show}
    <div class="code">
      <pre>
        <code class="json">
          {@html hljs.highlight('json', JSON.stringify(content, null, 2), true).value}
        </code>
      </pre>
    </div>
  {/await}
</main>
