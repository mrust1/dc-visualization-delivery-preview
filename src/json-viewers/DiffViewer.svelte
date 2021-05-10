<script>
  import * as diff from 'diff';
  export let json1;
  export let json2;
  $: haveContent = json2 && json1;
  $: diffPatch = haveContent ? diff.diffJson(json2, json1) : [];
</script>

{#if haveContent}
  <code
    ><pre>{#each diffPatch as patch}<span class={patch.added ? 'green' : patch.removed ? 'red' : 'grey'}>{patch.value}</span>{/each}</pre></code
  >
{:else}
  <p class="grey">Unable to show diff - form content invalid.</p>
{/if}

<style>
  .green::before {
    content: ' +';
    position: absolute;
  }
  .green {
    position: relative;
    background: lightgreen;
  }
  .red::before {
    content: ' -';
    position: absolute;
  }
  .red {
    position: relative;
    background: pink;
  }
  .grey {
    color: #777;
  }
</style>
