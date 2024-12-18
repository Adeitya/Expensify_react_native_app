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
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import randomImage from '../assets/images/randonImage';
import ExpenseCardComponent from '../components/ExpenseCardComponent';
import {getDocs, query, where} from 'firebase/firestore';
import {expensesRef} from '../config/firebase';
import EmptyListComponent from '../components/EmptyListComponent';

const dummyData = [
  {
    id: 1,
    reason: 'burger',
    amount: '100',
    category: 'Food',
  },
  {
    id: 2,
    reason: 'jeans',
    amount: '1000',
    category: 'Shopping',
  },
  {
    id: 3,
    reason: 'movie',
    amount: '200',
    category: 'Entertainment',
  },
  {
    id: 4,
    reason: 'pizza',
    amount: '100',
    category: 'Food',
  },
];

export default function TripExpenseScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const {place, country, id} = route.params;
  const [expenseDetailsData, setExpenseDetailsData] = useState([]);

  const fetchExpenseDetails = async () => {
    const q = query(expensesRef, where('tripId', '==', id));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach(doc => {
      data.push({...doc.data(), id: doc.id});
    });
    setExpenseDetailsData(data);
  };

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
        {expenseDetailsData.length ? (
          <FlatList
            data={expenseDetailsData}
            showsVerticalScrollIndicator={false}
            renderItem={item => (
              <ExpenseCardComponent
                reason={item.item.expenseReason}
                amount={item.item.expenseAmount}
                category={item.item.expenseCategory}
              />
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          <EmptyListComponent msg={'No expenses added'} />
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
});
