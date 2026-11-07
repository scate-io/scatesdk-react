## 7.0.26

- Removed the SDK's built-in paywall and onboarding screens. Breaking change for apps that used them; no known app does.
  - Removed `ShowPaywall`, `ClosePaywall`, `ShowOnboarding` and `CloseOnboarding`, and the
    `ScateEvents` events that only those screens sent: `PAID_PRODUCT_CLICKED`, `ONBOARDING_SCREENS_FINISHED`, `PAYWALL_SCREEN_CLOSED`, `ONBOARDING_SCREEN_CLOSED`, `PAYWALL_SCREEN_FINISHED` and `RESTORE_PURCHASE_CLICKED`.
  - The iOS binary no longer contains the screens, so binary scans stop reporting a
    "configurable paywall" in the SDK. Paywall and onboarding analytics events
    (`PaywallShown`, `OnboardingStart`, `OnboardingPaywallShown`, ...) and
    `ShowPaidProductLoadingScreen` stay.
  - Android SDK: no changes.

## 7.0.25

- Removed `SetAdjustGlobalPartnerParameter`. Breaking change: delete the call from your app.
  - The SDK no longer hashes an email or sends it to Adjust, and the method name is gone from
    the iOS binary. The privacy manifest no longer declares Email Address.
  - The method also started Google on-device conversion measurement. Apps that want it can call
    Firebase Analytics directly, e.g. `@react-native-firebase/analytics`
    `analytics().initiateOnDeviceConversionMeasurementWithEmailAddress(email)`.
  - iOS: the plugin ships `ScateSDK.xcframework` inside the package instead of depending on
    the `ScateSDK` CocoaPods pod, because CocoaPods trunk stops taking new versions on
    2 December 2026. Apps change nothing; run `pod install` as usual.
  - Android SDK: no changes.

## 7.0.24

- Updated native ScateSDK dependencies to 7.0.24 on both platforms:
  - iOS: `SetAdjustGlobalPartnerParameter` sets the `sha256_email` Adjust partner parameter only
    when the user granted App Tracking Transparency. In every other state it removes a
    `sha256_email` stored earlier, since Adjust keeps global partner parameters across launches.
    Google on-device conversion measurement still gets the hash, which stays on the device. The
    ATT status is read at the call, so call it on every launch or login.
  - iOS: the SDK no longer reads or sends free disk space.
  - iOS: `ScateSDK.framework` ships its own privacy manifest (`PrivacyInfo.xcprivacy`) with the
    required-reason APIs it uses and the data it collects.
  - Android: no changes.

## 7.0.23

- Updated native ScateSDK dependencies to 7.0.23 on both platforms:
  - `scate_remote_configs_loaded` carries the whole remote config snapshot: the ceiling for its
    `configs` and `overrides` JSON went from 4 KB to 256 KB, and a value that does not fit is
    skipped on its own instead of taking every key after it along; `_truncated` names the
    omitted keys.

## 7.0.22

- Updated native ScateSDK dependencies to 7.0.22 on both platforms:
  - iOS: `Init` stops simulator, Xcode and TestFlight builds at launch when `Info.plist` lacks
    `SKIncludeConsumableInAppPurchaseHistory` = `YES`. App Store builds keep running.
  - iOS: `scate_measurement_health_check` reports `consumableHistoryEnabled`.
- The example app's `Info.plist` sets the key.

## 7.0.21

- Updated native ScateSDK dependencies to 7.0.21 on both platforms:
  - iOS: the SDK notices purchases on its own. Every time the app becomes active it sends
    StoreKit's transaction history to Scate, which keeps the purchases it has not seen and
    sends a `scate_transaction` event for each.
  - iOS: when the app uses Firebase Analytics, new purchases are logged to Firebase as
    `in_app_purchase`, once each. No code change.
  - iOS: add `SKIncludeConsumableInAppPurchaseHistory` = `YES` to `Info.plist`: required for
    apps selling consumables, recommended for every app.

## 7.0.15

- `GetRemoteConfigBool`, `GetRemoteConfigInt`, `GetRemoteConfigDouble`: typed remote config reads
  that fall back to the default when the value is not of that type.
- Android: `EventWithValueAndParameters` now reaches the native SDK (it had no Android bridge
  method, so calling it on Android failed).
- Updated native ScateSDK dependencies to 7.0.15 on both platforms (A/B assignments,
  `scate_remote_configs_loaded` / `scate_ab_assignment` events, typed getters).

## 7.0.13

- Add `EventWithValueAndParameters(name, customValue, parameters)` so a single
  event can carry a custom value and parameters together.
- Updated native iOS ScateSDK dependency to 7.0.13 (adds the combined
  `Event(name:customValue:parameters:)` overload).

## 7.0.10

- Depend on Adjust/AdjustGoogleOdm subspec (adds Google ICM support). Apps pinning an older
  `react-native-adjust` version should upgrade to >= 5.6.x.
- Updated native iOS ScateSDK dependency to 7.0.12 (adds `scate_firebase_sdk_version`,
  `scate_measurement_health_check` events, and ODM 1PD support).
