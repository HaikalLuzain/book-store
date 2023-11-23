import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAq5KcZdeasWzl5n1XnqkPQ1WXO-fGGmi4',
  authDomain: 'mern-stack-35578.firebaseapp.com',
  databaseURL: 'https://mern-stack-35578.firebaseio.com',
  projectId: 'mern-stack-35578',
  storageBucket: 'mern-stack-35578.appspot.com',
  messagingSenderId: '401199565989',
  appId: '1:401199565989:web:f046351e3da5457856d14c',
  measurementId: 'G-CNFZEHZ1LE',
}

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, firebase as default }
