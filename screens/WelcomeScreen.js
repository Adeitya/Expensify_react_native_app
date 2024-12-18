import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imgView}>
        <Image source={require('../assets/images/welcome.gif')} />
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.titleTxt}>Expensify</Text>
        <TouchableOpacity
          style={styles.btnContainer1}
          onPress={() => navigation.navigate('SignInScreen')}>
          <Text style={styles.btnTxt}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnContainer2}
          onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.btnTxt}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgView: {
    alignItems: 'center',
  },
  innerContainer: {marginHorizontal: 16},
  titleTxt: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    shadowColor: 'green',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 9,
  },
  btnContainer1: {
    backgroundColor: 'black',
    padding: 20,
    marginTop: 60,
    marginBottom: 30,
    borderRadius: 40,
    shadowColor: 'green',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 400,
    shadowRadius: 5,
    elevation: 9,
  },
  btnContainer2: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 40,
    shadowColor: 'green',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 400,
    shadowRadius: 5,
    elevation: 9,
  },
  btnTxt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
