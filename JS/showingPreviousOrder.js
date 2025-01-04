import {
  promiseStoreObjectFirestore,
  promiseGetAllTableData,
  promiseGetSingleDataWithID,
  promiseGetDataWithKeyValue,
  promiseSearchWithKeyAndValue,
  promiseUpdateData,
  promiseDeleteDataFromTable,
} from "./promiseDealingWithFirestore.js";

import {
  FullProduct,
  FullProductPlainObject,
  Product,
  getStatus,
} from "./eEommerceObjects.js";
/********************************************/
const ordersTable = document.getElementById("ordersTable");
/********************************************/
window.onload = function () {
  const userId = localStorage.getItem("loggedInUserId");
  if (
    !userId ||
    userId == null ||
    userId == "null" ||
    userId == "0" ||
    userId == ""
  ) {
    window.location.href = "./login.html";
  }
};
/********************************************/
function getPreviousOrderedFromFirestore() {
  const userId = localStorage.getItem("loggedInUserId");
  promiseSearchWithKeyAndValue("cart", "userID", userId)
    .then((data) => {
      for (let cartID in data) {
        let product = data[cartID];
        console.log(cartID);
        console.log(data[cartID]);
        if (product && product != "" && product != null && product != {}) {
          let row = document.createElement("tr");
          let orderID = document.createElement("td");
          let productName = document.createElement("td");
          let quantity = document.createElement("td");
          let price = document.createElement("td");
          let status = document.createElement("td");
          let action = document.createElement("td");
          console.log(product);
          orderID.textContent = product;
          productName.textContent = product.name;
          price.textContent = `$ ${product.price}`;
          quantity.textContent = product.quantity;
          status.textContent = getStatus(product.status);

          // Create delete button
          let deleteButton = document.createElement("button");
          deleteButton.textContent = "Return";
          deleteButton.setAttribute("class", "btn btn-danger");

          if (product.status == 0 || product.status == 1) {
            deleteButton.style.display = "block";
          } else {
            deleteButton.style.display = "none";
          }

          // Add event listener to delete button
          deleteButton.addEventListener("click", () => {
            promiseUpdateData("cart", cartID, { status: 3 }).then(() => {
              window.location.reload();
            });
          });

          action.appendChild(deleteButton);

          row.appendChild(orderID);
          row.appendChild(productName);
          row.appendChild(quantity);
          row.appendChild(price);
          row.appendChild(status);
          row.appendChild(action);
          ordersTable.appendChild(row);
        }
      }
    })
    .catch((e) => {
      console.error("Error In Getting Previous Orders");
      console.error(e);
    });
}

/****************************************************** */
console.log("Hi");
getPreviousOrderedFromFirestore();
