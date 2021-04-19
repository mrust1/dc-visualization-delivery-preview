<script>
	import * as diff from 'diff';
	export let json1;
	export let json2;
	$:diffPatch = diff.diffJson(json2, json1);
</script>
<code><pre>{#each diffPatch as patch}<span class={patch.added ? 'green' : patch.removed ? 'red' : 'grey'}>{patch.value}</span>{/each}</pre></code>
<style>
	.green::before {
		content: " +";
		position: absolute;
	}
	.green {
		background: lightgreen;
	}
	.red::before {
		content: " -";
		position: absolute;
	}
	.red {
		background: pink;
	}
	.grey {
		color: #777;
	}
</style>