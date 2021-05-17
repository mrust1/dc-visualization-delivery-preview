<script>
  import { createEventDispatcher } from 'svelte';
  import { options } from '../../menu/menu.store';
  export let pos = { x: 0, y: 0 };
  const dispatch = createEventDispatcher();
</script>

<div class="menu" style="top: {pos.y}px; left: {pos.x}px">
  {#each $options as option}
    <div
      class="menu-item"
      on:click={(e) => {
        dispatch('choose', option);
        e.stopPropagation();
      }}
    >
      {option}
    </div>
  {/each}
</div>

<style>
  .menu {
    position: absolute;
    z-index: 1;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
  }
  .menu-item {
    background: #ddd;
    color: #666;
    font-weight: bold;
    cursor: pointer;
    padding: 0.5rem;
    text-align: left;
    font-size: 0.75rem;
    transition: all 0.5s;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
      sans-serif, Apple Color Emoji, Segoe UI Emoji;
    width: 10rem;
    border-bottom: 1px solid #ccc;
  }
  .menu-item:first-child {
    border-radius: 0.5rem 0.5rem 0 0;
  }
  .menu-item:last-child {
    border-radius: 0 0 0.5rem 0.5rem;
    border: 0;
  }
  .menu-item:hover {
    background: #eee;
    color: #555;
  }
</style>
