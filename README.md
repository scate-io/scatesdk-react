## Installation

```sh
npm install scatesdk-react
```

## Android Integration

To ensure that the ScateSDK works properly on Android, you need to add the Maven repository to your build.gradle file.

In your project's android/build.gradle file, add the following Maven repository:

```
repositories {
        // Other repositories
        maven {
            url "https://europe-west1-maven.pkg.dev/mavenrepo-433814/scatecoresdk-android"
        }
    }
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
ScateSDK.RemoveListener(ScateEvents.REMOTE_CONFIG_READY);
```

### Clean Listeners

```js
ScateSDK.CleanListeners(ScateEvents.REMOTE_CONFIG_READY);
```

### Onboarding Event Functions

```js
ScateSDK.OnboardingStart();
ScateSDK.OnboardingStep('location_screen');
ScateSDK.OnboardingStep('notification_screen');
ScateSDK.OnboardingStep('personalization_screen');
ScateSDK.OnboardingStep('journey_screen');
ScateSDK.OnboardingStep('intro_paywall_screen');
ScateSDK.OnboardingStep('fullscreen_ad');
ScateSDK.OnboardingFinish();
```

### Login Event Functions

```js
ScateSDK.LoginSuccess('apple');
ScateSDK.LoginSuccess('email');
ScateSDK.LoginSuccess('fb');
ScateSDK.LoginSuccess('google');
```

### Ad Event Functions

```js
ScateSDK.InterstitialAdShown();
ScateSDK.InterstitialAdClosed();
ScateSDK.RewardedAdShown();
ScateSDK.RewardedAdClosed();
ScateSDK.RewardedAdClaimed();
ScateSDK.BannerAdShown();
```

### Permission Event Functions

```js
ScateSDK.NotificationPermissionGranted();
ScateSDK.NotificationPermissionDenied();
ScateSDK.LocationPermissionGranted();
ScateSDK.LocationPermissionDenied();
ScateSDK.ATTPromptShown();
ScateSDK.ATTPermissionGranted();
ScateSDK.ATTPermissionDenied();
```

### Paywall Event Functions

```js
ScateSDK.PaywallShown('paywall_name');
ScateSDK.PaywallClosed('paywall_name');
ScateSDK.PaywallAttempted('paywall_name');
ScateSDK.PaywallPurchased('paywall_name');
ScateSDK.PaywallCancelled('paywall_name');
```

### Tab And Feature Event Functions

```js
ScateSDK.TabClicked('x');
ScateSDK.FeatureClicked('x');
```

### Daily Streak Event Functions

```js
ScateSDK.DailyStreakShown();
ScateSDK.DailyStreakClaimed();
ScateSDK.DailyStreakClosed();
```

## Event List Screen Function (IOS Only)

```js
ScateSDK.ShowEventList();
```