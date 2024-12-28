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
  getDoc,
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

/************* Handling Alert *****************/
const alertCloseBtn = document.getElementById("alertCloseBtn");
if (alertCloseBtn) {
  alertCloseBtn.onclick = function () {
    document.getElementById("alertResponse").style.display = "none"; // hide the alert
  };
}

function showingAlert(state, strongMsg, msg) {
  /*************
   * states: 0 for hidden
   *         1 for Error
   *         2 for warning
   *         3 for Info
   *         4 for Success
   */
  const alert = document.querySelector("#alertResponse");
  const strongAlertMsg = document.querySelector("#strongAlertMsg");
  const normalAlertMsg = document.querySelector("#normalAlertMsg");
  if (alert) {
    /*********** Remove PreviousState classes */
    alert.classList.remove("alert-danger");
    alert.classList.remove("alert-warning");
    alert.classList.remove("alert-primary");
    alert.classList.remove("alert-success");
    /*********** Add CurrentState classes */
    if (state) {
      if (state == 1) {
        alert.classList.add("alert-danger");
      } else if (state == 2) {
        alert.classList.add("alert-warning");
      } else if (state == 3) {
        alert.classList.add("alert-primary");
      } else if (state == 4) {
        alert.classList.add("alert-success");
      } else {
        //Nothing to add
      }
    }
    /*********** Update Alert Messages */
    if (strongMsg) {
      strongAlertMsg.textContent = strongMsg;
    }
    if (msg) {
      normalAlertMsg.textContent = msg;
    }
    /*********** Show Alert */
    if (state == 0) {
      alert.style.display = "none";
    } else {
      alert.style.display = "block";
    }
  }
}

/************* Register *************/

/**************** Register validation */
function registerFormValidation() {
  const registerForm = document.forms["register"];
  let nameCheckPattern = /^[a-zA-Z]{3,}( [a-zA-Z]{3,})*$/;
  let emailCheckPattern =
    /^[a-zA-Z0-9\.\_]+@[a-zA-Z0-9]+\.(com|net|org|mil|edu)$/;
  let userName = document.querySelector("#userName");
  let email = document.querySelector("#email");
  let pass = document.querySelector("#pass");
  let confPass = document.querySelector("#confPass");
  let gender = registerForm.elements["gender"];
  let isAdmin = registerForm.elements["isAdmin"];
  if (
    !nameCheckPattern.test(userName.value) ||
    !emailCheckPattern.test(email.value) ||
    pass.value.length < 6 ||
    pass.value != confPass.value ||
    !gender.value ||
    !(isAdmin.value === "0" || isAdmin.value === "1")
  ) {
    console.log("Can't Submit");
    return false;
  } else {
    console.log("Submit");
    return true;
  }
}

/**************** Register handling */
const registerForm = document.forms["register"];
if (registerForm) {
  registerForm.onsubmit = function (event) {
    event.preventDefault();
    if (registerFormValidation()) {
      let name = registerForm.elements["name"].value;
      let email = registerForm.elements["email"].value;
      let password = registerForm.elements["pass"].value;
      let gender = registerForm.elements["gender"].value;
      let isAdmin = registerForm.elements["isAdmin"].value;
      let user = new User(name, email, password, gender, isAdmin);
      saveToDatabasae(user);
    } else {
      console.log("Please Enter Fields in correct Formats");
      showingAlert(1, "Error: ", "Invalid Formats");
    }
  };
}

async function saveToDatabasae(user) {
  const auth = getAuth();
  try {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    if (userCredential) {
      const userCr = userCredential.user;
      const userData = {
        name: user.name,
        email: user.email,
        password: user.password,
        gender: user.gender,
        isAdmin: user.isAdmin,
      };

      /********* Show success Alert ************/
      showingAlert(4, "Success: ", "Saved Authentecation to Database");
      /************ End Handling Alert ****************/
      // const msgDiv = document.getElementById("rResponse");
      // msgDiv.style.display = "block";
      // msgDiv.style.color = "Green";
      // msgDiv.innerHTML = "Success";
      const docRef = doc(db, "users", userCr.uid);

      try {
        // Save user in Database
        await setDoc(docRef, userData);
        localStorage.setItem("loggedInUserId", userCr.uid);
        /********* Show success Alert ************/
        showingAlert(4, "Success: ", "Saved User Data to Database");
        // Fetching user again from Database
        await fetchUserData(userCr.uid);
        window.location.href = "../Index.html";
      } catch (error) {
        console.log("Error in Saving the user Data in Database");
        /********* Show Error Alert ************/
        showingAlert(1, "Error: ", "Error in Saved User Data to Database");
        console.error(error);
      }
    } else {
      console.log("Can't Get User Credential");
      /********* Show Error Alert ************/
      showingAlert(1, "Error: ", "Error in Getting User Credential");
    }
  } catch (error) {
    // console.error(error);
    /************************************** */
    // const msgDiv = document.getElementById("rResponse");
    // msgDiv.style.display = "block";
    // msgDiv.style.color = "Red";
    if (error.code == "auth/email-already-in-use") {
      // msgDiv.innerHTML = "Email Already Exists!";
      /********* Show Error Alert ************/
      showingAlert(1, "Error: ", "Email Already Exists!");
    } else {
      console.error(error);
      // msgDiv.innerHTML = "Enable to Create User!";
      /********* Show Error Alert ************/
      showingAlert(1, "Error: ", "Enable to Create User!");
    }
  }
}

