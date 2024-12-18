import {View, ActivityIndicator} from 'react-native';
import React from 'react';

export default function LoadingComponent() {
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
      }}>
      <ActivityIndicator size="large" color={'black'} />
    </View>
  );
}
