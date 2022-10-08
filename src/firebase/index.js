import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDoI1UssDqPJZwA-O00dkFwQ5LTT_2e9YI',
  authDomain: 'listaporhacervue.firebaseapp.com',
  projectId: 'listaporhacervue',
  storageBucket: 'listaporhacervue.appspot.com',
  messagingSenderId: '1097001304225',
  appId: '1:1097001304225:web:039a73c8c7b555a67af0e0'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{
    db
}