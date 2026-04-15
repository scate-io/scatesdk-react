describe('ScateSDK.Event', () => {
  const loadScateSDK = () => {
    const mockScateSDK = {
      Event: jest.fn(),
      EventWithValue: jest.fn(),
      GetUserID: jest.fn(),
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

  it('returns the native Scate user id', () => {
    const { ScateSDK, mockScateSDK } = loadScateSDK();
    mockScateSDK.GetUserID.mockReturnValue(Promise.resolve('user-id'));

    const result = ScateSDK.GetUserID();

    expect(mockScateSDK.GetUserID).toHaveBeenCalledWith();
    return expect(result).resolves.toBe('user-id');
  });
});
