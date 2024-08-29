import ScateSDK

@objc(ScateSDK)
class ScateSDK: RCTEventEmitter {
  override func supportedEvents() -> [String]! {
      return [ScateCoreSDK.RemoteConfigsReady.rawValue]
  }

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

  @objc(GetRemoteConfig:withDefaultValue:withResolver:withRejecter:)
  func GetRemoteConfig(key: String, defaultValue: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    let config = ScateCoreSDK.GetRemoteConfig(key: key, defaultValue: defaultValue)
    resolve(config)
  }

  @objc
  func AddListener(_ name: String) {
      NotificationCenter.default.addObserver(self,
                                            selector: #selector(handleListener),
                                            name: Notification.Name(name),
                                            object: nil)
  }

  @objc
  func RemoveListener(_ name: String) {
      NotificationCenter.default.removeObserver(self,
                                              name: Notification.Name(name),
                                              object: nil)
  }

    @objc
    func handleListener(notification: Notification) {
        var userInfoJSON: [String: Any] = [:]
        
        if let userInfo = notification.userInfo {
            do {
                let data = try JSONSerialization.data(withJSONObject: userInfo, options: [])
                if let jsonString = String(data: data, encoding: .utf8) {
                }
            } catch {
                print("Error converting userInfo to JSON: \(error.localizedDescription)")
            }
        }
        
        let eventName = notification.name.rawValue

        userInfoJSON["data"] = notification.userInfo
        userInfoJSON["event"] = eventName

        sendEvent(withName: eventName, body: userInfoJSON)
    }
}
