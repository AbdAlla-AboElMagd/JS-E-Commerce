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
};
pass.onkeyup = function () {
  validatePass();
};
