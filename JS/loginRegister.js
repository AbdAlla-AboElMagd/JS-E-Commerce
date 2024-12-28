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

/**************** Register */

const registerForm = document.forms["register"];
if (registerForm) {
  registerForm.onsubmit = function (event) {
    event.preventDefault();
    let name = registerForm.elements["name"].value;
    let email = registerForm.elements["email"].value;
    let password = registerForm.elements["pass"].value;
    let gender = registerForm.elements["gender"].value;
    let isAdmin = registerForm.elements["isAdmin"].value;
    let user = new User(name, email, password, gender, isAdmin);
    saveToDatabasae(user);
  };
}

function saveToDatabasae(user) {
  const auth = getAuth();
  
  createUserWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
      const userCr = userCredential.user;
      const userData = {
        name: user.name,
        email: user.email,
        password: user.password,
        gender: user.gender,
        isAdmin: user.isAdmin,
      };
      const msgDiv = document.getElementById("rResponse");
      msgDiv.style.display = "block";
      msgDiv.style.color = "Green";
      msgDiv.innerHTML = "Success";
      const docRef = doc(db, "users", userCr.uid);
      setDoc(docRef, userData)
        .then(() => {
          window.location.href = "../Index.html";
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
      const msgDiv = document.getElementById("rResponse");
      msgDiv.style.display = "block";
      msgDiv.style.color = "Red";
      if (error.Code == "auth/email-already-in-use") {
        msgDiv.innerHTML = "Email Already Exists!";
      } else {
        msgDiv.innerHTML = "Enable to Create User!";
      }
    });
}

/********************** Login */
const loginForm = document.forms["loginForm"];
if (loginForm) {
  loginForm.onsubmit = function (event) {
    event.preventDefault();
    let email = loginForm.elements["email"].value;
    let password = loginForm.elements["pass"].value;
    loginFromDatabase(email, password);
  };
}

async function loginFromDatabase(email, password) {
  const auth = getAuth();
  const lResponse = document.getElementById("lResponse");
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      lResponse.style.display = "block";
      lResponse.style.color = "Green";
      lResponse.innerHTML = "Success";
      let user = userCredential.user;
      localStorage.setItem("loggedInUserId", user.uid);
      console.log(user.uid);
      console.log(user);
      if (window.location.pathname != "/Index.html") {
        console.log("Not In Home Page");
        //go To Home Page
        window.location.href = "../Index.html";
      } else {
        //If Already in Home Page;
      }
    })
    .catch((error) => {
      console.error(error);
      lResponse.style.display = "block";
      lResponse.style.color = "Red";
      if (error.code == "auth/invalid-credential") {
        lResponse.innerHTML = "Invalid Email or Password!";
      } else {
        lResponse.innerHTML = "Account Doesn't Exist";
      }
    });
}

/**************** Sign Out */
function userSignOut() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Delete the Cashed User in local storage
      localStorage.removeItem("user");
      localStorage.removeItem("loggedInUserId");
      console.log("Signed Out Successfully");
    })
    .catch((error) => {
      console.log("Failed to Signed Out");
    });
}

//**************** Fetch User Data */

function fetchUserData(loggedInUserId) {
  if (loggedInUserId) {
    const docRef = doc(db, "users", loggedInUserId);
    console.log(docRef);
    let docSnap = getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.data());
      let userData = docSnap.data();
      window.localStorage.setItem("user", JSON.stringify(userData));
      const loginSignout = document.getElementById("loginSignout");
      if (loginSignout) {
        let userName = document.getElementById("userName");
        userName.innerText = userData.name;
        let loginSignoutBtn = document.getElementById("loginSignoutBtn");
        loginSignoutBtn.innerText = "SignOut";
        loginSignoutBtn.onclick = (e) => {
          e.preventDefault();
          userSignOut();
          userName.innerText = "";
          loginSignoutBtn.innerText = "Login";
          loginSignout.onclick = () => {
            window.location.href = "./HTML/login.html";
          };
        };
      }
    } else {
      console.log("Error In Getting User Data");
    }
  } else {
    console.error("No User Id Stored in the Local Storage!");
  }
}
