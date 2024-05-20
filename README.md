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
ScateSDK.init('your app id');

// make sure to set adid from Adjust SDK
let adid = Adjust.adid()
ScateSDK.SetAdid(adid);

```

### Send Events

To send events, you can use the following code:

```js
    
ScateSDK.Event("button_clicked");

```

### Send Events with Additional Data

```js

ScateSDK.EventWithValue("button_clicked", "subscribe_btn");

```