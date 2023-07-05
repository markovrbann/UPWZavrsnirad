import { createApp } from 'vue'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBOAK3hCrWbxD7uER3ljV7Kc2q7yjRjG_M',
  authDomain: 'upw-projekt-5031c.firebaseapp.com',
  projectId: 'upw-projekt-5031c',
  storageBucket: 'upw-projekt-5031c.appspot.com',
  messagingSenderId: '149730177538',
  appId: '1:149730177538:web:cc9dc2e938293eb10eed1b',
  measurementId: 'G-B96ZR58HLX'
}
firebase.initializeApp(firebaseConfig)

export default firebase

const app = createApp({})
app.config.globalProperties.$auth = firebase.auth()
app.config.globalProperties.$db = firebase.firestore()
app.config.globalProperties.$storage = firebase.storage()
