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
export async function storeObjectFirestore(tableName, objectData) {
  try {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, tableName), objectData);
    console.log("Object Saved with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error saving object to Firestore: ", error);
  }
}

/*********************************************/
/*************** Getting All Table Data *********************/
export async function getAllTableData(tableName) {
  // Assosiative Array that saves data
  let data = [];
  try {
    const querySnapshot = await getDocs(collection(db, tableName));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      data[doc.id] = doc.data();
    });
  } catch (error) {
    console.error("Error getting all table data: ", error);
  }
  return data;
}

/***************************************************/
/*************** Getting Single Table Data *********************/
export async function getSingleDataWithID(tableName, id) {
  if (tableName && id) {
    const docRef = doc(db, tableName, id);
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.data());
      return docSnap.data();
    } else {
      console.log("Error In Getting Data");
    }
  } else {
    console.error("Error In Passing Variables like id or tableName");
  }
}

/*************** Getting Multiple Table Data *********************/
export async function getDataWithKeyValue(tableName, Objectkey, ObjectValue) {
  // Assosiative Array that saves data
  let data = [];
  try {
    const q = query(
      collection(db, tableName),
      where(Objectkey, "==", ObjectValue)
    );

    const querySnapshot = await getDocs(q);
    //console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      data[doc.id] = doc.data();
    });
  } catch (error) {
    console.error("Error getting data: ", error);
  }
  return data;
}

/*********** Searching Data with some Key and contains some of Value***************/
export async function searchWithKeyAndValue(tableName, Objectkey, ObjectValue) {
  // Assoiative Array with id as key and value is object
  let data = [];
  // Getting All Data From DataBase
  let rowData;
  try {
    rowData = await getAllTableData(tableName);
    console.log(rowData);
  } catch (error) {
    console.error("Error in Getting Data");
  }

  for (let id in rowData) {
    // console.log(id);
    // console.log(rowData[id]);
    let keyValue = rowData[id][Objectkey];
    if (keyValue.toLowerCase().includes(ObjectValue.toLowerCase())) {
      data[id] = rowData[id];
    }
  }
  return data;
}

/******************** Updating Data Saved in Database **************************/
export async function updateData(tableName, id, data) {
  try {
    const docRef = doc(db, tableName, id);
    await setDoc(docRef, data, { merge: true });
  } catch (error) {
    console.error("Error in Editing Data");
  }
}
/********************** Deleting Database Element ******************** */
export async function deleteDataFromTable(tableName, id) {
  try {
    await deleteDoc(doc(db, tableName, id));
  } catch (error) {
    console.error("Error In Deleting", error);
  }
}
