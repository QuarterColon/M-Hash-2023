import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyDwfe4c1yp38PwFBqJDZ_K8ohcOrQxipHA",
  authDomain: "m-hash-a902d.firebaseapp.com",
  projectId: "m-hash-a902d",
  storageBucket: "m-hash-a902d.appspot.com",
  messagingSenderId: "708719628241",
  appId: "1:708719628241:web:40414da71caba564d21af0",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app)

const googleProvider = new GoogleAuthProvider();



const signInWithGoogle = async () => {
  
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
 
  try {

    const user = await signInWithEmailAndPassword(auth, email, password).then(console.log("Signed In"));
    console.log(user.uid)

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password,) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db,"users", user.uid), {
      uid: user.uid,
      name,
      email,
      level: 0,
      coins : 0,
      streak : 0, 
      username : name,
      todo : [
        {
          id : 1,
          todo : "Complete your first task",
          completed: false
        }
      ]
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = async() => {
  await signOut(auth);
  console.log("signed out")
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
