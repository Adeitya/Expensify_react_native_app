// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {collection, getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAudI6EqW60b-095P0y4gCw3yzPzhCLRzQ',
  authDomain: 'expensify-c12b1.firebaseapp.com',
  projectId: 'expensify-c12b1',
  storageBucket: 'expensify-c12b1.firebasestorage.app',
  messagingSenderId: '253204618236',
  appId: '1:253204618236:web:775ce6545a1d688e54f079',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const tripsRef = collection(db, 'trips');
export const expensesRef = collection(db, 'expenses');

export default app;
