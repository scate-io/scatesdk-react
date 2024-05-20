package com.scatesdkreact;


import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = ScatesdkReactModule.NAME)
public class ScatesdkReactModule extends ReactContextBaseJavaModule {
  public static final String NAME = "ScateSDK";

  public ScatesdkReactModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod
  public void Init(String appID, Promise promise){
    // not implemented yet
    promise.resolve("");
  }

  @ReactMethod
  public void SetAdid(String adid, Promise promise){
    // not implemented yet
    promise.resolve("");
  }

  @ReactMethod
  public void Event(String name, Promise promise){
    // not implemented yet
    promise.resolve("");
  }

  @ReactMethod
  public void EventWithValue(String name, String customValue, Promise promise){
    // not implemented yet
    promise.resolve("");
  }


}
