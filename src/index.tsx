import { NativeEventEmitter, NativeModules, Platform } from 'react-native';

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

const eventEmitter = new NativeEventEmitter(_ScateSDK);

export enum ScateEvents {
  REMOTE_CONFIG_READY = 'Scate_RemoteConfigsReady',
}

export class ScateSDK {
  private static listeners: Map<string, Function> = new Map();

  public static Init(appID: string): Promise<void> {
    return _ScateSDK.Init(appID);
  }

  public static SetAdid(adid: string): Promise<void> {
    return _ScateSDK.SetAdid(adid);
  }

  public static Event(name: string): Promise<void> {
    return _ScateSDK.Event(name);
  }

  public static EventWithValue(
    name: string,
    customValue: string
  ): Promise<void> {
    return _ScateSDK.EventWithValue(name, customValue);
  }

  public static GetRemoteConfig(
    key: string,
    defaultValue: string
  ): Promise<string> {
    return _ScateSDK.GetRemoteConfig(key, defaultValue);
  }

  public static HandleEvent(name: string, event: any) {
    const listener = this.listeners.get(name);
    console.log(event);
    if (listener) {
      listener(event["data"]["remoteConfigFetched"]); 
    }
  }

  public static AddListener(name: string, listener: Function) {
    if (!this.listeners.has(name)) {
      _ScateSDK.AddListener(name); 
      eventEmitter.addListener(name, (event) => this.HandleEvent(name, event));
    }
    this.listeners.set(name, listener);
  }

  public static RemoveListener(name: string) {
    if (this.listeners.has(name)) {
      this.listeners.delete(name); 
      if (this.listeners.size === 0) {
        _ScateSDK.RemoveListener(name);
      }
    }
  }

  public static ClearListeners(name: string) {
    this.listeners.delete(name); 
    _ScateSDK.RemoveListener(name); 
  }
}


export default ScateSDK;
