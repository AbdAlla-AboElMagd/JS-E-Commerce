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
const foundCategories = document.getElementById("foundCategories");
/********************************************************** */
function deleteAllChilds(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
/***************************************************** */

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

function showAllCategories() {
  getAllCategories()
    .then((data) => {
      for (let id in data) {
        let title, imageUrl, description;

        if (data[id].name && data[id].name != "0") {
          title = data[id].name;
        }
        if (data[id].imageUrl && data[id].imageUrl != "") {
          imageUrl = data[id].imageUrl;
        } else {
          imageUrl =
            "https://cdn.prod.website-files.com/65aeef01ceab5a488ee1a755/65bae5dca22bad4391e32bad_category-green-bg-1200x630.jpg";
        }
        if (data[id].description && data[id].description != "0") {
          description = data[id].description;
        }

        let card = createCard(title, imageUrl, description);
        foundCategories.appendChild(card);
      }
      console.log("Finish Loading");
    })
    .catch((e) => {
      console.error(e);
    });
}

// const btnShowProducts = document.getElementById("btnShowProducts");
// btnShowProducts.onclick = function (e) {
//   e.preventDefault();
//   showAllProducts();
// };

// showAllProducts();

// /*************************  Handling Search ******************* */
// textSearch.onkeyup = function () {
//   let searchValue = textSearch.value.trim();
//   console.log(`Search Value: ${searchValue}`);
//   if (searchValue.length > 0) {
//     promiseSearchWithKeyAndValue("products", "name", searchValue)
//       .then((data) => {
//         deleteAllChilds(productsFound);
//         for (let id in data) {
//           let dataValue = data[id];
//           let option = document.createElement("option");
//           option.value = dataValue.name;
//           option.text = id;
//           option.setAttribute("id", id);
//           productsFound.appendChild(option);
//         }
//         console.log("Finish Searching");
//       })
//       .catch((e) => {
//         console.error("Error While Searching For The Product", e);
//       });
//   } else {
//     deleteAllChilds(productsFound);
//   }
// };
// /********************************************************* */

// Function to create and style a card
function createCard(title, imageUrl, descriptionTxt) {
  // Create elements
  const card = document.createElement("div");
  const image = document.createElement("img");
  const header = document.createElement("h2");
  const description = document.createElement("p");

  // Set content
  image.src = imageUrl;
  header.textContent = title;
  description.textContent = descriptionTxt;

  // Add styles
  card.style.width = "200px";
  card.style.border = "1px solid #ccc";
  card.style.borderRadius = "8px";
  card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
  card.style.padding = "16px";
  card.style.textAlign = "center";
  card.style.backgroundColor = "#fff";
  card.style.transition = "transform 0.2s";

  image.style.width = "100%";
  image.style.borderRadius = "4px";

  header.style.fontSize = "18px";
  header.style.margin = "12px 0 8px";

  description.style.fontSize = "14px";
  description.style.color = "#555";

  // Add hover effect
  card.addEventListener("mouseenter", () => {
    card.style.transform = "scale(1.05)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "scale(1)";
  });

  // Append elements to the card
  card.appendChild(image);
  card.appendChild(header);
  card.appendChild(description);

  return card;
}

/******************************************************* */

// showAllCategories();
