import ScateSDK

@objc(ScateSDK)
class ScateSDK: NSObject {

  @objc(Init:withResolver:withRejecter:)
  func Init(appID: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
    ScateCoreSDK.Init(appID: appID)
    resolve("")
  }

  @objc(SetAdid:withResolver:withRejecter:)
  func SetAdid(adid: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
    ScateCoreSDK.SetAdid(adid: adid)
    resolve("")
  }
    
    @objc(Event:withResolver:withRejecter:)
    func Event(name: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
      ScateCoreSDK.Event(name: name)
      resolve("")
    }

    @objc(EventWithValue:withCustomValue:withResolver:withRejecter:)
    func EventWithValue(name: String, value: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
      ScateCoreSDK.Event(name: name, customValue: value)
      resolve("")
    }

}
