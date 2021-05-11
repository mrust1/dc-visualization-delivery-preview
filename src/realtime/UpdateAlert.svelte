<script>
  import { afterUpdate } from 'svelte';
  export let data;
  let element;
  afterUpdate(() => {
    flash(element);
  });
  function flash(element) {
    requestAnimationFrame(() => {
      // instant red bg flash in
      element.style.transition = 'none';
      element.style.color = 'rgba(255,62,0,1)';
      element.style.fill = 'rgba(255,62,0,0.3)';
      element.style.backgroundColor = 'rgba(255,62,0,0.3)';

      setTimeout(() => {
        // slow 1s fade out
        element.style.transition = 'color 1.4s, background 1.4s';
        element.style.color = '';
        element.style.fill = '';
        element.style.backgroundColor = '';
      });
    });
  }
</script>

<span style="display:inline" bind:this={element}>
  <slot />
</span>