/********************** Login */
/****************** Login Validation ***********************/
function loginFormValidation() {
  const registerForm = document.forms["loginForm"];
  const email = registerForm.elements["email"];
  const password = registerForm.elements["pass"];
  let checkPattern = /^[a-zA-Z0-9\.\_]+@[a-zA-Z0-9]+\.(com|net|org|mil|edu)$/;
  if (checkPattern.test(email.value) && password.value.length >= 6) {
    console.log("valid Data");
    return true;
  } else {
    console.log("Invalid Data");
    return false;
  }
} // End of loginFormValidation

const loginForm = document.forms["loginForm"];
let loginAttemptCount = 0;
if (loginForm) {
  loginForm.onsubmit = function (event) {
    event.preventDefault();
    let email = loginForm.elements["email"].value;
    let password = loginForm.elements["pass"].value;
    let submitBtn = loginForm.elements["submitBtn"];
    if (loginFormValidation()) {
      if (loginAttemptCount < 3) {
        loginAttemptCount++;
        loginFromDatabase(email, password);
      } else {
        showingAlert(
          1,
          "Error: ",
          "So Many Attempt ,Try Again After 10 Seconds!"
        );
        submitBtn.disabled = true;
        setTimeout(() => {
          submitBtn.disabled = false;
          loginAttemptCount = 0;
        }, 10000);
      }
    } else {
      console.log("Please Enter Fields in correct Formats");
      showingAlert(1, "Error: ", "Invalid Formats");
    }
  };
}

async function loginFromDatabase(email, password) {
  const auth = getAuth();
  // const lResponse = document.getElementById("lResponse");
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // lResponse.style.display = "block";
    if (userCredential) {
      /********* Show success Alert ************/
      showingAlert(4, "Success: ", "Logged in Succefully !");
      // lResponse.style.color = "Green";
      // lResponse.innerHTML = "Success";
      let user = userCredential.user;
      localStorage.setItem("loggedInUserId", user.uid);
      await fetchUserData(user.uid);
      /********* Show success Alert ************/
      showingAlert(4, "Success: ", "Got All User Data !");
      console.log(user.uid);
      console.log(user);
      if (window.location.pathname != "/Index.html") {
        console.log("Not In Home Page");
        //go To Home Page
        window.location.href = "../Index.html";
      } else {
        //If Already in Home Page;
      }
    }
  } catch (error) {
    console.error(error);
    // lResponse.style.display = "block";
    // lResponse.style.color = "Red";
    if (error.code == "auth/invalid-credential") {
      // lResponse.innerHTML = "Invalid Email or Password!";
      /********* Show Error Alert ************/
      showingAlert(1, "Error: ", "Invalid Email or Password!");
    } else {
      // lResponse.innerHTML = "Account Doesn't Exist";
      /********* Show Error Alert ************/
      showingAlert(1, "Error: ", "Account Doesn't Exist");
    }
  }
}

/**************** Sign Out */
async function userSignOut() {
  const auth = getAuth();
  try {
    await signOut(auth);
    // Delete the Cashed User in local storage
    localStorage.removeItem("user");
    localStorage.removeItem("loggedInUserId");
    console.log("Signed Out Successfully");
    /********* Show success Alert ************/
    showingAlert(4, "Success: ", "Signed Out Successfully !");
  } catch (error) {
    console.log("Failed to Signed Out");
    /********* Show Error Alert ************/
    showingAlert(1, "Error: ", "Can't Sign Out!");
  }
}

//**************** Fetch User Data */

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
