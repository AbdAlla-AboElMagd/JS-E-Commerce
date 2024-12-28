import {
  storeObjectFirestore,
  getAllTableData,
  getSingleDataWithID,
  getDataWithKeyValue,
  searchWithKeyAndValue,
  updateData,
  deleteDataFromTable,
} from "../dealingWithFirestore.js";

import {
  promiseStoreObjectFirestore,
  promiseGetAllTableData,
  promiseGetSingleDataWithID,
  promiseGetDataWithKeyValue,
  promiseSearchWithKeyAndValue,
  promiseUpdateData,
  promiseDeleteDataFromTable,
} from "../promiseDealingWithFirestore.js";

import { Product, ProductPlainObject } from "../eEommerceObjects.js";

import { showingAlert } from "../controlAlert.js";

/*********************** Getting Form Elements ******************************* */
const productControl = document.forms["productControl"];
// console.log(categoryControl);
const productName = document.getElementById("productName");
const imgFile = document.getElementById("imgFile");

const btnSearch = document.getElementById("btnSearch");
const productsFound = document.getElementById("productsFound");

const yesCategoryParent = document.getElementById("yesCategoryParent");
const noCategoryParent = document.getElementById("noCategoryParent");

const categoryParent = document.getElementById("categoryParent");

const description = document.getElementById("description");

const price = document.getElementById("price");

const quantity = document.getElementById("quantity");

const rate = document.getElementById("rate");

const btnUpdate = document.getElementById("btnUpdate");
const btnDelete = document.getElementById("btnDelete");
const btnConfirmDelete = document.getElementById("btnConfirmDelete");
const staticBackdrop = document.getElementById("staticBackdrop");
/******************************************************************* */

/********************************** Handling Rate *******************************************/
let clicked = 0;
let images = document.getElementById("rate").getElementsByTagName("img");
console.log(images);
for (let i = 0; i < images.length; i++) {
  images[i].onmouseover = () => {
    for (let j = 0; j <= i; j++) {
      images[j].src = "../../Resources/Images/Filled_star.png";
    }
  };
}
for (let i = 0; i < images.length; i++) {
  images[i].onmouseout = () => {
    for (let j = 0; j <= i; j++) {
      images[j].src = "../../Resources/Images/empty_star.png";
    }
  };
}

for (let i = 0; i < images.length; i++) {
  images[i].onclick = () => {
    clicked = i + 1;
    for (let y = 0; y < images.length; y++) {
      if (y <= i) {
        images[y].src = "../../Resources/Images/Filled_star.png";
      } else {
        images[y].src = "../../Resources/Images/empty_star.png";
      }
      images[y].onmouseout = (e) => {
        e.preventDefault();
      };
      images[y].onmouseover = (e) => {
        e.preventDefault();
      };
    }
  };
}

function calculatingTotalRate(objectFeedback) {
  if (objectFeedback) {
    let totalRate = 0;
    let count = 0;
    for (let i in objectFeedback) {
      totalRate += parseFloat(objectFeedback[i]);
      count++;
    }
    return parseInt(totalRate / count);
  } else {
    console.error("Error in Getting Rate From Object Feedback");
    console.log(objectFeedback);
    return 0;
  }
}

function showRate(totalRate) {
  for (let i = 0; i < 5; i++) {
    if (i < totalRate) {
      images[i].src = "../../Resources/Images/Filled_star.png";
    } else {
      images[i].src = "../../Resources/Images/empty_star.png";
    }
  }
}

/**************************************************************************/

function deleteAllSelectChilds(select) {
  while (select.firstChild) {
    select.removeChild(select.firstChild);
  }
}

function deleteAllOptionsExcept1(select, optionValue) {
  for (let i = 0; i < select.options.length; i++) {
    if (select.options[i].value == optionValue) {
      continue;
    } else {
      select.remove(i);
    }
  }
}

function validateProductName() {
  const productName = document.getElementById("productName");
  let checkPattern = /^[a-zA-Z0-9]{1,}( [a-zA-Z0-9]{1,})*$/;
  let productNameValue = productName.value;
  let productNameParent = productName.parentNode;
  if (checkPattern.test(productNameValue)) {
    console.log("Accepted Name");
    productName.classList.remove("is-invalid");
    productName.classList.add("is-valid");
    productNameParent.classList.remove("is-invalid");
    productNameParent.classList.add("is-valid");
    return true;
  } else {
    console.log("Unaccepted Name");
    productName.classList.remove("is-valid");
    productName.classList.add("is-invalid");
    productNameParent.classList.remove("is-valid");
    productNameParent.classList.add("is-invalid");
    return false;
  }
}

