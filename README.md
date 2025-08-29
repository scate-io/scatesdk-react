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

### ⚠️ Attention ⚠️

In your android/app/build.gradle file, under buildTypes, please add the following lines:

```
buildTypes {
    release {
        minifyEnabled false
        shrinkResources false
    }
}
```

**Note:**
If you enable `minifyEnabled` (code shrinking and obfuscation) in your `build.gradle`,
you must keep ScateSDK classes to avoid issues with JSON serialization (such as `@SerializedName` fields turning into random letters).

To do this, add the following to your proguard-rules.pro file:

```
-keep class com.scatesdkreact.** { *; }
-keepclassmembers class com.scatesdkreact.** { *; }
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

### Adjust And Revenuecat Event Functions
```dart
ScateSDK.RevenuecatInitiated();
ScateSDK.AdjustInitiated();
ScateSDK.AdjustSetToRevenuecat();
```

### Splash Event Function
```dart
ScateSDK.SplashCompleted();
```

### Firebase Event Function
```dart
ScateSDK.FirebaseRemoteInitiated();
```

### Home Screen Event Function
```dart
ScateSDK.HomeScreenOpen();
```

### Onboarding Paywall Event Functions
```dart
ScateSDK.OnboardingPaywallShown();
ScateSDK.OnboardingPaywallClosed();
```

## Event List Screen Function (IOS Only)

```js
ScateSDK.ShowEventList();
```

## Onboarding And Paywall Screen Functions and Events

## Show Paywall Screen

- **Parameter:** `jsonString` — A JSON string containing the screen paywall configuration.
- ⚠️ **Note:** You can find an example JSON object in the `example/src/App.tsx` file of the SDK repository.

```js
ScateSDK.ShowPaywall('jsonString');
```

## Close Paywall Screen

```js
ScateSDK.ClosePaywall();
```

## Show Onboarding Screen

- **Parameter:** `jsonString` — A JSON string containing the onboarding configuration.
- ⚠️ **Note:** You can find an example JSON object in the `example/src/App.tsx` file of the SDK repository.

```js
ScateSDK.ShowOnboarding('jsonString');
```

## Close Onboarding Screen

```js
ScateSDK.CloseOnboarding();
```

## Show Paid Product Loading Screen

```js
ScateSDK.ShowPaidProductLoadingScreen();
```

## Close Paid Product Loading Screen Clicked On A Product In Onboarding Or Paywall Screens)

```js
ScateSDK.ClosePaidProductLoadingScreen();
```

## Paywall And Onboarding Screen Events

```js
ScateSDK.AddListener(
  ScateEvents.ONBOARDING_SCREENS_FINISHED,
  (identifier) => {}
);
ScateSDK.AddListener(ScateEvents.PAYWALL_SCREEN_FINISHED, (identifier) => {});
ScateSDK.AddListener(ScateEvents.PAID_PRODUCT_CLICKED, (identifier) => {});
ScateSDK.AddListener(ScateEvents.PAYWALL_SCREEN_CLOSED, (success) => {});
ScateSDK.AddListener(ScateEvents.ONBOARDING_SCREEN_CLOSED, (success) => {});
ScateSDK.AddListener(ScateEvents.RESTORE_PURCHASE_CLICKED, (success) => {});
```
