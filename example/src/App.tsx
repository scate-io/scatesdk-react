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

  const showPaywall = () => {
    //For media you can also use image path like this
    //import { Image } from 'react-native';
    //const assetPath = './assets/images/app_logo.png';
    //const image = require(assetPath);
    //const imageUri = Image.resolveAssetSource(image).uri;

    const paywallData = {
      media: 'https://ninegshort.b-cdn.net/Apps/ScateSDK/ob_sample.png',
      heading: 'Heading',
      details: ['✓ Details 1', '✓ Details 2', '✓ Details 3', '✓ Details 4'],
      paidProducts: [
        {
          selectedBackgroundColor: '#252f60',
          unselectedBackgroundColor: '#1E1E1E',
          unselectedBorderColor: '#174d67',
          badgeSelectedColor: '#9747FF',
          identifier: 'Identifier1',
          title: '[Product]',
          badgeText: 'Badge1',
          badgeUnselectedColor: '#587BF6',
          selectedBorderColor: '#4a3288',
          price: '$Price1',
          badgeTextColor: '#ffffff',
          titleColor: '#ffffff',
          priceColor: '#ffffff',
        },
        {
          tagUnselectedColor: '#587BF6',
          badgeSelectedColor: '#9747FF',
          unselectedBackgroundColor: '#1E1E1E',
          badgeText: 'Badge2',
          tagSelectedColor: '#058ed2',
          price: '$Price2',
          identifier: 'Identifier2',
          unselectedBorderColor: '#174d67',
          badgeUnselectedColor: '#587BF6',
          title: '[Product]',
          selectedBackgroundColor: '#252f60',
          selectedBorderColor: '#4a3288',
          tagText: 'Tag2',
          badgeTextColor: '#ffffff',
          titleColor: '#ffffff',
          priceColor: '#ffffff',
          tagTextColor: '#ffffff',
        },
        {
          descriptionText: 'Description',
          unselectedBackgroundColor: '#1E1E1E',
          price: '$Price3',
          identifier: 'Identifier3',
          selectedBackgroundColor: '#252f60',
          selectedBorderColor: '#4a3288',
          unselectedBorderColor: '#174d67',
          title: '[Product]',
          titleColor: '#ffffff',
          priceColor: '#ffffff',
          descriptionTextColor: '#ffffff',
        },
      ],
      selectedPaidProduct: 'Identifier2',
      buttonTitle: 'Button',
      termsOfUse: 'https://www.google.com/',
      privacyPolicy: 'https://www.google.com/',
      footNote: 'Auto Renewable. Cancel Anytime.',
      backgroundColor: '#000000',
      actionButtonColor1: '#587BF6',
      actionButtonColor2: '#2C58F3',
      headingColor: '#ffffff',
      buttonTitleColor: '#ffffff',
      termsOfUseColor: '#ffffff',
      footNoteColor: '#ffffff',
      restoreButtonColor: '#ffffff',
      privacyPolicyColor: '#ffffff',
      detailsColor: '#ffffff',
    };

    const jsonString = JSON.stringify(paywallData);

    ScateSDK.ShowPaywall(jsonString);
  };

  const showOnboarding = () => {
    //For media you can also use image path like this
    //import { Image } from 'react-native';
    //const assetPath = './assets/images/app_logo.png';
    //const image = require(assetPath);
    //const imageUri = Image.resolveAssetSource(image).uri;

    const onboardingData = [
      {
        type: 'basic',
        media: 'https://ninegshort.b-cdn.net/Apps/ScateSDK/ob_sample.png',
        heading: 'Heading 1',
        buttonTitle: 'Button 1',
        paidProducts: [],
        title: '[App Name]',
        backgroundColor: '#000000',
        actionButtonColor1: '#587BF6',
        actionButtonColor2: '#2C58F3',
        titleColor: '#ffffff',
        headingColor: '#ffffff',
        buttonTitleColor: '#ffffff',
      },
      {
        type: 'basic',
        media: 'https://ninegshort.b-cdn.net/Apps/ScateSDK/ob_sample.png',
        heading: 'Heading 2',
        buttonTitle: 'Button 2',
        paidProducts: [],
        title: '[App Name]',
        backgroundColor: '#000000',
        actionButtonColor1: '#587BF6',
        actionButtonColor2: '#2C58F3',
        titleColor: '#ffffff',
        headingColor: '#ffffff',
        buttonTitleColor: '#ffffff',
      },
      {
        type: 'paywall',
        media: 'https://ninegshort.b-cdn.net/Apps/ScateSDK/ob_sample.png',
        heading: 'Heading 3',
        buttonTitle: 'Button 3',
        paidProducts: [
          {
            selectedBackgroundColor: '#252f60',
            unselectedBackgroundColor: '#1E1E1E',
            unselectedBorderColor: '#174d67',
            badgeSelectedColor: '#9747FF',
            identifier: 'Identifier1',
            title: '[Product]',
            badgeText: 'Badge1',
            badgeUnselectedColor: '#587BF6',
            selectedBorderColor: '#4a3288',
            price: '$Price1',
            badgeTextColor: '#ffffff',
            titleColor: '#ffffff',
            priceColor: '#ffffff',
          },
          {
            tagUnselectedColor: '#587BF6',
            badgeSelectedColor: '#9747FF',
            unselectedBackgroundColor: '#1E1E1E',
            badgeText: 'Badge2',
            tagSelectedColor: '#058ed2',
            price: '$Price2',
            identifier: 'Identifier2',
            unselectedBorderColor: '#174d67',
            badgeUnselectedColor: '#587BF6',
            title: '[Product]',
            selectedBackgroundColor: '#252f60',
            selectedBorderColor: '#4a3288',
            tagText: 'Tag2',
            badgeTextColor: '#ffffff',
            titleColor: '#ffffff',
            priceColor: '#ffffff',
            tagTextColor: '#ffffff',
          },
          {
            descriptionText: 'Description',
            unselectedBackgroundColor: '#1E1E1E',
            price: '$Price3',
            identifier: 'Identifier3',
            selectedBackgroundColor: '#252f60',
            selectedBorderColor: '#4a3288',
            unselectedBorderColor: '#174d67',
            title: '[Product]',
            titleColor: '#ffffff',
            priceColor: '#ffffff',
            descriptionTextColor: '#ffffff',
          },
        ],
        selectedPaidProduct: 'Identifier2',
        termsOfUse: 'https://www.google.com/',
        privacyPolicy: 'https://www.google.com/',
        title: '[App Name]',
        footNote: 'Auto Renewable, Cancel Anytime',
        backgroundColor: '#000000',
        actionButtonColor1: '#587BF6',
        actionButtonColor2: '#2C58F3',
        titleColor: '#ffffff',
        headingColor: '#ffffff',
        buttonTitleColor: '#ffffff',
        termsOfUseColor: '#D3D3D3',
        footNoteColor: '#D3D3D3',
        restoreButtonColor: '#D3D3D3',
        privacyPolicyColor: '#D3D3D3',
      },
    ];
    const jsonString = JSON.stringify(onboardingData);

    ScateSDK.ShowOnboarding(jsonString);
  };

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
          // set state
          setResult(r);
          setSuccess(isSuccessful);
        }
      );

      ScateSDK.AddListener(
        ScateEvents.ONBOARDING_SCREENS_FINISHED,
        (identifier: string) => {
          console.log('Onboarding Screens Finished:', identifier);

          ScateSDK.ShowPaidProductLoadingScreen();

          setTimeout(() => {
            ScateSDK.ClosePaidProductLoadingScreen();
          }, 5000);
        }
      );

      ScateSDK.AddListener(
        ScateEvents.PAYWALL_SCREEN_FINISHED,
        (identifier: string) => {
          console.log('Paywall Screen Finished:', identifier);

          ScateSDK.ShowPaidProductLoadingScreen();

          setTimeout(() => {
            ScateSDK.ClosePaidProductLoadingScreen();
          }, 5000);
        }
      );

      ScateSDK.AddListener(
        ScateEvents.PAID_PRODUCT_CLICKED,
        (identifier: string) => {
          console.log('Paid Product Clicked:', identifier);

          ScateSDK.ShowPaidProductLoadingScreen();

          setTimeout(() => {
            ScateSDK.ClosePaidProductLoadingScreen();
          }, 5000);
        }
      );

      ScateSDK.AddListener(
        ScateEvents.PAYWALL_SCREEN_CLOSED,
        (isSuccessful: boolean) => {
          console.log('Paywall Screen Closed:', isSuccessful);
          ScateSDK.ClosePaywall();
        }
      );

      ScateSDK.AddListener(
        ScateEvents.ONBOARDING_SCREEN_CLOSED,
        (isSuccessful: boolean) => {
          console.log('Onboarding Screen Closed:', isSuccessful);
          ScateSDK.CloseOnboarding();
        }
      );

      ScateSDK.AddListener(
        ScateEvents.RESTORE_PURCHASE_CLICKED,
        (isSuccessful: boolean) => {
          console.log('Restore Purchase Clicked:', isSuccessful);
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
      <View style={styles.actions}>
        <Button title="Show Paywall" onPress={showPaywall} />
        <Button title="Show Onboarding" onPress={showOnboarding} />
      </View>
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
