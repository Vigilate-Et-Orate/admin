import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyA_fPwqQxGhMhWkhHJ5DW2TtoEKSRE8-18",
  authDomain: "vigilate-et-orate.firebaseapp.com",
  databaseURL: "https://vigilate-et-orate.firebaseio.com",
  projectId: "vigilate-et-orate",
  storageBucket: "vigilate-et-orate.appspot.com",
  messagingSenderId: "378663841206",
  appId: "1:378663841206:web:2fd7460cab32b434b46517",
  measurementId: "G-6R5LJ3G00D"
}
firebase.initializeApp(config)

export default firebase