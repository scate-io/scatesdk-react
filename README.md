## Installation

```sh
npm install scatesdk-react
```

## Usage

### Initialize the SDK

```js
import { ScateSDK } from 'scatesdk-react';

// ...
// It's better to initialize the SDK after Adjust SDK
ScateSDK.Init('your app id');

// make sure to set adid from Adjust SDK
let adid = Adjust.adid();
ScateSDK.SetAdid(adid);
```

### Send Events

To send events, you can use the following code:

```js
ScateSDK.Event('button_clicked');
```

### Send Events with Additional Data

```js
ScateSDK.EventWithValue('button_clicked', 'subscribe_btn');
```

### Get Remote Config for Key

```js
ScateSDK.GetRemoteConfig('key', 'defaultValue');
```

### Add Listener

```js
ScateSDK.AddListener(ScateEvents.REMOTE_CONFIG_READY, (event) => {});
```

### Remove Listener

```js
ScateSDK.RemoveListener(ScateEvents.REMOTE_CONFIG_READY, 1); //Listener id
```

### Clean Listeners

```js
ScateSDK.CleanListeners(ScateEvents.REMOTE_CONFIG_READY);
```
