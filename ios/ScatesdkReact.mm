#import <React/RCTBridgeModule.h>
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(ScateSDK, RCTEventEmitter)

RCT_EXTERN_METHOD(Init:(NSString *)appID
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(SetAdid:(NSString *)adid
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(Event:(NSString *)name
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(EventWithValue:(NSString *)name
                  withCustomValue:(NSString* )customValue
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(GetRemoteConfig:(NSString *)key
                 withDefaultValue:(NSString *)defaultValue
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)                 

RCT_EXTERN_METHOD(AddListener:(NSString*) name)
RCT_EXTERN_METHOD(RemoveListener:(NSString*) name)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
