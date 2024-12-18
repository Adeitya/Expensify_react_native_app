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
import {useNavigation, useRoute} from '@react-navigation/native';
import LoadingComponent from '../components/LoadingComponent';
import {addDoc} from 'firebase/firestore';
import {expensesRef} from '../config/firebase';

const categoryData = [
  {
    id: 1,
    category: 'Food',
  },
  {
    id: 2,
    category: 'Shopping',
  },
  {
    id: 3,
    category: 'Entertainment',
  },
  {
    id: 4,
    category: 'Commute',
  },
  {
    id: 5,
    category: 'Other',
  },
];

export default function AddExpenseScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {id, place, country} = route.params;
  const [expenseReason, setExpenseReason] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOnPress = async () => {
    if (expenseReason && expenseAmount && expenseCategory) {
      try {
        setLoading(true);
        let doc = await addDoc(expensesRef, {
          tripId: id,
          place,
          country,
          expenseReason,
          expenseAmount,
          expenseCategory,
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
        text: 'Please fill all the fields',
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
        <Text style={styles.headerTxt}>Add Expense</Text>
      </View>
      <View style={styles.imgView}>
        <Image
          source={require('../assets/images/expenseBanner.png')}
          style={styles.img}
        />
      </View>
      <View style={styles.txtInputview}>
        <Text style={styles.txtInputTxt}>For What?</Text>
        <TextInput
          style={styles.txtInput}
          value={expenseReason}
          onChangeText={text => setExpenseReason(text)}
        />
        <Text style={styles.txtInputTxt}>How Much?</Text>
        <TextInput
          style={styles.txtInput}
          value={expenseAmount}
          onChangeText={text => setExpenseAmount(text)}
        />
        <Text style={styles.txtInputTxt}>Category</Text>
        <View style={styles.categoryView}>
          {categoryData.map(item => {
            return (
              <TouchableOpacity
                onPress={() => setExpenseCategory(item.category)}
                style={[
                  styles.categoryBtn,
                  // eslint-disable-next-line react-native/no-inline-styles
                  expenseCategory === item.category && {
                    backgroundColor: 'black',
                  },
                ]}>
                <Text
                  style={[
                    // eslint-disable-next-line react-native/no-inline-styles
                    {color: 'black'},
                    // eslint-disable-next-line react-native/no-inline-styles
                    expenseCategory === item.category && {color: 'white'},
                  ]}>
                  {item.category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View style={styles.btnView}>
        {loading ? (
          <LoadingComponent />
        ) : (
          <TouchableOpacity style={styles.btnContainer} onPress={handleOnPress}>
            <Text style={styles.btnTxt}>Add Expense</Text>
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
  categoryView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryBtn: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 15,
    marginTop: 10,
  },
});
