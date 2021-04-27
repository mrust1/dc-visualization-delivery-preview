<script>
  import {format, depth, hub, locale} from "./settings.store";
  const depthOptions = [
    {
      label: "root",
      value: "root",
    },
    {
      label: "all",
      value: "all",
    },
  ];

  const formatOptions = [
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
  label, div {
    font-family: Helvetica, Arial, sans-serif;
    line-height: 1em;
    box-sizing: border-box;
    color: #333;
    cursor: pointer;
    vertical-align: middle;
    margin: 0;
  }
  label, .label {
    margin-left: 0.5em;
  }
  .short {
    width: 10em;
  }
  div {
    margin: 0.5em;
  }
  .locale {
    color: #666;
    vertical-align:text-bottom;
  }
</style>

<div class="settings">
  <div>
    <label for="depth">{'depth:'}</label>
    <select id="depth" bind:value={$depth}>
      {#each depthOptions as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
  </div>
  <div>
    <label for="format">{'format:'}</label>
    <select id="format" bind:value={$format}>
      {#each formatOptions as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
  </div>
  <div>
    <label for="hub">hub:</label>
    <input
    class="short"
    type="input"
    id="hub"
    bind:value={$hub}/>
  </div>
  <div class="label">
    <label>locale:</label> <span class="locale">{$locale ? $locale : 'none'}</span>
  </div>
</div>
