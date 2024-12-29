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

const products = document.getElementById("products");
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

function showAllProducts() {
  getAllProducts()
    .then((data) => {
      for (let id in data) {
        let title,
          imageUrl,
          description,
          price,
          stockQuantity,
          rate,
          productID,
          objectFeedback;

        if (data[id].name && data[id].name != "0") {
          title = data[id].name;
        }
        if (data[id].imageUrl && data[id].imageUrl != "") {
          imageUrl = data[id].imageUrl;
        } else {
          imageUrl =
            "https://d1b3667xvzs6rz.cloudfront.net/2018/09/Product.jpg";
        }
        if (data[id].description && data[id].description != "0") {
          description = data[id].description;
        }
        if (data[id].price && data[id].price != "0") {
          price = data[id].price;
        } else {
          price = 0;
        }
        if (data[id].quantity && data[id].quantity != "0") {
          stockQuantity = data[id].quantity;
        } else {
          stockQuantity = 0;
        }
        if (data[id].objectFeedback && data[id].objectFeedback != "0") {
          objectFeedback = data[id].objectFeedback;
          rate = 0;
          let count = 0;
          for (let obj in objectFeedback) {
            rate += parseInt(objectFeedback[obj]);
            count++;
          }
          rate = rate / count;
        } else {
          rate = 0;
        }

        let card = createProductCard(
          title,
          imageUrl,
          description,
          price,
          stockQuantity,
          rate,
          id
        );
        products.appendChild(card);
        //console.log(products);

        /********************************* */
      }
      console.log("Finish Loading");
    })
    .catch((e) => {
      console.error(e);
    });
}

/**************************************************************/
function createProductCard(
  title,
  imageUrl,
  description,
  price,
  stockQuantity,
  rate,
  productID
) {
  // Create the card containerconst
  let card = document.createElement("div");
  card.style.width = "300px";
  card.style.border = "1px solid #ccc";
  card.style.borderRadius = "8px";
  card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
  card.style.padding = "16px";
  card.style.textAlign = "center";
  card.style.backgroundColor = "#fff";
  card.style.transition = "transform 0.2s";
  // Create the card contentconst
  let image = document.createElement("img");
  image.src = imageUrl;
  image.alt = title;
  image.style.width = "100%";
  image.style.borderRadius = "4px";
  const header = document.createElement("h2");
  header.textContent = title;
  header.style.margin = "12px 0 8px";
  const desc = document.createElement("p");
  desc.textContent = description;
  desc.style.fontSize = "14px";
  desc.style.color = "#555";
  const priceElement = document.createElement("p");
  priceElement.textContent = `Price: ${price}`;
  priceElement.style.fontWeight = "bold";
  priceElement.style.margin = "8px 0";
  const stockElement = document.createElement("p");
  stockElement.textContent = `Stock: ${stockQuantity} items`;
  stockElement.style.margin = "4px 0";
  const rateElement = document.createElement("p");
  rateElement.textContent = `Rating: ⭐ ${rate}`;
  rateElement.style.margin = "4px 0";
  const idElement = document.createElement("p");
  idElement.textContent = `Product ID: ${productID}`;
  idElement.style.fontSize = "12px";
  idElement.style.color = "#777";
  idElement.style.margin = "4px 0";
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
  card.appendChild(desc);
  card.appendChild(priceElement);
  card.appendChild(stockElement);
  card.appendChild(rateElement);
  card.appendChild(idElement);
  //   console.log(card);
  return card;
}

/***************************************************** */

/********************************** */
showAllProducts();
