import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDnQ5Da_jJIelClhF3TKG7Lt1vpomD3BZo",
  authDomain: "bd-1-897f1.firebaseapp.com",
  projectId: "bd-1-897f1",
  storageBucket: "bd-1-897f1.appspot.com",
  messagingSenderId: "602409130615",
  appId: "1:602409130615:web:4f5282d3b38fb28b3d0472",
  measurementId: "G-X4ZD6ZDQE8"
};
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  export {db, auth};
