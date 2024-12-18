import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import randomImage from '../assets/images/randonImage';
import EmptyListComponent from '../components/EmptyListComponent';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {signOut} from 'firebase/auth';
import {auth, tripsRef} from '../config/firebase';
import {getDocs, query, where} from 'firebase/firestore';
import {useSelector} from 'react-redux';

export default function HomeScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {user} = useSelector(state => state.user);
  const [tripsData, setTripsData] = useState([]);

  const fetchTrips = async () => {
    const q = query(tripsRef, where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach(doc => {
      data.push({...doc.data(), id: doc.id});
    });
    setTripsData(data);
  };

  useEffect(() => {
    if (isFocused) {
      fetchTrips();
    }
  }, [isFocused]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
      <View style={styles.headerView}>
        <Text style={styles.titleTxt}>Expensify</Text>
        <TouchableOpacity style={styles.logOutContainer} onPress={handleLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imgView}>
        <Image
          source={require('../assets/images/banner.png')}
          style={styles.img}
        />
      </View>
      <View style={{flex: 1}}>
        <View style={styles.headerView}>
          <Text style={styles.recentTxt}>Recent Trips</Text>
          <TouchableOpacity
            style={styles.logOutContainer}
            onPress={() => navigation.navigate('AddTripScreen')}>
            <Text>Add Trip</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <FlatList
            data={tripsData}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            ListEmptyComponent={<EmptyListComponent msg="Data Not Found!" />}
            numColumns={2}
            style={styles.flatlist}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('TripExpenseScreen', {
                      ...item,
                    })
                  }
                  style={[
                    styles.listItm,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                      marginRight:
                        (index + 1) % 2 === 0 || index + 1 === tripsData.length
                          ? 0
                          : 16,
                    },
                  ]}>
                  <View>
                    <Image source={randomImage()} style={styles.listItmImg} />
                    <Text style={styles.listItmTxtPlace}>{item.place}</Text>
                    <Text style={styles.listItmTxtCountry}>{item.country}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  logOutContainer: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    backgroundColor: 'white',
  },
  titleTxt: {
    fontWeight: 'bold',
    fontSize: 32,
  },
  recentTxt: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  imgView: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 16,
    borderRadius: 16,
    marginTop: 16,
  },
  img: {
    width: 300,
    height: 300,
  },
  flatlist: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  listItm: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 12,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  listItmImg: {
    width: 150,
    height: 150,
  },
  listItmTxtPlace: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    //color: 'white',
  },
  listItmTxtCountry: {
    textAlign: 'center',
    fontWeight: 'condensed',
    fontSize: 14,
    //color: 'white',
  },
});
