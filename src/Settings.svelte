<script>
  import { createEventDispatcher } from "svelte";
  export let format;
  export let depth;
  export let v2;
  export let store;
  const dispatch = createEventDispatcher();
  const depthOptions = [
    {
      label: "----",
      v1Label: "----",
      value: "",
    },
    {
      label: "root",
      v1Label: "root",
      value: "root",
    },
    {
      label: "all",
      v1Label: "tree",
      value: "all",
    },
  ];

  const formatOptions = [
    {
      label: "----",
      v1Label: "----",
      value: "",
    },
    {
      label: "linked",
      v1Label: "false",
      value: "linked",
    },
    {
      label: "inlined",
      v1Label: "true",
      value: "inlined",
    },
  ];

  function update() {
    dispatch("change", { format, depth, v2, store });
  }
</script>

<style>
  .settings {
    padding: 0.5em;
    background: #eee;
    box-sizing: border-box;
    box-shadow: 0 2px 4px rgba(0,0,0,0.18);
  }
  select,
  input,
  label {
    font-family: Helvetica, Arial, sans-serif;
    line-height: 1em;
    box-sizing: border-box;
    color: #333;
    cursor: pointer;
    vertical-align: middle;
    margin: 0;
  }
  label {
    margin-left: 0.5em;
  }
  .short {
    width: 10em;
  }
  div {
    margin: 0.5rem;
  }
</style>

<div class="settings">
  <div>
    <label for="v2">v2:</label>
    <input type="checkbox" id="v2" bind:checked={v2} on:change={() => update()} />
  </div>
  <div>
    <label for="depth">{v2 ? 'depth:' : 'scope'}</label>
    <select id="depth" bind:value={depth} on:change={() => update()}>
      {#each depthOptions as option}
        <option value={option.value}>{v2 ? option.label : option.v1Label}</option>
      {/each}
    </select>
  </div>
  <div>
    <label for="format">{v2 ? 'format:' : 'fullBodyObject'}</label>
    <select id="format" bind:value={format} on:change={() => update()}>
      {#each formatOptions as option}
        <option value={option.value}>{v2 ? option.label : option.v1Label}</option>
      {/each}
    </select>
  </div>
  
  {#if !v2}
  <div>
    <label for="store">store:</label>
    <input
    class="short"
    type="input"
    id="store"
    bind:value={store}
    on:change={() => update()} />
  </div>
  {/if}
</div>
