import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { ScateEvents, ScateSDK } from 'scatesdk-react';

export default function App() {
  const [result, setResult] = React.useState<string | undefined>();
  const [success, setSuccess] = React.useState<boolean>(false);

  const ShowPaywall = () => {
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

  const ShowOnboarding = () => {
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
        async (success: boolean) => {
          console.log('Success:', success);
          console.log(
            'Remote',
            await ScateSDK.GetRemoteConfig('test', 'default')
          );
          let r = await ScateSDK.GetRemoteConfig('test', 'default');
          // set state
          setResult(r);
          setSuccess(success);
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
        (success: boolean) => {
          console.log('Paywall Screen Closed:', success);
          ScateSDK.ClosePaywall();
        }
      );

      ScateSDK.AddListener(
        ScateEvents.ONBOARDING_SCREEN_CLOSED,
        (success: boolean) => {
          console.log('Onboarding Screen Closed:', success);
          ScateSDK.CloseOnboarding();
        }
      );

      ScateSDK.AddListener(
        ScateEvents.RESTORE_PURCHASE_CLICKED,
        (success: boolean) => {
          console.log('Restore Purchase Clicked:', success);
        }
      );

      ScateSDK.Init('uw2YK');
      ScateSDK.SetAdid('test-adid');

      // Example ScateSDK event functions.
      // If you need to send events, you can use these functions.
      ScateSDK.Event('test-event');
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


      // Example usage of ScateSDK remote config.
      // Use these function if you have set up remote config in your Scate dashboard.
      let r = await ScateSDK.GetRemoteConfig('test', 'default');
      setResult(r);

      //ScateSDK.RemoveListener(ScateEvents.REMOTE_CONFIG_READY);
      //ScateSDK.ClearListeners(ScateEvents.REMOTE_CONFIG_READY);

      //ShowOnboarding();
      ShowPaywall();

      //ScateSDK.ShowEventList();
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <Text>Success: {success?.toString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
