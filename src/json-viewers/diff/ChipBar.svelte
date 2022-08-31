<script>
  export const title = '';
  import Chip from './Chip.svelte';
  import TypeList from './TypeList.svelte';
  import { base } from '../../data/data.service';
  let baseElement;
  let compareElement;
  let showList = false;
  let option = base;
  let pos = { x: 0, y: 0 };
  function getXY(e) {
    let element = compareElement.contains(e.target)
      ? compareElement
      : baseElement;
    let bb = element.querySelector('div').getBoundingClientRect();
    return {
      x: bb.left,
      y: bb.top + bb.height + 5,
    };
  }
</script>

<svelte:window
  on:click={() => (showList = false)}
  on:blur={() => (showList = false)}
/>
<div class="control">
  <span
    bind:this={baseElement}
    on:click={(e) => {
      option = base;
      showList = true;
      pos = getXY(e);
      e.stopPropagation();
    }}
  >
    <Chip type="base" title={$base} />
  </span>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill="#888"
    ><path d="M0 0h24v24H0V0z" fill="none" /><path
      d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
    /></svg
  >
</div>
{#if showList}
  <TypeList
    {pos}
    on:close={() => {
      showList = false;
    }}
    on:choose={(e) => {
      showList = false;
      option.set(e.detail);
    }}
  />
{/if}

<style>
  .control {
    margin: 1rem 0 2rem 0;
    display: grid;
    grid-template-columns: auto 3rem auto;
    grid-template-rows: 1fr;
    gap: 0px 0px;
    grid-template-areas: '. . .';
    width: 20rem;
    height: 2rem;
  }
  .control * {
    place-content: center;
  }
  span {
    display: contents;
  }
  svg {
    place-self: center;
  }
</style>
