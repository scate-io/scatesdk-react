import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { ScateEvents, ScateSDK } from 'scatesdk-react';

export default function App() {
  const [result] = React.useState<number | undefined>();

  React.useEffect(() => {
    const fetchData = async () => {
      ScateSDK.Init('uw2YK');
      ScateSDK.SetAdid('test-adid');
      ScateSDK.Event('test-event');

      console.log('Local', await ScateSDK.GetRemoteConfig('test', 'default'));

      ScateSDK.AddListener(
        ScateEvents.REMOTE_CONFIG_READY,
        async (event: any) => {
          console.log(event);
          console.log(
            'Remote',
            await ScateSDK.GetRemoteConfig('test', 'default')
          );
        }
      );

      //ScateSDK.RemoveListener(ScateEvents.REMOTE_CONFIG_READY, '1');
      //ScateSDK.ClearListeners(ScateEvents.REMOTE_CONFIG_READY);
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
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
