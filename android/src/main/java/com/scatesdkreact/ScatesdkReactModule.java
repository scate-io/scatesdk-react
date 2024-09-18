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

}
