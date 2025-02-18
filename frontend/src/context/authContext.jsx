// /* eslint-disable no-unused-vars */

// /* eslint-disable react-refresh/only-export-components */
// /* eslint-disable react/prop-types */
// import { createContext, useContext, useEffect, useState } from "react";
// import { initializeApp } from "firebase/app";
// import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
// import { getDatabase, set, ref } from "firebase/database"

// const firebaseConfig = {
//   apiKey: "AIzaSyCXIYvvPMbfE9E_VNSyM4fXk6rPsPuJfFE",
//   authDomain: "college-placement-app-a75c6.firebaseapp.com",
//   databaseURL: "https://college-placement-app-a75c6-default-rtdb.firebaseio.com",
//   projectId: "college-placement-app-a75c6",
//   storageBucket: "college-placement-app-a75c6.firebasestorage.app",
//   messagingSenderId: "833144129430",
//   appId: "1:833144129430:web:a3f5e43cae05c185027fb7",
//   databaseURl:
//     "https://console.firebase.google.com/u/0/project/college-placement-app-a75c6/database/college-placement-app-a75c6-default-rtdb/data/~2F",
// };

// const firebaseApp = initializeApp(firebaseConfig);
// const firebaseAuth = getAuth(firebaseApp);
// const database = getDatabase(firebaseApp);
// const FirebaseContext = createContext(null);

// export const useFirebase = () => useContext(FirebaseContext);

// export const FirebaseProvider = (props) => {

//   const [user, setUser] = useState(null);
//   useEffect(() => {
//     onAuthStateChanged(firebaseAuth, user => {
//       if (user) setUser(user);
//       else setUser(null)
//     })
//   }, [])

//   const signupUserWithEmailAndPassword = async (email, password) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
//       return userCredential;
//     } catch (error) {
//       console.error("Signup Error:", error.message);
//       throw error;
//     }
//   };

//   const putData = async (key, data) => {
//     try {
//       await set(ref(database, key), data);
//       console.log("Data written successfully!");
//     } catch (error) {
//       console.error("Database Write Error:", error.message);
//       throw error;
//     }
//   };
//   const isLoggedIn = user ? true : false;
//   return (
//     <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword, putData, isLoggedIn }}>
//       {props.children}
//     </FirebaseContext.Provider>
//   );
// };


/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCXIYvvPMbfE9E_VNSyM4fXk6rPsPuJfFE",
  authDomain: "college-placement-app-a75c6.firebaseapp.com",
  databaseURL: "https://college-placement-app-a75c6-default-rtdb.firebaseio.com",
  projectId: "college-placement-app-a75c6",
  storageBucket: "college-placement-app-a75c6.appspot.com",
  messagingSenderId: "833144129430",
  appId: "1:833144129430:web:a3f5e43cae05c185027fb7",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

// Create Context
const FirebaseContext = createContext(null);

// Custom Hook for Context
export const useFirebase = () => useContext(FirebaseContext);

// Context Provider Component
export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
    });
    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // Signup Function
  const signupUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      return userCredential;
    } catch (error) {
      console.error("Signup Error:", error.message);
      throw error;
    }
  };

  // Login Function
  const loginUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      return userCredential;
    } catch (error) {
      console.error("Login Error:", error.message);
      throw error;
    }
  };

  // Logout Function
  const logout = async () => {
    try {
      await signOut(firebaseAuth);
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  // Function to store data in Firebase Realtime Database
  const putData = async (key, data) => {
    try {
      await set(ref(database, key), data);
      console.log("Data written successfully!");
    } catch (error) {
      console.error("Database Write Error:", error.message);
      throw error;
    }
  };

  return (
    <FirebaseContext.Provider value={{
      signupUserWithEmailAndPassword,
      loginUserWithEmailAndPassword,
      putData,
      isLoggedIn: !!user,
      user,
      firebaseAuth,
      logout
    }}>
      {children}
    </FirebaseContext.Provider>
  );
};
