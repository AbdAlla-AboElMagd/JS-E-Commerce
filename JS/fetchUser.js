import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import {
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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

const auth = getAuth();
const db = getFirestore(app);

async function fetchUserData(loggedInUserId) {
  if (loggedInUserId) {
    const docRef = doc(db, "users", loggedInUserId);
    console.log(docRef);
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.data());
      let userData = docSnap.data();
      window.localStorage.setItem("user", JSON.stringify(userData));
      const loginSignout = document.getElementById("loginSignout");
      updateLoginSignoutBtn(true, userData);
    } else {
      console.log("Error In Getting User Data");
    }
  } else {
    console.error("No User Id Stored in the Local Storage!");
  }
}

onAuthStateChanged(auth, function () {
  let loggedInUserId = localStorage.getItem("loggedInUserId");
  console.log("Logged User ID: " + loggedInUserId);
  fetchUserData(loggedInUserId);
});

/**************** Sign Out */
async function userSignOut() {
  const auth = getAuth();
  try {
    // Delete the Cashed User in local storage
    window.localStorage.removeItem("user");
    localStorage.removeItem("loggedInUserId");
    await signOut(auth);
    console.log("Signed Out Successfully");
  } catch (error) {
    console.log("Failed to Signed Out");
  }
}

console.log(localStorage.getItem("user"));

window.onload = function () {
  let loggedInUserId = localStorage.getItem("loggedInUserId");
  console.log("Logged User ID: " + loggedInUserId);
  fetchUserData(loggedInUserId);
};

/************** Updating Login SignOut button */

function updateLoginSignoutBtn(isLogedIn, userData) {
  const loginSignout = document.getElementById("loginSignout");
  if (loginSignout) {
    let userName = document.getElementById("userName");
    let loginSignoutBtn = document.getElementById("loginSignoutBtn");
    if (isLogedIn) {
      userName.innerText = userData.name;
      loginSignoutBtn.innerText = "SignOut";
      loginSignoutBtn.onclick = (e) => {
        e.preventDefault();
        userSignOut();
        updateLoginSignoutBtn(false);
      };
    } else {
      userName.innerText = "";
      loginSignoutBtn.innerText = "Login";
      loginSignoutBtn.onclick = () => {
        window.location.href = "./HTML/login.html";
      };
    }
  }
}
