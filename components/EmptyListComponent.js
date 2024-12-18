/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image} from 'react-native';
import React from 'react';

export default function EmptyListComponent({msg}) {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'white',
        // borderRadius: 8,
      }}>
      <Image
        source={require('../assets/images/empty.png')}
        style={{height: 250, width: 250}}
      />
      <Text style={{fontWeight: 'bold', fontSize: 16}}>{msg}</Text>
    </View>
  );
}
