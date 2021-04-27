<script>
  export const title = '';
  import { get } from 'svelte/store';
  import Chip from './Chip.svelte';
  import { base, compare } from '../data/data.service';
  import { options } from '../menu/menu.store';
  function nextBase(){
    iterate(base);
  }
  function nextCompare(){
    iterate(compare);
  }
  function iterate(item) {
    let o = get(options);
    console.log(options);
    let index = o.indexOf(get(item)) + 1;
    index > o.length - 1 ? item.set(o[0]) : item.set(o[index])
  }
</script>

<div class="control">
  <span on:click={nextBase}>
    <Chip type="base" title="{$base}"/>
  </span>
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#888"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
  <span on:click={nextCompare}>
    <Chip type="compare" title="{$compare}" />
  </span>
</div>

<style>
  .control {
    margin: 1rem 0 2rem 0;
    display: grid;
    grid-template-columns: auto 3rem auto;
    grid-template-rows: 1fr;
    gap: 0px 0px;
    grid-template-areas: ". . .";
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