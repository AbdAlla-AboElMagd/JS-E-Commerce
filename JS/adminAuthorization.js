export function checkIsAdmin() {
  console.log(localStorage.getItem("user"));
  let user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  if (user && user != null && user != "null" && user != "") {
    if (user.isAdmin == "1") {
      console.log("Is an Admin");
    } else {
      console.log("Not an Admin");

      window.location.href = "./unAuthorizedPage.html";
    }
  } else {
    window.location.href = "./unAuthorizedPage.html";
  }
}

window.onload = () => {
  checkIsAdmin();
};
