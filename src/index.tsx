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
  private static listeners: Map<string, Map<string, Function>> = new Map();

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

  public static HandleEvent = (name: string, event: any) => {
    const listeners = this.listeners.get(name);
    if (listeners) {
      listeners.forEach((listener) => {
        listener(event); // Pass event data to listeners
      });
    }
  };

  public static AddListener(name: string, listener: Function) {
    const listenerId = Date.now().toString(); // Create unique listener ID based on current timestamp
    if (!this.listeners.has(name)) {
      this.listeners.set(name, new Map());
      _ScateSDK.AddListener(name); // Register native listener
      eventEmitter.addListener(name, (event) => this.HandleEvent(name, event));
    }
    this.listeners.get(name)?.set(listenerId, listener); // Store listener with ID
    return listenerId; // Return the listener ID
  }

  public static RemoveListener(name: string, listenerId: string) {
    const listeners = this.listeners.get(name);
    if (listeners && listeners.has(listenerId)) {
      listeners.delete(listenerId); // Remove listener from map
      if (listeners.size === 0) {
        this.listeners.delete(name); // Remove entire map entry if no listeners remain
        _ScateSDK.RemoveListener(name); // Unregister native listener
      }
    }
  }

  public static ClearListeners(name: string) {
    this.listeners.delete(name); // Remove all listeners for a given event
    _ScateSDK.RemoveListener(name); // Unregister native listener
  }
}

export default ScateSDK;
