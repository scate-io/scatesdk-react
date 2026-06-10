import LocalAuthentication
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

  @objc(Init:withOptions:withResolver:withRejecter:)
  func Init(appID: String, options: NSDictionary?, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
    let configuration = ScateSDKConfiguration()
    if let debug = options?["debug"] as? Bool {
      ScateCoreSDK.debug = debug
    }

    if let firebaseUserIdSyncEnabled = options?["firebaseUserIdSyncEnabled"] as? Bool {
      configuration.firebaseUserIdSyncEnabled = firebaseUserIdSyncEnabled
    }

    configuration.sdkPlatform = "react-native"
    configuration.sdkPlatformVersion = ScatesdkReactVersion.value

    ScateCoreSDK.Init(appID: appID, configuration: configuration)
    resolve("")
  }

  @objc(SetAdid:withResolver:withRejecter:)
  func SetAdid(adid: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
    ScateCoreSDK.SetAdid(adid: adid)
    resolve("")
  }

  @objc(InitAdjust:withOptions:withResolver:withRejecter:)
  func InitAdjust(adjustToken: String, options: NSDictionary?, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
    let noATT = options?["noATT"] as? Bool ?? false
    ScateCoreSDK.InitAdjust(adjustToken: adjustToken, noATT: noATT)
    resolve("")
  }

  @objc(GetAdjustId:)
  func GetAdjustId(callback: @escaping RCTResponseSenderBlock) -> Void {
    ScateCoreSDK.GetAdjustId { adid in
      callback([adid])
    }
  }

  @objc(Event:withParameters:withResolver:withRejecter:)
  func Event(name: String, parameters: NSDictionary?, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
    if let parameters {
      ScateCoreSDK.Event(name: name, parameters: parameters)
    } else {
      ScateCoreSDK.Event(name: name)
    }
    resolve("")
  }

  @objc(EventWithParameters:withParameters:withResolver:withRejecter:)
  func EventWithParameters(name: String, parameters: NSDictionary, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
    Event(name: name, parameters: parameters, resolve: resolve, reject: reject)
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

  @objc(GetUserID:withRejecter:)
  func GetUserID(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    resolve(ScateCoreSDK.GetUserID())
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

  @objc(FunnelStep:withResolver:withRejecter:)
  func FunnelStep(step: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.FunnelStep(step: step)
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

  @objc(TabView:withResolver:withRejecter:)
  func TabView(tab: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.TabView(tab: tab)
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

  @objc(RevenuecatInitiated:withRejecter:)
  func RevenuecatInitiated(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.RevenuecatInitiated()
    resolve(nil)
  }

  @objc(AdjustInitiated:withRejecter:)
  func AdjustInitiated(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.AdjustInitiated()
    resolve(nil)
  }

  @objc(AdjustSetToRevenuecat:withRejecter:)
  func AdjustSetToRevenuecat(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.AdjustSetToRevenuecat()
    resolve(nil)
  }

  @objc(SplashCompleted:withRejecter:)
  func SplashCompleted(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.SplashCompleted()
    resolve(nil)
  }

  @objc(FirebaseRemoteInitiated:withRejecter:)
  func FirebaseRemoteInitiated(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.FirebaseRemoteInitiated()
    resolve(nil)
  }

  @objc(HomeScreenOpen:withRejecter:)
  func HomeScreenOpen(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.HomeScreenOpen()
    resolve(nil)
  }

  @objc(OnboardingPaywallShown:withRejecter:)
  func OnboardingPaywallShown(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.OnboardingPaywallShown()
    resolve(nil)
  }

  @objc(OnboardingPaywallClosed:withRejecter:)
  func OnboardingPaywallClosed(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.OnboardingPaywallClosed()
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

  @objc(ShowPaidProductLoadingScreen:withRejecter:)
  func ShowPaidProductLoadingScreen(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.ShowPaidProductLoadingScreen()
    resolve(nil)
  }

  @objc(ClosePaidProductLoadingScreen:withRejecter:)
  func ClosePaidProductLoadingScreen(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.ClosePaidProductLoadingScreen()
    resolve(nil)
  }

  @objc(SubscriptionSuccess:withRejecter:)
  func SubscriptionSuccess(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.SubscriptionSuccess()
    resolve(nil)
  }

  @objc(SubscriptionWeekly:withResolver:withRejecter:)
  func SubscriptionWeekly(source: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.SubscriptionWeekly(source: source)
    resolve(nil)
  }

  @objc(SubscriptionMonthly:withResolver:withRejecter:)
  func SubscriptionMonthly(source: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.SubscriptionMonthly(source: source)
    resolve(nil)
  }

  @objc(SubscriptionYearly:withResolver:withRejecter:)
  func SubscriptionYearly(source: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.SubscriptionYearly(source: source)
    resolve(nil)
  }

  @objc(PurchaseFailed:withResolver:withRejecter:)
  func PurchaseFailed(source: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.PurchaseFailed(source: source)
    resolve(nil)
  }

  @objc(PurchaseRestored:withResolver:withRejecter:)
  func PurchaseRestored(source: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.PurchaseRestored(source: source)
    resolve(nil)
  }

  @objc(InAppPurchaseSuccess:withRejecter:)
  func InAppPurchaseSuccess(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.InAppPurchaseSuccess()
    resolve(nil)
  }

  @objc(ContentCreateStart:withRejecter:)
  func ContentCreateStart(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.ContentCreateStart()
    resolve(nil)
  }

  @objc(ContentCreateSuccess:withRejecter:)
  func ContentCreateSuccess(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.ContentCreateSuccess()
    resolve(nil)
  }

  @objc(ContentCreateFail:withRejecter:)
  func ContentCreateFail(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.ContentCreateFail()
    resolve(nil)
  }

  @objc(ContentCreated:withResolver:withRejecter:)
  func ContentCreated(content: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.ContentCreated(content: content)
    resolve(nil)
  }

  @objc(Like:withRejecter:)
  func Like(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.Like()
    resolve(nil)
  }

  @objc(Dislike:withRejecter:)
  func Dislike(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.Dislike()
    resolve(nil)
  }

  @objc(OutputSuccess:withRejecter:)
  func OutputSuccess(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.OutputSuccess()
    resolve(nil)
  }

  @objc(OutputFail:withRejecter:)
  func OutputFail(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.OutputFail()
    resolve(nil)
  }

  @objc(SubsStart:withRejecter:)
  func SubsStart(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.SubsStart()
    resolve(nil)
  }

  @objc(SubsSuccess:withRejecter:)
  func SubsSuccess(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.SubsSuccess()
    resolve(nil)
  }

  @objc(SubsFail:withRejecter:)
  func SubsFail(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.SubsFail()
    resolve(nil)
  }

  @objc(SubsCancel:withRejecter:)
  func SubsCancel(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.SubsCancel()
    resolve(nil)
  }

  @objc(AllServicesInitialized:withRejecter:)
  func AllServicesInitialized(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.AllServicesInitialized()
    resolve(nil)
  }

  @objc(ShowEventList:withRejecter:)
  func ShowEventList(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    ScateCoreSDK.ShowEventList()
    resolve(nil)
  }

  @objc(GetSdkMetadata:withRejecter:)
  func GetSdkMetadata(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    let metadata: [String: String] = [
      "sdkNativeVersion": ScateCoreSDK.GetSdkNativeVersion(),
      "sdkPlatformVersion": ScatesdkReactVersion.value,
      "sdkPlatform": "react-native",
    ]
    resolve(metadata)
  }
}
