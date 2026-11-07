import * as React from 'react';

import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ScateEvents, ScateSDK } from 'scatesdk-react';

const adjustToken = '19atefbehslc';

type SdkMetadata = Awaited<ReturnType<typeof ScateSDK.GetSdkMetadata>>;

export default function App() {
  const [result, setResult] = React.useState<string | undefined>();
  const [success, setSuccess] = React.useState<boolean>(false);
  const [adjustStatus, setAdjustStatus] =
    React.useState<string>('Adjust not started');
  const [adjustId, setAdjustId] = React.useState<string | undefined>();
  const [appMetadata, setAppMetadata] = React.useState<SdkMetadata | null>(
    null
  );
  const [appMetadataError, setAppMetadataError] = React.useState<
    string | undefined
  >();

  const loadAppMetadata = React.useCallback(async () => {
    try {
      setAppMetadataError(undefined);
      const metadata = await ScateSDK.GetSdkMetadata();
      setAppMetadata(metadata);
    } catch (error) {
      setAppMetadata(null);
      setAppMetadataError(
        error instanceof Error ? error.message : 'Failed to load metadata'
      );
    }
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      // Example usage of ScateSDK event listeners.
      // Add these listeners if you need to handle specific events in your app.
      ScateSDK.AddListener(
        ScateEvents.REMOTE_CONFIG_READY,
        async (isSuccessful: boolean) => {
          console.log('Success:', isSuccessful);
          console.log(
            'Remote',
            await ScateSDK.GetRemoteConfig('test', 'default')
          );
          let r = await ScateSDK.GetRemoteConfig('test', 'default');
          console.log(
            'Typed',
            await ScateSDK.GetRemoteConfigBool('test', false),
            await ScateSDK.GetRemoteConfigInt('test1', -1),
            await ScateSDK.GetRemoteConfigDouble('test2', -1)
          );
          // set state
          setResult(r);
          setSuccess(isSuccessful);
        }
      );

      await ScateSDK.Init('uw2YK', { debug: true });
      console.log('Scate userId:', await ScateSDK.GetUserID());
      await loadAppMetadata();

      try {
        setAdjustStatus('Adjust initializing');
        await ScateSDK.InitAdjust(adjustToken);
        setAdjustStatus('Adjust initialized, waiting for ADID');
        ScateSDK.GetAdjustId((adid) => {
          setAdjustId(adid);
          setAdjustStatus('ADID ready');
        });
      } catch (error) {
        console.log('Adjust init failed:', error);
        setAdjustStatus('Adjust init failed');
      }

      // Example ScateSDK event functions.
      // If you need to send events, you can use these functions.
      ScateSDK.Event('test-event');
      ScateSDK.Event('test-event-with-parameters', {
        screen: 'react_native_example',
        action: 'app_started',
        debug: __DEV__,
      });
      ScateSDK.EventWithValueAndParameters(
        'test-event-with-value-and-parameters',
        'react_native_example',
        { screen: 'react_native_example' }
      );
      ScateSDK.OnboardingStart();
      ScateSDK.OnboardingStep('location_screen');
      ScateSDK.OnboardingStep('notification_screen');
      ScateSDK.OnboardingStep('personalization_screen');
      ScateSDK.OnboardingStep('journey_screen');
      ScateSDK.OnboardingStep('intro_paywall_screen');
      ScateSDK.OnboardingStep('fullscreen_ad');
      ScateSDK.OnboardingFinish();

      ScateSDK.LoginSuccess('apple');
      ScateSDK.LoginSuccess('email');
      ScateSDK.LoginSuccess('fb');
      ScateSDK.LoginSuccess('google');

      ScateSDK.InterstitialAdShown();
      ScateSDK.InterstitialAdClosed();
      ScateSDK.RewardedAdShown();
      ScateSDK.RewardedAdClosed();
      ScateSDK.RewardedAdClaimed();
      ScateSDK.BannerAdShown();

      ScateSDK.NotificationPermissionGranted();
      ScateSDK.NotificationPermissionDenied();
      ScateSDK.LocationPermissionGranted();
      ScateSDK.LocationPermissionDenied();
      ScateSDK.ATTPromptShown();
      ScateSDK.ATTPermissionGranted();
      ScateSDK.ATTPermissionDenied();

      ScateSDK.PaywallShown('paywall_name');
      ScateSDK.PaywallClosed('paywall_name');
      ScateSDK.PaywallAttempted('paywall_name');
      ScateSDK.PaywallPurchased('paywall_name');
      ScateSDK.PaywallCancelled('paywall_name');

      ScateSDK.TabClicked('x');
      ScateSDK.TabClicked('y');

      ScateSDK.FeatureClicked('x');
      ScateSDK.FeatureClicked('y');

      ScateSDK.DailyStreakShown();
      ScateSDK.DailyStreakClaimed();
      ScateSDK.DailyStreakClosed();

      ScateSDK.RevenuecatInitiated();
      ScateSDK.AdjustInitiated();
      ScateSDK.AdjustSetToRevenuecat();
      ScateSDK.SplashCompleted();
      ScateSDK.FirebaseRemoteInitiated();
      ScateSDK.HomeScreenOpen();
      ScateSDK.OnboardingPaywallShown();
      ScateSDK.OnboardingPaywallClosed();

      ScateSDK.SubscriptionSuccess();
      ScateSDK.InAppPurchaseSuccess();
      ScateSDK.SubsStart();
      ScateSDK.SubsSuccess();
      ScateSDK.SubsFail();
      ScateSDK.SubsCancel();

      ScateSDK.ContentCreateStart();
      ScateSDK.ContentCreateSuccess();
      ScateSDK.ContentCreateFail();

      ScateSDK.AllServicesInitialized();

      ScateSDK.EventWithValue('content_created', 'paid');
      ScateSDK.EventWithValue('content_created', 'free');

      ScateSDK.EventWithValue('subscription_weekly', 'OB');
      ScateSDK.EventWithValue('subscription_weekly', '');
      ScateSDK.EventWithValue('subscription_yearly', 'OB');
      ScateSDK.EventWithValue('subscription_yearly', '');
      ScateSDK.OutputFail();
      ScateSDK.OutputSuccess();
      ScateSDK.Like();
      ScateSDK.Dislike();
      ScateSDK.ContentCreated('content');
      ScateSDK.ContentCreateStart();
      ScateSDK.ContentCreateSuccess();
      ScateSDK.ContentCreateFail();
      ScateSDK.ContentCreated('content');
      ScateSDK.ContentCreateStart();

      // Example usage of ScateSDK remote config.
      // Use these function if you have set up remote config in your Scate dashboard.
      let r = await ScateSDK.GetRemoteConfig('test', 'default');
      setResult(r);

      //ScateSDK.RemoveListener(ScateEvents.REMOTE_CONFIG_READY);
      //ScateSDK.ClearListeners(ScateEvents.REMOTE_CONFIG_READY);

      ScateSDK.ShowEventList();
    };

    fetchData();
  }, [loadAppMetadata]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Scate React Example</Text>
      <View style={styles.statusGroup}>
        <Text style={styles.label}>Remote config</Text>
        <Text>Result: {result ?? 'waiting'}</Text>
        <Text>Success: {success?.toString()}</Text>
      </View>
      <View style={styles.statusGroup}>
        <Text style={styles.label}>Adjust</Text>
        <Text>Status: {adjustStatus}</Text>
        <Text selectable={true}>ADID: {adjustId ?? 'waiting'}</Text>
      </View>
      <View style={styles.statusGroup}>
        <Text style={styles.label}>App metadata</Text>
        {appMetadataError ? (
          <Text style={styles.errorText}>Error: {appMetadataError}</Text>
        ) : appMetadata ? (
          <>
            <Text selectable={true}>
              Native SDK: {appMetadata.sdkNativeVersion ?? '—'}
            </Text>
            <Text selectable={true}>
              Platform: {appMetadata.sdkPlatform ?? '—'}
            </Text>
            <Text selectable={true}>
              React SDK version: {appMetadata.sdkPlatformVersion ?? '—'}
            </Text>
          </>
        ) : (
          <Text>Loading…</Text>
        )}
        <Button title="Refresh metadata" onPress={loadAppMetadata} />
      </View>
      <View style={styles.actions} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  statusGroup: {
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    color: '#c62828',
  },
  actions: {
    width: '100%',
    gap: 12,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
