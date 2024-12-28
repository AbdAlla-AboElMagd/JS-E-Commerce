/************* Name Validation *****************/
const userName = document.getElementById("userName");
userName.onkeydown = function (event) {
  if (Number(event.key) || event.key == "0") {
    event.preventDefault();
  }
};

function validateName() {
  const userName = document.getElementById("userName");
  let checkPattern = /^[a-zA-Z]{3,}( [a-zA-Z]{3,})*$/;
  let userNameValue = userName.value;
  let userNameParent = userName.parentNode;
  if (checkPattern.test(userNameValue)) {
    console.log("Accepted Name");
    userName.classList.remove("is-invalid");
    userName.classList.add("is-valid");
    userNameParent.classList.remove("is-invalid");
    userNameParent.classList.add("is-valid");
  } else {
    console.log("Unaccepted Name");
    userName.classList.remove("is-valid");
    userName.classList.add("is-invalid");
    userNameParent.classList.remove("is-valid");
    userNameParent.classList.add("is-invalid");
  }
}

userName.onchange = function () {
  validateName();
};

userName.onkeyup = function () {
  validateName();
};

/************* Email Validation *****************/

const email = document.querySelector("#email");

function emailValidation() {
  const email = document.querySelector("#email");
  let checkPattern = /^[a-zA-Z0-9\.\_]+@[a-zA-Z0-9]+\.(com|net|org|mil|edu)$/;
  let emailValue = email.value;
  let emailParent = email.parentNode;
  if (checkPattern.test(emailValue)) {
    console.log("Accepted Email");
    email.classList.remove("is-invalid");
    email.classList.add("is-valid");
    emailParent.classList.remove("is-invalid");
    emailParent.classList.add("is-valid");
  } else {
    console.log("Unaccepted Email");
    email.classList.remove("is-valid");
    email.classList.add("is-invalid");
    emailParent.classList.remove("is-valid");
    emailParent.classList.add("is-invalid");
  }
}

email.onchange = function () {
  emailValidation();
};

email.onkeyup = function () {
  emailValidation();
};

/*************** Passwod Validation ******************/
const pass = document.querySelector("#pass");

function validatePass() {
  const pass = document.querySelector("#pass");
  let passValue = pass.value;
  let passParent = pass.parentNode;
  if (passValue.length >= 6) {
    console.log("Accepted Password");
    pass.classList.remove("is-invalid");
    pass.classList.add("is-valid");
    passParent.classList.remove("is-invalid");
    passParent.classList.add("is-valid");
  } else {
    console.log("Unaccepted Password");
    pass.classList.remove("is-valid");
    pass.classList.add("is-invalid");
    passParent.classList.remove("is-valid");
    passParent.classList.add("is-invalid");
  }
}

pass.onchange = function () {
  validatePass();
  validateConfPass();
};
pass.onkeyup = function () {
  validatePass();
  validateConfPass();
};

/******** Confirm Password Validation *********/
let confPass = document.querySelector("#confPass");

function validateConfPass() {
  const confPass = document.querySelector("#confPass");
  const pass = document.querySelector("#pass");
  let passValue = pass.value;
  let confPassValue = confPass.value;
  let confPassParent = confPass.parentNode;
  if (passValue == confPassValue) {
    console.log("Accepted Password");
    confPass.classList.remove("is-invalid");
    confPass.classList.add("is-valid");
    confPassParent.classList.remove("is-invalid");
    confPassParent.classList.add("is-valid");
  } else {
    console.log("Unaccepted Password");
    confPass.classList.remove("is-valid");
    confPass.classList.add("is-invalid");
    confPassParent.classList.remove("is-valid");
    confPassParent.classList.add("is-invalid");
  }
}

confPass.onkeyup = function () {
  validateConfPass();
};

confPass.onchange = function () {
  validateConfPass();
};
