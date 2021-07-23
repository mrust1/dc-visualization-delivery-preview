# dc-visualization-delivery-preview

To use this visualization app it first needs to be added to a content type inside DC. It has a number of functions:
  * **Realtime** - Displays the in-progress content. It does not require the content item to be saved.
  * **Staged** - Displays the latest version of your saved content.
  * **Live** - Displays the published version of your content.
  * **Diff** - Displays the difference between the different versions above.
## Url Params
### Capabilities
  <p>The capabilities of this app depend on the URL parameters supplied.</p>
  
  * `id` - The Content Item ID {{content.sys.id}}. Required for staging, live and diff tabs.
  * `vse` - Your virtual staging environment {{vse.domain}}. Required for the staging tab.
  * `hub` - Your hub name {{hub.name}}. Required for the live tab.
  * `realtime` - Realtime flag. Required for Realtime tab, should be set to true.
  * `locale` - The locale to use {{locales}}. This is not needed when using a realtime connection and exluding this will prevent unnecessary reloading.
  
### Options
  <p>The following options can be used to configure the default Delivery API request options:</p>
  
  * `format` - Can either be `linked` or `inline` (default).
  * `depth` - Can either be `root` or `all` (default).
  
  <h2>Example URL to use</h2>
http://localhost:3400?id={{content.sys.id}}&vse={{vse.domain}}&hub={{hub.name}}&realtime=true

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