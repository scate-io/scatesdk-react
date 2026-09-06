describe('ScateSDK.Event', () => {
  const loadScateSDK = () => {
    const mockScateSDK = {
      Event: jest.fn(),
      EventWithValue: jest.fn(),
      EventWithValueAndParameters: jest.fn(),
      GetAdjustId: jest.fn(),
      GetUserID: jest.fn(),
      InitAdjust: jest.fn(),
    };

    jest.resetModules();
    jest.doMock('react-native', () => ({
      NativeModules: {
        ScateSDK: mockScateSDK,
      },
      NativeEventEmitter: jest.fn().mockImplementation(() => ({
        addListener: jest.fn(),
      })),
      Platform: {
        select: jest.fn((options) => options.default),
      },
    }));

    const { ScateSDK } = require('../index') as typeof import('../index');
    return { ScateSDK, mockScateSDK };
  };

  afterEach(() => {
    jest.dontMock('react-native');
  });

  it('calls native Event with null parameters when no dictionary is provided', () => {
    const { ScateSDK, mockScateSDK } = loadScateSDK();

    ScateSDK.Event('button_clicked');

    expect(mockScateSDK.Event).toHaveBeenCalledWith('button_clicked', null);
  });

  it('calls native Event directly with the provided parameters dictionary', () => {
    const { ScateSDK, mockScateSDK } = loadScateSDK();
    const parameters = {
      screen: 'paywall',
      position: 1,
      isPrimary: true,
    };

    ScateSDK.Event('button_clicked', parameters);

    expect(mockScateSDK.Event).toHaveBeenCalledWith(
      'button_clicked',
      parameters
    );
  });

  it('keeps legacy custom value events on EventWithValue', () => {
    const { ScateSDK, mockScateSDK } = loadScateSDK();

    ScateSDK.EventWithValue('button_clicked', 'subscribe_btn');

    expect(mockScateSDK.EventWithValue).toHaveBeenCalledWith(
      'button_clicked',
      'subscribe_btn'
    );
  });

  it('sends custom value and parameters together', () => {
    const { ScateSDK, mockScateSDK } = loadScateSDK();
    const parameters = { page: 'market', grade: 'PSA10' };

    ScateSDK.EventWithValueAndParameters('result', 'grade_changed', parameters);

    expect(mockScateSDK.EventWithValueAndParameters).toHaveBeenCalledWith(
      'result',
      'grade_changed',
      parameters
    );
  });

  it('passes null parameters when none are provided to EventWithValueAndParameters', () => {
    const { ScateSDK, mockScateSDK } = loadScateSDK();

    ScateSDK.EventWithValueAndParameters('result', 'view_sold_listings');

    expect(mockScateSDK.EventWithValueAndParameters).toHaveBeenCalledWith(
      'result',
      'view_sold_listings',
      null
    );
  });

  it('returns the native Scate user id', () => {
    const { ScateSDK, mockScateSDK } = loadScateSDK();
    mockScateSDK.GetUserID.mockReturnValue(Promise.resolve('user-id'));

    const result = ScateSDK.GetUserID();

    expect(mockScateSDK.GetUserID).toHaveBeenCalledWith();
    return expect(result).resolves.toBe('user-id');
  });

  it('initializes Adjust with noATT disabled by default', () => {
    const { ScateSDK, mockScateSDK } = loadScateSDK();

    ScateSDK.InitAdjust('adjust-token');

    expect(mockScateSDK.InitAdjust).toHaveBeenCalledWith('adjust-token', {
      noATT: false,
    });
  });

  it('passes noATT through to native Adjust initialization', () => {
    const { ScateSDK, mockScateSDK } = loadScateSDK();

    ScateSDK.InitAdjust('adjust-token', { noATT: true });

    expect(mockScateSDK.InitAdjust).toHaveBeenCalledWith('adjust-token', {
      noATT: true,
    });
  });

  it('passes the Adjust id callback to native', () => {
    const { ScateSDK, mockScateSDK } = loadScateSDK();
    const callback = jest.fn();

    ScateSDK.GetAdjustId(callback);

    expect(mockScateSDK.GetAdjustId).toHaveBeenCalledWith(callback);
  });
});

describe('ScateSDK remote config getters', () => {
  const loadScateSDK = () => {
    const mockScateSDK = {
      GetRemoteConfig: jest.fn(),
      GetRemoteConfigBool: jest.fn(),
      GetRemoteConfigInt: jest.fn(),
      GetRemoteConfigDouble: jest.fn(),
    };

    jest.resetModules();
    jest.doMock('react-native', () => ({
      NativeModules: {
        ScateSDK: mockScateSDK,
      },
      NativeEventEmitter: jest.fn().mockImplementation(() => ({
        addListener: jest.fn(),
      })),
      Platform: {
        select: jest.fn((options) => options.default),
      },
    }));

    const { ScateSDK } = require('../index') as typeof import('../index');
    return { ScateSDK, mockScateSDK };
  };

  afterEach(() => {
    jest.dontMock('react-native');
  });

  it('passes the key and the typed default to the native module', () => {
    const { ScateSDK, mockScateSDK } = loadScateSDK();

    ScateSDK.GetRemoteConfigBool('new_camera', false);
    ScateSDK.GetRemoteConfigInt('scan_limit', 10);
    ScateSDK.GetRemoteConfigDouble('crop_ratio', 1.5);

    expect(mockScateSDK.GetRemoteConfigBool).toHaveBeenCalledWith(
      'new_camera',
      false
    );
    expect(mockScateSDK.GetRemoteConfigInt).toHaveBeenCalledWith(
      'scan_limit',
      10
    );
    expect(mockScateSDK.GetRemoteConfigDouble).toHaveBeenCalledWith(
      'crop_ratio',
      1.5
    );
  });
});
