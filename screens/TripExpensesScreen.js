import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Snackbar from 'react-native-snackbar';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import randomImage from '../assets/images/randonImage';
import ExpenseCardComponent from '../components/ExpenseCardComponent';
import {deleteDoc, doc, getDocs, query, where} from 'firebase/firestore';
import {expensesRef} from '../config/firebase';
import EmptyListComponent from '../components/EmptyListComponent';
import {SwipeListView} from 'react-native-swipe-list-view';
import LoadingComponent from '../components/LoadingComponent';

export default function TripExpenseScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const {place, country, id} = route.params;
  const [expenseDetailsData, setExpenseDetailsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchExpenseDetails = async () => {
    try {
      setLoading(true);
      const q = query(expensesRef, where('tripId', '==', id));
      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach(doc => {
        data.push({...doc.data(), id: doc.id});
      });
      setExpenseDetailsData(data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async expenseId => {
    try {
      const expenseDocRef = doc(expensesRef, expenseId);
      await deleteDoc(expenseDocRef);
      Snackbar.show({
        text: 'Expense successfully deleted!',
        backgroundColor: 'green',
      });
      fetchExpenseDetails();
    } catch (error) {
      Snackbar.show({
        text: error.message || 'Failed to delete expense.',
        backgroundColor: 'red',
      });
    }
  };

  const renderItem = item => (
    <ExpenseCardComponent
      reason={item.item.expenseReason}
      amount={item.item.expenseAmount}
      category={item.item.expenseCategory}
    />
  );

  const renderHiddenItem = item => (
    <View style={styles.swipeBtnView}>
      <TouchableOpacity
        style={styles.swipeBtnInnerView}
        onPress={() => {
          handleDelete(item.item.id);
        }}>
        <Text style={styles.swipeBtnTxt}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    if (isFocused) {
      fetchExpenseDetails();
    }
  }, [isFocused]);

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
        <View style={styles.headerTxtView}>
          <Text style={styles.headerTxt}>{place}</Text>
          <Text style={styles.subHeaderTxt}>{country}</Text>
        </View>
      </View>
      <View style={styles.imgView}>
        <Image source={randomImage()} style={styles.img} />
      </View>
      <View style={styles.headerView}>
        <Text style={styles.expensesTxt}>Expenses</Text>
        <TouchableOpacity
          style={styles.AddExpenseContainer}
          onPress={() =>
            navigation.navigate('AddExpenseScreen', {id, place, country})
          }>
          <Text>Add Expense</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.flatListView}>
        {loading ? (
          <LoadingComponent containerStyle={{flex: 1}} />
        ) : expenseDetailsData.length ? (
          <SwipeListView
            data={expenseDetailsData}
            keyExtractor={item => item.id}
            renderItem={item => renderItem(item)}
            renderHiddenItem={item => renderHiddenItem(item)}
            leftOpenValue={0}
            rightOpenValue={-75}
            disableRightSwipe
          />
        ) : (
          <EmptyListComponent msg="No expenses added" />
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
  headerTxtView: {
    flex: 1,
    alignContent: 'center',
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
  },
  subHeaderTxt: {
    fontSize: 18,
    textAlign: 'center',
  },
  imgView: {
    alignItems: 'center',
    margin: 16,
  },
  img: {width: 300, height: 300},
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  AddExpenseContainer: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    backgroundColor: 'white',
  },
  expensesTxt: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  flatListView: {flex: 1, marginHorizontal: 16},
  swipeBtnView: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 15,
    marginBottom: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  swipeBtnInnerView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    //width: 75,
    backgroundColor: 'white',
    borderRadius: 10,
    //borderWidth: 1,
    padding: 5,
  },
  swipeBtnTxt: {color: 'black', fontWeight: 'bold'},
});
