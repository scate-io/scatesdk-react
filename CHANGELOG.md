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
