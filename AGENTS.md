# AGENTS.md

## Scope

These instructions apply to the whole `scatesdk-react` repository.

## Project purpose

This is the React Native wrapper for the Scate SDK. It bridges JavaScript/TypeScript APIs to native iOS and Android SDK implementations and includes an example app.

## Important areas

- `src/`: exported TypeScript API
- `ios/`: native iOS bridge code and podspec integration
- `android/`: native Android bridge code and Gradle configuration
- `example/`: React Native example app
- `scatesdk-react.podspec`: iOS package metadata
- `package.json`: build, lint, test, and release scripts

## Working guidance

- Keep the JS API, iOS bridge, Android bridge, and README examples aligned.
- Preserve backward compatibility for public methods like `Init`, `Event`, `EventWithValue`, `InitAdjust`, and listener helpers.
- When adding event parameters or config options, update both native platforms and the TypeScript surface.
- Do not commit generated build output from `lib/`, `android/build`, `example/android/build`, or `example/ios/build`.
- Keep native SDK dependency versions aligned with the published Scate iOS/Android SDK versions.

## Validation

Use the existing package scripts:

```bash
yarn test
yarn typecheck
yarn lint
yarn prepare
```

For example app validation, use the `example` workspace commands defined by the project.
