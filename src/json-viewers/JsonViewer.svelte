<script>
  import hljs from 'highlight.js/lib/core';
  import json from 'highlight.js/lib/languages/json';
  import 'highlight.js/styles/github.css';
  hljs.registerLanguage('json', json);
  export let content;
</script>

{#if content}
  <pre>
  <code class="json">
    {@html hljs.highlight(JSON.stringify(content, null, 2), {language: 'json', ignoreIllegals: true}).value}
  </code>
</pre>
{/if}
