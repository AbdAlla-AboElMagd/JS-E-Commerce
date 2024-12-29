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
  CartPlainObject,
} from "./eEommerceObjects.js";
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
const total_price = document.getElementById("total_price");
const productsList = document.getElementById("productsList");
const btnBuy = document.getElementById("btnBuy");
/*********************************************/
btnBuy.onclick = function (e) {
  e.preventDefault();
  let products = [];
  const cart = JSON.parse(localStorage.getItem("cart"));
  const userId = localStorage.getItem("loggedInUserId");
  let saveCart = CartPlainObject(userId, cart);
  for (let cartItem of saveCart) {
    promiseStoreObjectFirestore("cart", cartItem)
      .then((id) => {
        console.log(`Order Id: ${id}`);
        console.log("Cart saved to Firestore");
        localStorage.setItem("cart", []); // Clear cart
        window.location.href = "../index.html";
      })
      .catch((e) => {
        console.error("Error in Sending Order to the Server");
        console.error(e);
      });
  }
};

/***************************************** */
let totalPrice = 0;

function deleteProductFromCart(product) {
  let allProducts = [];
  const cart = JSON.parse(localStorage.getItem("cart"));
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id != product.id) {
      console.log(cart[i]);
      allProducts.push(cart[i]);
    } else {
      totalPrice -= cart[i].price;
      console.log("Product deleted from cart");
    }
  }
  total_price.textContent = `$ ${totalPrice}`;
  localStorage.setItem("cart", JSON.stringify(allProducts));
}

function showAllCartProducts() {
  totalPrice = 0;
  let products;
  let savedCart = localStorage.getItem("cart");
  if (savedCart && savedCart != null && savedCart != "") {
    products = JSON.parse(savedCart);
  } else {
    products = null;
  }
  if (products && products.length > 0) {
    for (let product of products) {
      totalPrice += product.price;
      let div = document.createElement("div");
      let img = document.createElement("img");
      img.src = product.imageUrl;
      img.width = "200px";
      let title = document.createElement("h2");
      title.textContent = product.name;
      let price = document.createElement("p");
      price.textContent = `$ ${product.price}`;

      // Create delete button
      let deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.setAttribute("class", "btn btn-danger");
      // Add event listener to delete button
      deleteButton.addEventListener("click", () => {
        deleteProductFromCart(product);
        productsList.removeChild(div);
      });

      div.appendChild(img);
      div.appendChild(title);
      div.appendChild(price);
      div.appendChild(deleteButton);
      productsList.appendChild(div);
    }
  }
}

showAllCartProducts();
console.log("Total Price", totalPrice);
total_price.textContent = `$ ${totalPrice}`;

/***************************************** */