function validatePrice() {
  const price = document.getElementById("price");
  let checkPattern = /^[0-9]{1,}(\.[0-9]{1,})*$/;
  let priceTextValue = price.value;
  let priceParent = price.parentNode;
  if (checkPattern.test(priceTextValue)) {
    console.log("Accepted Price");
    price.classList.remove("is-invalid");
    price.classList.add("is-valid");
    priceParent.classList.remove("is-invalid");
    priceParent.classList.add("is-valid");
    return true;
  } else {
    console.log("Unaccepted Price");
    price.classList.remove("is-valid");
    price.classList.add("is-invalid");
    priceParent.classList.remove("is-valid");
    priceParent.classList.add("is-invalid");
    return false;
  }
}

function validateQuantity() {
  const quantity = document.getElementById("quantity");
  let checkPattern = /^([0-9]{1,})*$/;
  let quantityTextValue = quantity.value;
  let quantityParent = quantity.parentNode;
  if (checkPattern.test(quantityTextValue)) {
    console.log("Accepted Quantity");
    quantity.classList.remove("is-invalid");
    quantity.classList.add("is-valid");
    quantityParent.classList.remove("is-invalid");
    quantityParent.classList.add("is-valid");
    return true;
  } else {
    console.log("Unaccepted Quantity");
    quantity.classList.remove("is-valid");
    quantity.classList.add("is-invalid");
    quantityParent.classList.remove("is-valid");
    quantityParent.classList.add("is-invalid");
    return false;
  }
}

function getProductFromForm() {
  if (validateProductName() && validatePrice() && validateQuantity()) {
    showingAlert(4, "Success: ", "Valid Formats");
    let imgUrl;
    if (imgFile.value) {
      imgUrl = imgFile.value;
      console.log(imgUrl);
    } else {
      imgUrl = "";
      console.log(imgUrl);
    }
    let categoryParentId = null;
    if (traceChanginghasParent()) {
      if (categoryParent.value) {
        categoryParentId = categoryParent.value;
      } else {
        categoryParentId = null;
      }
    }

    let productDescription = "";
    if (description.value) {
      productDescription = description.value;
    } else {
      productDescription = "";
    }

    let user_id = "0";
    let objectFeedback = {};
    if (localStorage.getItem("loggedInUserId")) {
      user_id = localStorage.getItem("loggedInUserId");
    } else {
      user_id = "0";
    }

    objectFeedback[user_id] = clicked;

    const product = ProductPlainObject(
      productName.value,
      parseFloat(price.value),
      productDescription,
      imgUrl,
      categoryParentId,
      parseInt(quantity.value),
      objectFeedback
    );
    return product;
  } else {
    showingAlert(1, "Error: ", "Invalid Formats");
    return null;
  }
}

productName.onkeyup = () => {
  if (validateProductName()) {
    btnSearch.disabled = false;
  } else {
    btnSearch.disabled = true;
  }
};
productName.onchange = () => {
  validateProductName();
};

price.onkeyup = () => {
  validatePrice();
};
price.onchange = () => {
  validatePrice();
};

quantity.onkeyup = () => {
  validateQuantity();
};
quantity.onchange = () => {
  validateQuantity();
};

/*******************************************************************/

productControl.onsubmit = (e) => {
  e.preventDefault();
  const product = getProductFromForm();
  if (product) {
    saveProduct(product);
  } else {
  }
};

function saveProduct(product) {
  promiseStoreObjectFirestore("products", product)
    .then((id) => {
      console.log("Saved Product ID: ", id);
      showingAlert(4, "Product Saved", "Product Saved Successfully");
      return id;
    })
    .catch((e) => {
      console.error("Error While Saving The Product", e);
    });
}

/*********************************************************/
/********* Searching Function *********/
btnSearch.onclick = () => {
  let ProductNameValue = productName.value;
  if (validateProductName()) {
    deleteAllOptionsExcept1(productsFound, "0");
    promiseSearchWithKeyAndValue("products", "name", ProductNameValue)
      .then((data) => {
        productsFound.disabled = false;
        for (let id in data) {
          let dataValue = data[id];
          let option = document.createElement("option");
          option.value = id;
          option.text = dataValue.name;
          productsFound.appendChild(option);
        }

        showingAlert(
          4,
          "Got The Matching Products",
          "Searching Done Successfully"
        );
      })
      .catch((e) => {
        showingAlert(1, "Error: ", "Error While Searching For The Product");
        console.error("Error While Searching For The Product", e);
      });
  }
};

/****************************************/
/******************* Getting All Saved Catogires ***********************/

function traceChanginghasParent() {
  if (yesCategoryParent.checked) {
    categoryParent.disabled = false;
    return true;
  } else {
    categoryParent.disabled = true;
    return false;
  }
}

