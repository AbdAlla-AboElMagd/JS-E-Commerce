let userName = document.querySelector("#userName");
userName.onkeydown = function (event) {
  if (Number(event.key) || event.key == "0") {
    event.preventDefault();
  }
};
userName.onchange = function () {
  let checkPattern = /^[a-zA-Z]{3,}( [a-zA-Z]{3,})*$/;
  userNameValue = userName.value;
  if (checkPattern.test(userNameValue)) {
    console.log("Success");
  } else {
    console.log("failed");
  }
};

let email = document.querySelector("#email");
email.onchange = function () {
  let checkPattern = /^[a-zA-Z0-9\.\_]+@[a-zA-Z0-9]+\.(com|net|org|mil|edu)$/;
  emailValue = email.value;
  if (checkPattern.test(emailValue)) {
    console.log("Success");
  } else {
    console.log("failed");
  }
};

let pass = document.querySelector("#pass");
pass.onchange = function () {
  passValue = pass.value;
  if (passValue.length >= 6) {
    console.log("Success");
  } else {
    console.log("failed");
  }
};

let confPass = document.querySelector("#confPass");

confPass.onkeyup = function () {
  let pass = document.querySelector("#pass");
  let passValue = pass.value;
  let confPassValue = confPass.value;
  if (passValue == confPassValue) {
    console.log("Success");
  } else {
    console.log("failed");
  }
};

confPass.onchange = function () {
  let pass = document.querySelector("#pass");
  let passValue = pass.value;
  let confPassValue = confPass.value;
  if (passValue == confPassValue) {
    console.log("Success");
  } else {
    console.log("failed");
  }
};



function registerFormValidation() {
  const registerForm = document.forms["register"];
  let nameCheckPattern = /^[a-zA-Z]{3,}( [a-zA-Z]{3,})*$/;
  let emailCheckPattern =
    /^[a-zA-Z0-9\.\_]+@[a-zA-Z0-9]+\.(com|net|org|mil|edu)$/;
  let userName = document.querySelector("#userName");
  let email = document.querySelector("#email");
  let pass = document.querySelector("#pass");
  let confPass = document.querySelector("#confPass");
  if (
    nameCheckPattern.test(userName.value) ||
    emailCheckPattern.test(email.value) ||
    pass.value.length < 6 ||
    pass.value != confPass.value
  ) {
    console.log("Can't Submit");
    return false;
  } else {
    console.log("Submit");
    return true;
  }
}
