// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Add Firebase products that you want to use
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import {
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Adding addDoc which is used in auto Generated ID
import {
  collection,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  deleteField,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNc-uY48MVXnstTKCCd1Ov_z0SWTua6HE",
  authDomain: "e-commerce-2c328.firebaseapp.com",
  projectId: "e-commerce-2c328",
  storageBucket: "e-commerce-2c328.firebasestorage.app",
  messagingSenderId: "918959995650",
  appId: "1:918959995650:web:0a3ce4c9720627dd05601b",
  measurementId: "G-5RW192KM24",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

function User(name, email, password, gender, isAdmin) {
  this.name = name;
  this.email = email;
  this.password = password;
  this.gender = gender;
  this.isAdmin = isAdmin;
}

/*********************************************/

/************* Storing Object in Firestore ****************/
export function promiseStoreObjectFirestore(tableName, objectData) {
  return new Promise((resolve, reject) => {
    // Add a new document with a generated id.
    addDoc(collection(db, tableName), objectData)
      .then((docRef) => {
        console.log("Object Saved with ID: ", docRef.id);
        resolve(docRef.id);
      })
      .catch((error) => {
        console.error("Error saving object to Firestore: ", error);
        reject(error);
      });
  });
}

/*********************************************/
/*************** Getting All Table Data *********************/
export function promiseGetAllTableData(tableName) {
  return new Promise((resolve, reject) => {
    // Associative array that saves data
    let data = [];

    getDocs(collection(db, tableName))
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          data[doc.id] = doc.data();
        });
        resolve(data);
      })
      .catch((error) => {
        console.error("Error getting all table data: ", error);
        reject(error);
      });
  });
}

/***************************************************/
/*************** Getting Single Table Data *********************/
export function promiseGetSingleDataWithID(tableName, id) {
  return new Promise((resolve, reject) => {
    if (tableName && id) {
      const docRef = doc(db, tableName, id);

      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            console.log(docSnap.data());
            resolve(docSnap.data());
          } else {
            console.log("Error In Getting Data");
            reject(new Error("Error In Getting Data"));
          }
        })
        .catch((error) => {
          console.error("Error getting document:", error);
          reject(error);
        });
    } else {
      console.error("Error In Passing Variables like id or tableName");
      reject(new Error("Error In Passing Variables like id or tableName"));
    }
  });
}

/*************** Getting Multiple Table Data *********************/
export function promiseGetDataWithKeyValue(tableName, Objectkey, ObjectValue) {
  return new Promise((resolve, reject) => {
    // Associative array that saves data
    let data = [];

    const q = query(
      collection(db, tableName),
      where(Objectkey, "==", ObjectValue)
    );

    getDocs(q)
      .then((querySnapshot) => {
        //console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data());
          data[doc.id] = doc.data();
        });
        // console.log(`Finshing Loading Data: ${data}`);
        // console.log(data);
        resolve(data);
      })
      .catch((error) => {
        console.error("Error getting data: ", error);
        reject(error);
      });
  });
}

/*********** Searching Data with some Key and contains some of Value***************/
export function promiseSearchWithKeyAndValue(
  tableName,
  Objectkey,
  ObjectValue
) {
  return new Promise((resolve, reject) => {
    // Getting All Data From DataBase
    promiseGetAllTableData(tableName)
      .then((rowData) => {
        console.log(rowData);
        let data = [];

        for (let id in rowData) {
          let keyValue = rowData[id][Objectkey];
          if (keyValue.toLowerCase().includes(ObjectValue.toLowerCase())) {
            data[id] = rowData[id];
          }
        }

        resolve(data);
      })
      .catch((error) => {
        console.error("Error in Getting Data:", error);
        reject(error);
      });
  });
}

/******************** Updating Data Saved in Database **************************/
export function promiseUpdateData(tableName, id, data) {
  return new Promise((resolve, reject) => {
    const docRef = doc(db, tableName, id);

    setDoc(docRef, data, { merge: true })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.error("Error in Editing Data:", error);
        reject(error);
      });
  });
}

/********************** Deleting Database Element ******************** */
export function promiseDeleteDataFromTable(tableName, id) {
  return new Promise((resolve, reject) => {
    deleteDoc(doc(db, tableName, id))
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.error("Error In Deleting:", error);
        reject(error);
      });
  });
}
