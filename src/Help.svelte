<script>
  import { copy } from './utils';
  let element;
</script>

<main>
  <h1>Help</h1>
  <p>
    To use this visualization app it first needs to be added to a content type
    inside DC. It has a number of functions:
  </p>
  <ul>
    <li>
      <b>Realtime</b> - Displays the in-progress content. It does not require the
      content item to be saved.
    </li>
    <li>
      <b>Staged</b> - Displays the latest version of your saved content.
    </li>
    <li><b>Live</b> - Displays the published version of your content.</li>
    <li>
      <b>Diff</b> - Displays the difference between the different versions above.
    </li>
  </ul>
  <h2>Url Params</h2>
  <p>The capabilities of this app depend on the URL parameters supplied.</p>
  <ul>
    <li>
      <code>id</code> - The Content Item ID &lbrace;&lbrace;content.sys.id&rbrace;&rbrace;.
      Required for staging, live and diff tabs.
    </li>
    <li>
      <code>vse</code> - Your virtual staging environment &lbrace;&lbrace;vse.domain&rbrace;&rbrace;.
      Required for the staging tab.
    </li>
    <li>
      <code>hub</code> - Your hub name &lbrace;&lbrace;hub.name&rbrace;&rbrace;.
      Required for the live tab.
    </li>
    <li>
      <code>realtime</code> - Realtime flag. Required for Realtime tab, should be
      set to true.
    </li>
    <li>
      <code>locale</code> - The locale to use &lbrace;&lbrace;locales&rbrace;&rbrace;.
      This is not needed when using a realtime connection and exluding this will
      prevent unnecessary reloading.
    </li>
  </ul>
  <h2>Options</h2>
  <p>
    The following options can be used to configure the default Delivery API
    request options:
  </p>
  <ul>
    <li>
      <code>format</code> - Can either be <code>linked</code> or
      <code>inline</code> (default).
    </li>
    <li>
      <code>depth</code> - Can either be <code>root</code> or <code>all</code> (default).
    </li>
  </ul>
  <h2>Example URL to use</h2>
  <div>
    <code bind:this={element} style="text-decoration: underline;"
      >{window.location
        .origin}?id=&lbrace;&lbrace;content.sys.id&rbrace;&rbrace;&vse=&lbrace;&lbrace;vse.domain&rbrace;&rbrace;&hub=&lbrace;&lbrace;hub.name&rbrace;&rbrace;&realtime=true</code
    ><button on:click={() => copy(element)}>copy</button>
  </div>
</main>

<style>
  main {
    padding: 0 2rem;
    overflow-y: auto;
  }
  button {
    display: inline-block;
    margin-left: 1rem;
  }
  h1,
  h2 {
    font-weight: 400;
  }
  code {
    font-size: 1rem;
  }
  li code {
    font-weight: 700;
  }
</style>
