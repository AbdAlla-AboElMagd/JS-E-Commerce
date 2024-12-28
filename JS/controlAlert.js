/************* Handling Alert *****************/
const alertCloseBtn = document.getElementById("alertCloseBtn");
if (alertCloseBtn) {
  alertCloseBtn.onclick = function () {
    document.getElementById("alertResponse").style.display = "none"; // hide the alert
  };
}

export function showingAlert(state, strongMsg, msg) {
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
