import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAlbIYriugSbrbx3Ehlz3lsnoncuPQktJI",
    authDomain: "whatsapp-clone-ec618.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-ec618.firebaseio.com",
    projectId: "whatsapp-clone-ec618",
    storageBucket: "whatsapp-clone-ec618.appspot.com",
    messagingSenderId: "463632125997",
    appId: "1:463632125997:web:f887dee73cf7b87d12a8a4"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export{auth,provider};
  export default db;