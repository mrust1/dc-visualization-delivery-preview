# dc-visualization-delivery-preview

To use this visualization app it first needs to be added to a content type inside DC. It has a number of functions:
  * **Realtime** - This displays the in-progress content, even if it hasn't yet been saved.
  * **Staged** - This displays the latest version of your saved content.
  * **Live** - This displays the published version of your content.
  * **Diff** - This tab displays the difference between the available tabs.
## Url Params
### Capabilities
  <p>The capabilities of this app depend on the URL parameters supplied.</p>
  
  * `id` - The Content Item ID, usually {{content.sys.id}}. Required for staging, live and diff tab.
  * `vse` - Your virtual staging environment, usually {{vse.domain}}. Required for staging tab.
  * `hub` - Your hub name, required for live tab.
  * `realtime` - Realtime flag, required for Realtime tab, should be true.
  * `locale` - The locale to use, usually {{locales}}. This is not needed when using a realtime connection.
  
### Options
  <p>The following options can be used to configure the default Delivery API request options:</p>
  
  * `format` - Can either be `linked` or `inline` (default).
  * `depth` - Can either be `root` or `all` (default).
  
  <h2>Example URL to use</h2>
http://localhost:3400?id={{content.sys.id}}&vse={{vse.domain}}&locale={{locales}}&hub=your-hub&realtime=true

## Get started

Install the dependencies...

```bash
npm install
```

```bash
npm run dev
```

Navigate to [localhost:3400](http://localhost:3400). You should see your app running. 

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```