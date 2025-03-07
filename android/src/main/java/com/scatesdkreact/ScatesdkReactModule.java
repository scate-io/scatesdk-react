package com.scatesdkreact;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.*;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.scate.scatesdk.ScateCoreSDK;
import com.scate.scatesdk.models.RemoteConfigListener;
import org.json.JSONObject;

@ReactModule(name = ScatesdkReactModule.NAME)
public class ScatesdkReactModule extends ReactContextBaseJavaModule {

  public static final String NAME = "ScateSDK";

  private final ReactApplicationContext reactContext;

  public ScatesdkReactModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;

    // Set up RemoteConfigListener
    ScateCoreSDK.addRemoteConfigListener(new RemoteConfigListener() {
      @Override
      public void onRemoteConfigInitialized(boolean success) {
        sendEvent("Scate_RemoteConfigsReady", success);
      }
    });
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod
  public void Init(String appID, Promise promise) {
    try {
      ScateCoreSDK.init(appID, reactContext.getApplicationContext());
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("InitError", e);
    }
  }

  @ReactMethod
  public void SetAdid(String adid, Promise promise) {
    try {
      ScateCoreSDK.SetAdid(adid);
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("SetAdidError", e);
    }
  }

  @ReactMethod
  public void Event(String name, Promise promise) {
    try {
      ScateCoreSDK.event(name);
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("EventError", e);
    }
  }

  @ReactMethod
  public void EventWithValue(String name, String customValue, Promise promise) {
    try {
      ScateCoreSDK.event(name, customValue);
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("EventWithValueError", e);
    }
  }

  @ReactMethod
  public void GetRemoteConfig(String key, String defaultValue, Promise promise) {
    try {
      String value = ScateCoreSDK.getRemoteConfig(key, defaultValue);
      promise.resolve(value);
    } catch (Exception e) {
      promise.reject("GetRemoteConfigError", e);
    }
  }

  @ReactMethod
  public void AddListener(String name, Promise promise) {
    // Add any additional listener setup if necessary
    promise.resolve(null);
  }

  @ReactMethod
  public void RemoveListener(String name, Promise promise) {
    // Remove any listener setup if necessary
    promise.resolve(null);
  }

  // Required for rn built in EventEmitter Calls.
  @ReactMethod
  public void addListener(String eventName) {

  }

  @ReactMethod
  public void removeListeners(Integer count) {

  } 
    
  private void sendEvent(String eventName, boolean success) {
    if (reactContext.hasActiveCatalystInstance()) {
        WritableMap data = Arguments.createMap();
        data.putBoolean("remoteConfigFetched", success);

        WritableMap params = Arguments.createMap();
        params.putMap("data", data);

        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
    }
  }

  @ReactMethod
  public void OnboardingStart (Promise promise) {
    try {
      ScateCoreSDK.OnboardingStart();
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("OnboardingStart", e);
    }
  }

  @ReactMethod
  public void OnboardingStep(String step, Promise promise) {
    try {
      ScateCoreSDK.OnboardingStep(step);
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("OnboardingStep", e);
    }
  }

  @ReactMethod
  public void OnboardingFinish (Promise promise) {
    try {
      ScateCoreSDK.OnboardingFinish();
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("OnboardingFinish", e);
    }
  }

  @ReactMethod
  public void LoginSuccess(String source, Promise promise)  {
    try {
      ScateCoreSDK.LoginSuccess(source);
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("LoginSuccess", e);
    }
  }

  @ReactMethod
  public void InterstitialAdShown(Promise promise)  {
    try {
      ScateCoreSDK.InterstitialAdShown();
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("InterstitialAdShown", e);
    }
  }

  @ReactMethod
  public void InterstitialAdClosed(Promise promise)  {
    try {
      ScateCoreSDK.InterstitialAdClosed();
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("InterstitialAdClosed", e);
    }
  }

  @ReactMethod
  public void RewardedAdShown(Promise promise)  {
    try {
      ScateCoreSDK.RewardedAdShown();
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("RewardedAdShown", e);
    }
  }

  @ReactMethod
  public void RewardedAdClosed(Promise promise)  {
    try {
      ScateCoreSDK.RewardedAdClosed();
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("RewardedAdClosed", e);
    }
  }

  @ReactMethod
  public void RewardedAdClaimed(Promise promise)  {
    try {
      ScateCoreSDK.RewardedAdClaimed();
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("RewardedAdClaimed", e);
    }
  }

