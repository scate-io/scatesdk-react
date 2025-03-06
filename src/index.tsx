import { NativeEventEmitter, NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'scatesdk-react' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const _ScateSDK = NativeModules.ScateSDK
  ? NativeModules.ScateSDK
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

const eventEmitter = new NativeEventEmitter(_ScateSDK);

export enum ScateEvents {
  REMOTE_CONFIG_READY = 'Scate_RemoteConfigsReady',
  PAID_PRODUCT_CLICKED = 'Scate_PaidProductClicked',
  ONBOARDING_SCREENS_FINISHED = 'Scate_OnboardingScreensFinished',
  PAYWALL_SCREEN_CLOSED = 'Scate_PaywallScreenClosed',
  ONBOARDING_SCREEN_CLOSED = 'Scate_OnboardingScreenClosed',
  PAYWALL_SCREEN_FINISHED = 'Scate_PaywallScreenFinished',
  RESTORE_PURCHASE_CLICKED = 'Scate_RestorePurchaseClicked',
}

export class ScateSDK {
  private static listeners: Map<string, Function> = new Map();

  public static Init(appID: string): Promise<void> {
    return _ScateSDK.Init(appID);
  }

  public static SetAdid(adid: string): Promise<void> {
    return _ScateSDK.SetAdid(adid);
  }

  public static Event(name: string): Promise<void> {
    return _ScateSDK.Event(name);
  }

  public static EventWithValue(
    name: string,
    customValue: string
  ): Promise<void> {
    return _ScateSDK.EventWithValue(name, customValue);
  }

  public static GetRemoteConfig(
    key: string,
    defaultValue: string
  ): Promise<string> {
    return _ScateSDK.GetRemoteConfig(key, defaultValue);
  }

  public static HandleEvent(name: string, event: any) {
    const listener = this.listeners.get(name);
    console.log(event);
    if (listener) {
      if (event['event'] == 'Scate_RemoteConfigsReady') {
        const remoteConfigFetched = event['data']['remoteConfigFetched'];
        listener(remoteConfigFetched);
      } else if (event['event'] == 'Scate_PaidProductClicked') {
        const productClicked = event['data']['identifier'];
        listener(productClicked);
      } else if (event['event'] == 'Scate_OnboardingScreensFinished') {
        const onboardingFinished = event['data']['identifier'];
        listener(onboardingFinished);
      } else if (event['event'] == 'Scate_PaywallScreenClosed') {
        const paywallScreenClosed = event['data']['success'];
        listener(paywallScreenClosed);
      } else if (event['event'] == 'Scate_OnboardingScreenClosed') {
        const onboardingScreenClosed = event['data']['success'];
        listener(onboardingScreenClosed);
      } else if (event['event'] == 'Scate_PaywallScreenFinished') {
        const onboardingFinished = event['data']['identifier'];
        listener(onboardingFinished);
      } else if (event['event'] == 'Scate_RestorePurchaseClicked') {
        const restorePurchaseClicked = event['data']['success'];
        listener(restorePurchaseClicked);
      }
    }
  }

  public static AddListener(name: string, listener: Function) {
    if (!this.listeners.has(name)) {
      _ScateSDK.AddListener(name);
      eventEmitter.addListener(name, (event) => this.HandleEvent(name, event));
    }
    this.listeners.set(name, listener);
  }

  public static RemoveListener(name: string) {
    if (this.listeners.has(name)) {
      this.listeners.delete(name);
      if (this.listeners.size === 0) {
        _ScateSDK.RemoveListener(name);
      }
    }
  }

  public static ClearListeners(name: string) {
    this.listeners.delete(name);
    _ScateSDK.RemoveListener(name);
  }

  public static OnboardingStart() {
    return _ScateSDK.OnboardingStart();
  }

  public static OnboardingStep(step: string) {
    return _ScateSDK.OnboardingStep(step);
  }

  public static OnboardingFinish() {
    return _ScateSDK.OnboardingFinish();
  }

  public static LoginSuccess(source: string) {
    return _ScateSDK.LoginSuccess(source);
  }

  public static InterstitialAdShown() {
    return _ScateSDK.InterstitialAdShown();
  }

  public static InterstitialAdClosed() {
    return _ScateSDK.InterstitialAdClosed();
  }

  public static RewardedAdShown() {
    return _ScateSDK.RewardedAdShown();
  }

  public static RewardedAdClosed() {
    return _ScateSDK.RewardedAdClosed();
  }

  public static RewardedAdClaimed() {
    return _ScateSDK.RewardedAdClaimed();
  }

  public static BannerAdShown() {
    return _ScateSDK.BannerAdShown();
  }

  public static NotificationPermissionGranted() {
    return _ScateSDK.NotificationPermissionGranted();
  }

  public static NotificationPermissionDenied() {
    return _ScateSDK.NotificationPermissionDenied();
  }

  public static LocationPermissionGranted() {
    return _ScateSDK.LocationPermissionGranted();
  }

  public static LocationPermissionDenied() {
    return _ScateSDK.LocationPermissionDenied();
  }

  public static ATTPromptShown() {
    return _ScateSDK.ATTPromptShown();
  }

  public static ATTPermissionGranted() {
    return _ScateSDK.ATTPermissionGranted();
  }

  public static ATTPermissionDenied() {
    return _ScateSDK.ATTPermissionDenied();
  }

  public static PaywallShown(paywall: string) {
    return _ScateSDK.PaywallShown(paywall);
  }

  public static PaywallClosed(paywall: string) {
    return _ScateSDK.PaywallClosed(paywall);
  }

  public static PaywallAttempted(paywall: string) {
    return _ScateSDK.PaywallAttempted(paywall);
  }

  public static PaywallPurchased(paywall: string) {
    return _ScateSDK.PaywallPurchased(paywall);
  }

  public static PaywallCancelled(paywall: string) {
    return _ScateSDK.PaywallCancelled(paywall);
  }

  public static TabClicked(tab: string) {
    return _ScateSDK.TabClicked(tab);
  }

  public static FeatureClicked(feature: string) {
    return _ScateSDK.FeatureClicked(feature);
  }

  public static DailyStreakShown() {
    return _ScateSDK.DailyStreakShown();
  }

  public static DailyStreakClaimed() {
    return _ScateSDK.DailyStreakClaimed();
  }

  public static DailyStreakClosed() {
    return _ScateSDK.DailyStreakClosed();
  }

  public static ShowPaywall(jsonString: string) {
    return _ScateSDK.ShowPaywall(jsonString);
  }

  public static ShowOnboarding(jsonString: string) {
    return _ScateSDK.ShowOnboarding(jsonString);
  }

  public static ClosePaywall() {
    return _ScateSDK.ClosePaywall();
  }

  public static CloseOnboarding() {
    return _ScateSDK.CloseOnboarding();
  }
}

export default ScateSDK;
