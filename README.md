# API Blueprint to JSON

Pulls down API Blueprints from Apiary, parses them, and saves them locally as JSON.

## Install

```
npm install api-blueprint-to-json
```

## Use

The this model exposes a single method ``process`` which accepts an array of resource objects, defined as follows:

- url (required) - [string]: A url for an .apib file. You can find this by going to ``https://api.apiary.io/blueprint/get/<api-name>``. You can find the ``<api-name>`` part in the subdomain of your Apiary docs: ``http://docs.<api-name>.apiary.io/``
- token (required) - [string]: A valid api token with access to the above resource. You can view/generate these from [https://login.apiary.io/tokens](https://login.apiary.io/tokens).
- savePath (required) - [string]: An absolute local path where you would like to save the converted JSON.

### Example


```javascript
var resources = [
  {
    url: 'https://api.apiary.io/blueprint/get/myapi',
    token: 'someapitoken',
    savePath: __dirname + '/schemas/myapi.json'
  }
];

function callback(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('All done');
  }
}

apiBlueprintToJson.process(resources, callback);
```