function customizeCategoryParent() {
  if (traceChanginghasParent()) {
    promiseGetAllTableData("categories")
      .then((data) => {
        categoryParent.disabled = false;
        for (let id in data) {
          let dataValue = data[id];
          let option = document.createElement("option");
          option.value = id;
          option.text = dataValue.name;
          categoryParent.appendChild(option);
        }

        showingAlert(4, "Got All The Categories", "Done Successfully");
      })
      .catch((e) => {
        showingAlert(1, "Error: ", "Error While Getting All The Categories");
        console.error("Error While Getting Categories", e);
      });
  } else {
    deleteAllSelectChilds(categoryParent);
    categoryParent.disabled = true;
  }
}

yesCategoryParent.onchange = () => {
  customizeCategoryParent();
};

noCategoryParent.onchange = () => {
  customizeCategoryParent();
};

/***********************  Updating Form Data with Selected Value ***************************/
function choosingCategoryParent(categoryParentId) {
  if (categoryParentId) {
    yesCategoryParent.checked = true;
    let notfound = true;
    promiseGetAllTableData("categories")
      .then((data) => {
        categoryParent.disabled = false;
        for (let id in data) {
          let dataValue = data[id];
          let option = document.createElement("option");
          option.value = id;
          option.text = dataValue.name;
          categoryParent.appendChild(option);
          if (id == categoryParentId) {
            notfound = false;
          }
        }
        if (!notfound) {
          categoryParent.value = categoryParentId;
          showingAlert(4, "Success: ", "Got The Category Parent Details");
        } else {
          showingAlert(
            1,
            "Error: ",
            "Not Found The Category Parent Choose New One"
          );
        }
      })
      .catch((e) => {
        showingAlert(1, "Error: ", "Error While Searching For The Categories");
        console.error("Error While Searching The Category", e);
      });
  }
}

productsFound.onchange = () => {
  console.log("ID: ", productsFound.value);
  if (productsFound.value && productsFound.value != "0") {
    btnUpdate.disabled = false;
    btnDelete.disabled = false;
    let productId = productsFound.value;
    promiseGetSingleDataWithID("products", productId)
      .then((data) => {
        productName.value = data.name;
        price.value = data.price;
        console.log("Siiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
        console.log(data.quantity);
        quantity.value = data.quantity;
        console.log(quantity.value);

        if (data.description) {
          description.value = data.description;
        } else {
          description.value = "";
        }
        if (data.imageUrl) {
          imgFile.value = data.imageUrl;
        } else {
          imgFile.value = "";
        }
        if (data.category) {
          choosingCategoryParent(data.category);
          // categoryParent.value = data.categoryParent;
        } else {
          noCategoryParent.checked = true;
          customizeCategoryParent();
        }
        let objectFeedback = {};
        let totalRate = 0;
        if (data.objectFeedback) {
          objectFeedback = data.objectFeedback;
          totalRate = calculatingTotalRate(objectFeedback);
          console.log(`Total Rate: ${totalRate}`);
          showRate(totalRate);
        }
      })
      .catch((e) => {
        console.error("Error While Getting The Product", e);
      });
  } else {
    btnUpdate.disabled = true;
    btnDelete.disabled = true;
  }
};

/************************* Handling Updating **********************************/
function updateProduct(productId, product) {
  promiseUpdateData("products", productId, product)
    .then(() => {
      console.log("Updated Product ID: ", productId);
      showingAlert(4, "Product Updated", "Product Updated Successfully");
    })
    .catch((e) => {
      console.error("Error While Updating The Product", e);
      showingAlert(1, "Error: ", "Failed to Update Product");
    });
}

btnUpdate.onclick = () => {
  const product = getProductFromForm();
  const productId = productsFound.value;
  if (product && productId) {
    updateProduct(productId, product);
  } else {
    showingAlert(1, "Error: ", "Please Select Product First");
  }
};
/*******************************************************************************/
/************************ Handling Deleting *******************************/
function deleteProduct(productId) {
  promiseDeleteDataFromTable("products", productId)
    .then(() => {
      console.log("Deleted Product ID: ", productId);
      showingAlert(4, "Product Deleted", "Product Deleted Successfully");
    })
    .catch((e) => {
      console.error("Error While Deleting The Product", e);
      showingAlert(1, "Error: ", "Failed to Delete Product");
    });
}
// btnDelete.onclick = () => {

// };

const deletePopUp = new bootstrap.Modal(staticBackdrop);

btnConfirmDelete.addEventListener("click", () => {
  let productId = productsFound.value;
  if (productId) {
    productId = productsFound.value;
    if (productId && productId !== "0") {
      deleteProduct(productId);
    } else {
      showingAlert(1, "Error: ", "Please Select Product First");
    }
  }
  deletePopUp.hide();
});
/*******************************************************************************/
