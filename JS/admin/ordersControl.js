import {
  promiseStoreObjectFirestore,
  promiseGetAllTableData,
  promiseGetSingleDataWithID,
  promiseGetDataWithKeyValue,
  promiseSearchWithKeyAndValue,
  promiseUpdateData,
  promiseDeleteDataFromTable,
} from "../promiseDealingWithFirestore.js";

import {
  FullProduct,
  FullProductPlainObject,
  Product,
  getStatus,
} from "../eEommerceObjects.js";
/********************************************/
const ordersTable = document.getElementById("ordersTable");
/********************************************/
function getPreviousOrderedFromFirestore() {
  const userId = localStorage.getItem("loggedInUserId");
  promiseGetAllTableData("cart")
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

          //console.log(product);
          orderID.textContent = product;
          productName.textContent = product.name;
          price.textContent = `$ ${product.price}`;
          quantity.textContent = product.quantity;
          status.textContent = getStatus(product.status);

          // Create reject button
          let rejectButton = document.createElement("button");
          rejectButton.textContent = "Reject";
          rejectButton.setAttribute("class", "btn btn-danger");

          if (product.status == 0 || product.status == 1) {
            rejectButton.disabled = false;
          } else {
            rejectButton.disabled = true;
          }

          // Add event listener to reject button
          rejectButton.addEventListener("click", () => {
            promiseUpdateData("cart", cartID, { status: 2 }).then(() => {
              window.location.reload();
            });
          });

          // Create Approve button
          let aproveButton = document.createElement("button");
          aproveButton.textContent = "Approve";
          aproveButton.setAttribute("class", "btn btn-success");

          if (
            product.status == 0 ||
            product.status == 1 ||
            product.status == 2
          ) {
            aproveButton.disabled = false;
          } else {
            aproveButton.disabled = true;
          }

          // Add event listener to reject button
          aproveButton.addEventListener("click", () => {
            promiseUpdateData("cart", cartID, { status: 1 }).then(() => {
              window.location.reload();
            });
          });

          action.setAttribute("class", "d-flex justify-content-evenly");
          action.appendChild(aproveButton);
          action.appendChild(rejectButton);

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
getPreviousOrderedFromFirestore();
