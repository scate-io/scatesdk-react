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
