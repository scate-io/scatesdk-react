import ScateSDK

@objc(ScateSDK)
class ScateSDK: RCTEventEmitter {
  override func supportedEvents() -> [String]! {
      return [ScateCoreSDK.RemoteConfigsReady.rawValue,
      ScateCoreSDK.PaidProductClicked.rawValue,
      ScateCoreSDK.OnboardingScreensFinished.rawValue,
      ScateCoreSDK.PaywallScreenClosed.rawValue,
      ScateCoreSDK.OnboardingScreenClosed.rawValue,
      ScateCoreSDK.PaywallScreenFinished.rawValue,
      ScateCoreSDK.RestorePurchaseClicked.rawValue]
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
    
  //Event functions
  @objc(OnboardingStart:withRejecter:)
  func OnboardingStart(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.OnboardingStart()
    resolve(nil)
  }

  @objc(OnboardingStep:withResolver:withRejecter:)
  func OnboardingStep(step: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.OnboardingStep(step: step)
    resolve(nil)
  }

  @objc(OnboardingFinish:withRejecter:)
  func OnboardingFinish(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.OnboardingFinish()
    resolve(nil)
  }

  @objc(LoginSuccess:withResolver:withRejecter:)
  func LoginSuccess(source: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.LoginSuccess(source: source)
    resolve(nil)
  }

  @objc(InterstitialAdShown:withRejecter:)
  func InterstitialAdShown(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.InterstitialAdShown()
    resolve(nil)
  }

  @objc(InterstitialAdClosed:withRejecter:)
  func InterstitialAdClosed(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.InterstitialAdClosed()
    resolve(nil)
  }

  @objc(RewardedAdShown:withRejecter:)
  func RewardedAdShown(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.RewardedAdShown()
    resolve(nil)
  }

  @objc(RewardedAdClosed:withRejecter:)
  func RewardedAdClosed(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.RewardedAdClosed()
    resolve(nil)
  }

  @objc(RewardedAdClaimed:withRejecter:)
  func RewardedAdClaimed(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.RewardedAdClaimed()
    resolve(nil)
  }

  @objc(BannerAdShown:withRejecter:)
  func BannerAdShown(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.BannerAdShown()
    resolve(nil)
  }

  @objc(NotificationPermissionGranted:withRejecter:)
  func NotificationPermissionGranted(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.NotificationPermissionGranted()
    resolve(nil)
  }

  @objc(NotificationPermissionDenied:withRejecter:)
  func NotificationPermissionDenied(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.NotificationPermissionDenied()
    resolve(nil)
  }

  @objc(LocationPermissionGranted:withRejecter:)
  func LocationPermissionGranted(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.LocationPermissionGranted()
    resolve(nil)
  }

  @objc(LocationPermissionDenied:withRejecter:)
  func LocationPermissionDenied(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.LocationPermissionDenied()
    resolve(nil)
  }

  @objc(ATTPromptShown:withRejecter:)
  func ATTPromptShown(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.ATTPromptShown()
    resolve(nil)
  }

  @objc(ATTPermissionGranted:withRejecter:)
  func ATTPermissionGranted(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.ATTPermissionGranted()
    resolve(nil)
  }

  @objc(ATTPermissionDenied:withRejecter:)
  func ATTPermissionDenied(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.ATTPermissionDenied()
    resolve(nil)
  }

  @objc(PaywallShown:withResolver:withRejecter:)
  func PaywallShown(paywall: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.PaywallShown(paywall: paywall)
    resolve(nil)
  }

  @objc(PaywallClosed:withResolver:withRejecter:)
  func PaywallClosed(paywall: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.PaywallClosed(paywall: paywall)
    resolve(nil)
  }

  @objc(PaywallAttempted:withResolver:withRejecter:)
  func PaywallAttempted(paywall: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.PaywallAttempted(paywall: paywall)
    resolve(nil)
  }

  @objc(PaywallPurchased:withResolver:withRejecter:)
  func PaywallPurchased(paywall: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.PaywallPurchased(paywall: paywall)
    resolve(nil)
  }

  @objc(PaywallCancelled:withResolver:withRejecter:)
  func PaywallCancelled(paywall: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.PaywallCancelled(paywall: paywall)
    resolve(nil)
  }

  @objc(TabClicked:withResolver:withRejecter:)
  func TabClicked(tab: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.TabClicked(tab: tab)
    resolve(nil)
  }

  @objc(FeatureClicked:withResolver:withRejecter:)
  func FeatureClicked(feature: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.FeatureClicked(feature: feature)
    resolve(nil)
  }

  @objc(DailyStreakShown:withRejecter:)
  func DailyStreakShown(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.DailyStreakShown()
    resolve(nil)
  }

  @objc(DailyStreakClaimed:withRejecter:)
  func DailyStreakClaimed(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.DailyStreakClaimed()
    resolve(nil)
  }

  @objc(DailyStreakClosed:withRejecter:)
  func DailyStreakClosed(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.DailyStreakClosed()
    resolve(nil)
  }

   @objc(ShowOnboarding:withResolver:withRejecter:)
  func ShowOnboarding(jsonString: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.ShowOnboarding(jsonString: jsonString)
    resolve(nil)
  }

  @objc(ShowPaywall:withResolver:withRejecter:)
  func ShowPaywall(jsonString: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.ShowPaywall(jsonString: jsonString)
    resolve(nil)
  }

  @objc(CloseOnboarding:withRejecter:)
  func CloseOnboarding(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.CloseOnboarding()
    resolve(nil)
  }

  @objc(ClosePaywall:withRejecter:)
  func ClosePaywall(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.ClosePaywall()
    resolve(nil)
  }
}
