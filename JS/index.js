import {
  promiseStoreObjectFirestore,
  promiseGetAllTableData,
  promiseGetSingleDataWithID,
  promiseGetDataWithKeyValue,
  promiseSearchWithKeyAndValue,
  promiseUpdateData,
  promiseDeleteDataFromTable,
} from "./promiseDealingWithFirestore.js";

function getAllProducts() {
  return promiseGetAllTableData("products");
}

function getAllCategories() {
  return promiseGetAllTableData("categories");
}

function searchForProduct(subname) {
  return promiseSearchWithKeyAndValue("products", "name", subname);
}

function getProductById(id) {
  return promiseGetSingleDataWithID("products", id);
}

function showAllProducts() {
  getAllProducts()
    .then((data) => {
      console.log(data);
      for (let id in data) {
        let dataValue = data[id];
        console.log(
          `${id} : ${dataValue.name} - ${dataValue.price}$ - ${dataValue.quantity} in stock - ${dataValue.description} - ${dataValue.imageUrl}`
        );
      }
    })
    .catch((e) => {
      console.error(e);
    });
}

const btnShowProducts = document.getElementById("btnShowProducts");
btnShowProducts.onclick = function (e) {
  e.preventDefault();
  showAllProducts();
};

showAllProducts();

/*************************************************************/
const productsFound = document.getElementById("productsFound");
const textSearch = document.getElementById("textSearch");

/********************************************************** */
function deleteAllChilds(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
/*************************  Handling Search ******************* */
textSearch.onkeyup = function () {
  let searchValue = textSearch.value.trim();
  console.log(`Search Value: ${searchValue}`);
  if (searchValue.length > 0) {
    promiseSearchWithKeyAndValue("products", "name", searchValue)
      .then((data) => {
        deleteAllChilds(productsFound);
        for (let id in data) {
          let dataValue = data[id];
          let option = document.createElement("option");
          option.value = dataValue.name;
          option.text = id;
          option.setAttribute("id", id);
          productsFound.appendChild(option);
        }
        console.log("Finish Searching");
      })
      .catch((e) => {
        console.error("Error While Searching For The Product", e);
      });
  }
};
/********************************************************* */
