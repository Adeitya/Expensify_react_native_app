import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Snackbar from 'react-native-snackbar';
import {useNavigation} from '@react-navigation/native';
import {auth} from '../config/firebase';
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import LoadingComponent from '../components/LoadingComponent';
import {setUserLoading} from '../redux/slices/user';

export default function SignInScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {userLoading} = useSelector(state => state.user);

  const handleSignIn = async () => {
    if (email && password) {
      // navigation.goBack();
      // navigation.navigate('Home');
      try {
        dispatch(setUserLoading(true));
        await signInWithEmailAndPassword(auth, email, password);
        dispatch(setUserLoading(false));
      } catch (error) {
        dispatch(setUserLoading(false));
        Snackbar.show({
          text: error.message,
          backgroundColor: 'red',
        });
      }
    } else {
      Snackbar.show({
        text: 'Email and Password are required',
        backgroundColor: 'red',
      });
    }
  };

  const handleForgotPassword = async () => {
    if (email) {
      // navigation.goBack();
      // navigation.navigate('Home');
      try {
        dispatch(setUserLoading(true));
        await sendPasswordResetEmail(auth, email, password);
        dispatch(setUserLoading(false));
        Snackbar.show({
          text: 'Password reset email sent! Check your inbox and follow the instructions.',
          backgroundColor: 'green',
        });
      } catch (error) {
        dispatch(setUserLoading(false));
        Snackbar.show({
          text: error.message,
          backgroundColor: 'red',
        });
      }
    } else {
      Snackbar.show({
        text: 'Please enter your email address.',
        backgroundColor: 'red',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.backIcnView}>
          <TouchableOpacity
            style={styles.backBtnContainer}
            onPress={() => navigation.goBack()}>
            <Text style={{}}>back</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTxt}>Sign In</Text>
      </View>
      <View style={styles.imgView}>
        <Image
          source={require('../assets/images/login.png')}
          style={styles.img}
        />
      </View>
      <View style={styles.txtInputview}>
        <Text style={styles.txtInputTxt}>Email</Text>
        <TextInput
          style={styles.txtInput}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Text style={styles.txtInputTxt}>Password</Text>
        <TextInput
          style={styles.txtInput}
          value={password}
          secureTextEntry
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotTxt}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnView}>
        {userLoading ? (
          <LoadingComponent />
        ) : (
          <TouchableOpacity style={styles.btnContainer} onPress={handleSignIn}>
            <Text style={styles.btnTxt}>Sign In</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: 16,
  },
  backIcnView: {
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  backBtnContainer: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 4,
    backgroundColor: 'white',
  },
  headerTxt: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  imgView: {
    alignItems: 'center',
    margin: 16,
  },
  img: {width: 300, height: 300},
  txtInputview: {marginHorizontal: 16},
  txtInputTxt: {fontSize: 18, fontWeight: 'bold'},
  txtInput: {
    backgroundColor: 'white',
    marginVertical: 16,
    padding: 16,
    borderRadius: 40,
  },
  btnView: {flex: 1, justifyContent: 'flex-end'},
  btnContainer: {
    width: '90%',
    backgroundColor: 'black',
    padding: 16,
    margin: 16,
    borderRadius: 24,
    alignSelf: 'center',
  },
  btnTxt: {textAlign: 'center', color: 'white', fontWeight: 'bold'},
  forgotTxt: {},
});
