import {
  promiseStoreObjectFirestore,
  promiseGetAllTableData,
  promiseGetSingleDataWithID,
  promiseGetDataWithKeyValue,
  promiseSearchWithKeyAndValue,
  promiseUpdateData,
  promiseDeleteDataFromTable,
} from "./promiseDealingWithFirestore.js";

/*************************************************************/
const productsFound = document.getElementById("productsFound");
const textSearch = document.getElementById("textSearch");
/********************************************************** */
/********************************************************** */
function deleteAllChilds(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
/***************************************************** */
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
  } else {
    deleteAllChilds(productsFound);
  }
};
/********************************************************* */
