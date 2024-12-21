import {View, ActivityIndicator, StyleSheet} from 'react-native';
import React from 'react';

export default function LoadingComponent({containerStyle}) {
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={[styles.container, containerStyle]}>
      <ActivityIndicator size="large" color={'black'} />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
});
