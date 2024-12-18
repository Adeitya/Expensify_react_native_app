import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function ExpenseCardComponent({reason, amount, category}) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.reasonTxt}>{reason}</Text>
        <Text style={styles.categoryTxt}>{category}</Text>
      </View>
      <Text style={styles.amountTxt}>{'$' + amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    padding: 15,
    flexDirection: 'row',
    marginBottom: 8,
    borderRadius: 20,
    justifyContent: 'space-between',
  },
  reasonTxt: {color: 'white', marginBottom: 4},
  categoryTxt: {color: 'white'},
  amountTxt: {color: 'white', alignSelf: 'center'},
});
