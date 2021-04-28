<script>
  import DiffViewer from './DiffViewer.svelte';
  import ChipBar from './ChipBar.svelte';
  import { mainContent, secondaryContent} from '../data/data.service';
</script>
<ChipBar></ChipBar>
<DiffViewer json1={$mainContent} json2={$secondaryContent}/>