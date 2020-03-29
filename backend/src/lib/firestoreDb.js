import firebase from 'firebase/app'
import 'firebase/firestore'

const { env } = process;

var firebaseConfig = {
  apiKey: env.API_KEY,
  authDomain: env.AUTH_DOMAIN,
  databaseURL: env.DATABASE_URL,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderId: env.MESSAGING_SENDER_ID,
  appId: env.APP_ID,
  measurementId: env.MEASUREMENT_ID
}

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig).firestore() : firebase.app().firestore()