  @ReactMethod
  public void BannerAdShown(Promise promise)  {
    try {
      ScateCoreSDK.BannerAdShown();
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("BannerAdShown", e);
    }
  }

  @ReactMethod
  public void NotificationPermissionGranted(Promise promise)  {
    try {
      ScateCoreSDK.NotificationPermissionGranted();
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("NotificationPermissionGranted", e);
    }
  }

  @ReactMethod
  public void NotificationPermissionDenied(Promise promise)  {
    try {
      ScateCoreSDK.NotificationPermissionDenied();
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("NotificationPermissionDenied", e);
    }
  }

  @ReactMethod
  public void LocationPermissionGranted(Promise promise)  {
    try {
      ScateCoreSDK.LocationPermissionGranted();
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("LocationPermissionGranted", e);
    }
  }

  @ReactMethod
  public void LocationPermissionDenied(Promise promise)  {
    try {
      ScateCoreSDK.LocationPermissionDenied();
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("LocationPermissionDenied", e);
    }
  }

  @ReactMethod
  public void ATTPromptShown(Promise promise)  {
    try {
      ScateCoreSDK.ATTPromptShown();
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("ATTPromptShown", e);
    }
  }

  @ReactMethod
  public void ATTPermissionGranted(Promise promise)  {
    try {
      ScateCoreSDK.ATTPermissionGranted();
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("ATTPermissionGranted", e);
    }
  }

  @ReactMethod
  public void ATTPermissionDenied(Promise promise)  {
    try {
      ScateCoreSDK.ATTPermissionDenied();
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("ATTPermissionDenied", e);
    }
  }

  @ReactMethod
  public void PaywallShown(String paywall,Promise promise)  {
    try {
      ScateCoreSDK.PaywallShown(paywall);
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("PaywallShown", e);
    }
  }

  @ReactMethod
  public void PaywallClosed(String paywall,Promise promise)  {
    try {
      ScateCoreSDK.PaywallClosed(paywall);
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("PaywallClosed", e);
    }
  }

  @ReactMethod
  public void PaywallAttempted(String paywall,Promise promise)  {
    try {
      ScateCoreSDK.PaywallAttempted(paywall);
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("PaywallAttempted", e);
    }
  }

  @ReactMethod
  public void PaywallPurchased(String paywall,Promise promise)  {
    try {
      ScateCoreSDK.PaywallPurchased(paywall);
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("PaywallPurchased", e);
    }
  }

  @ReactMethod
  public void PaywallCancelled(String paywall,Promise promise)  {
    try {
      ScateCoreSDK.PaywallCancelled(paywall);
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("PaywallCancelled", e);
    }
  }

  @ReactMethod
  public void TabClicked(String tab,Promise promise)  {
    try {
      ScateCoreSDK.TabClicked(tab);
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("TabClicked", e);
    }
  }

  @ReactMethod
  public void FeatureClicked(String feature, Promise promise)  {
    try {
      ScateCoreSDK.FeatureClicked(feature);
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("FeatureClicked", e);
    }
  }

  @ReactMethod
  public void DailyStreakShown(Promise promise)  {
    try {
      ScateCoreSDK.DailyStreakShown();
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("DailyStreakShown", e);
    }
  }

  @ReactMethod
  public void DailyStreakClaimed(Promise promise)  {
    try {
      ScateCoreSDK.DailyStreakClaimed();
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("DailyStreakClaimed", e);
    }
  }

  @ReactMethod
  public void DailyStreakClosed(Promise promise)  {
    try {
      ScateCoreSDK.DailyStreakClosed();
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("DailyStreakClosed", e);
    }
  }

  @ReactMethod
  public void ShowOnboarding(String jsonString, Promise promise) {
    // Empty implementation
    promise.resolve(null);
  }

  @ReactMethod
  public void ShowPaywall(String jsonString, Promise promise) {
    // Empty implementation
    promise.resolve(null);
  }

  @ReactMethod
  public void CloseOnboarding(Promise promise) {
    // Empty implementation
    promise.resolve(null);
  }

  @ReactMethod
  public void ClosePaywall(Promise promise) {
    // Empty implementation
    promise.resolve(null);
  }

   @ReactMethod
  public void ShowEventList(Promise promise) {
    // Empty implementation
    promise.resolve(null);
  }
}
