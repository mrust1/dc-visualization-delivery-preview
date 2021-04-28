<script>
  import {copy} from './utils';
  let element;
</script>
<main>
  <h1>Help</h1>
  <p>To use this visualization app it first needs to be added to a content type inside DC. It has a number of functions:</p>
  <ul>
    <li><b>Realtime</b> - This will show the in-progress content, even if it hasn't yet been saved. <b>Note:</b> all required fields need to be filled and valid for this to show.</li>
    <li><b>Staged</b> - This shows the latest version of your saved content.</li>
    <li><b>Live</b> - This shows the published version of your content.</li>
    <li><b>Diff</b> - This lets you see the difference between all the different content.</li>
  </ul>
  <h2>Url Params</h2> 
  <p>The capabilities of this app depend on the URL parameters supplied.</p>
  <ul>
    <li><code>id</code> - This Content Item ID, usually &lbrace;&lbrace;content.sys.id&rbrace;&rbrace;. Required for staging, live and diff view.</li>
    <li><code>vse</code> - Your virtual staging environment, usually &lbrace;&lbrace;vse.domain&rbrace;&rbrace;. Required for staging view.</li>
    <li><code>hub</code> - Your hub name, required for live view.</li>
    <li><code>realtime</code> - Realtime flag, required for real-time view, should be true.</li>
    <li><code>locale</code> - The locale to use, usually &lbrace;&lbrace;locales&rbrace;&rbrace;. Optional: if not used the realtime locale switching will be faster, but there will be no locale filtering for Staging and Live tabs.
    </li>
  </ul>
  <h2>Options</h2> 
  <p>The following options can be used to configure the default Delivery API request options:</p>
  <ul>
    <li><code>format</code> - Can either be <code>linked</code> or <code>inline</code> (default).</li>
    <li><code>depth</code> - Can either be <code>root</code> or <code>all</code> (default).</li>
  </ul>
  <h2>Example URL to use</h2>
  <div><code bind:this="{element}" style="text-decoration: underline;">{window.location.origin}?id=&lbrace;&lbrace;content.sys.id&rbrace;&rbrace;&vse=&lbrace;&lbrace;vse.domain&rbrace;&rbrace;&locale=&lbrace;&lbrace;locales&rbrace;&rbrace;&hub=<b>your-hub</b>&realtime=true</code><button on:click={() => copy(element)}>copy</button></div>
</main>
<style>
  main {
    padding: 0 2rem;
  }
  button {
    display: inline-block;
    margin-left: 1rem;
  }
  h1, h2 {
    font-weight: 400;
  }
  code {
    font-size: 1rem;
  }
  li code {
    font-weight: 700;
  }
</style>