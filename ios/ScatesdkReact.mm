#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ScateSDK, NSObject)

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
                 
+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
