import { NativeModules, Platform } from 'react-native';

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

export class ScateSDK {
  public static Init(appID: String): Promise<void> {
    return _ScateSDK.Init(appID);
  }

  public static SetAdid(adid: String): Promise<void> {
    return _ScateSDK.SetAdid(adid);
  }

  public static Event(name: String): Promise<void> {
    return _ScateSDK.Event(name);
  }

  public static EventWithValue(
    name: String,
    customValue: String
  ): Promise<void> {
    return _ScateSDK.EventWithValue(name, customValue);
  }
}
export default ScateSDK;
