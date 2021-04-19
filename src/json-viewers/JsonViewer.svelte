<script>
  import hljs from "highlight.js/lib/core";
  import json from "highlight.js/lib/languages/json";
  import "highlight.js/styles/github.css";
  hljs.registerLanguage("json", json);
  export let content;
</script>
<pre>
  <code class="json">
    {@html hljs.highlight('json', JSON.stringify(content, null, 2), true).value}
  </code>
</pre>