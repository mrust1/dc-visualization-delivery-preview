<script>
  import MenuBar from './MenuBar.svelte';
  import Settings from '../settings/Settings.svelte';
  import { tabs, selected } from './menu.store';
</script>

<MenuBar
  tabs={$tabs}
  selected={$selected}
  on:change={(e) => ($selected = e.detail)}
>
  <div slot="settings">
    <Settings />
  </div>
</MenuBar>
