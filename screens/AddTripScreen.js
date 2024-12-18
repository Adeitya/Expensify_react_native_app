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
import LoadingComponent from '../components/LoadingComponent';
import {addDoc} from 'firebase/firestore';
import {tripsRef} from '../config/firebase';
import {useSelector} from 'react-redux';

export default function AddTripScreen() {
  const navigation = useNavigation();
  const {user} = useSelector(state => state.user);
  const [place, setPlace] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOnPress = async () => {
    if (place && country) {
      try {
        setLoading(true);
        let doc = await addDoc(tripsRef, {
          place,
          country,
          userId: user.uid,
        });
        setLoading(false);
        if (doc && doc.id) {
          navigation.goBack();
        }
      } catch (error) {
        setLoading(false);
        Snackbar.show({
          text: error.message,
          backgroundColor: 'red',
        });
      }
    } else {
      Snackbar.show({
        text: 'Place and Country are required',
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
        <Text style={styles.headerTxt}>Add Trip</Text>
      </View>
      <View style={styles.imgView}>
        <Image source={require('../assets/images/4.png')} style={styles.img} />
      </View>
      <View style={styles.txtInputview}>
        <Text style={styles.txtInputTxt}>Where On Earth?</Text>
        <TextInput
          style={styles.txtInput}
          value={place}
          onChangeText={text => setPlace(text)}
        />
        <Text style={styles.txtInputTxt}>Which Country?</Text>
        <TextInput
          style={styles.txtInput}
          value={country}
          onChangeText={text => setCountry(text)}
        />
      </View>
      <View style={styles.btnView}>
        {loading ? (
          <LoadingComponent />
        ) : (
          <TouchableOpacity style={styles.btnContainer} onPress={handleOnPress}>
            <Text style={styles.btnTxt}>Add Trip</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    margin: 32,
  },
  img: {width: 300, height: 300},
  txtInputview: {marginHorizontal: 16},
  txtInputTxt: {fontSize: 18, fontWeight: 'bold'},
  txtInput: {
    backgroundColor: 'white',
    marginVertical: 16,
    padding: 16,
    borderRadius: 10,
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
});
