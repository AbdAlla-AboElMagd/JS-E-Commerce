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
const targetPage = "./HTML/showProductsInCategory.html";
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

// Function to Handle the Carts
function createCard(title, imageUrl, descriptionTxt, id) {
  // Create anchor element to wrap the card
  const linkWrapper = document.createElement("a");
  linkWrapper.href = `${targetPage}?categoryId=${id}`; // Construct the new URL with category ID
  linkWrapper.style.textDecoration = "none"; // Remove underline
  linkWrapper.style.color = "inherit"; // Inherit text color for a clean look

  // Create Card
  const card = document.createElement("div");
  card.className = "card"; // Use Bootstrap card class for styling

  const image = document.createElement("img");
  const header = document.createElement("h2");
  const description = document.createElement("p");

  // Set content
  image.src = imageUrl;
  image.className = "card-img-top"; // Use Bootstrap card image class
  header.textContent = title;
  header.className = "card-title"; // Use Bootstrap card title class
  description.textContent = descriptionTxt;
  description.className = "card-text"; // Use Bootstrap card text class

  // Add styles
  card.style.width = "100%";
  card.style.border = "1px solid #ccc";
  card.style.borderRadius = "8px";
  card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
  card.style.padding = "16px";
  card.style.textAlign = "center";
  card.style.backgroundColor = "#fff";
  card.style.transition = "transform 0.2s";

  image.style.width = "100%";
  image.style.height = "400px"; // Adjust height as needed
  image.style.objectFit = "cover"; // Ensure image covers the space
  image.style.borderRadius = "4px";

  header.style.fontSize = "18px";
  header.style.margin = "12px 0 8px";

  description.style.fontSize = "14px";
  description.style.color = "#555";
  description.style.overflow = "hidden";
  description.style.textOverflow = "ellipsis";
  description.style.whiteSpace = "nowrap"; // Hide overflow text with ellipses
  description.style.height = "40px"; // Set a fixed height for the description
  description.style.transition = "height 0.2s"; // Transition effect for height change

  // Add hover effect
  card.addEventListener("mouseenter", () => {
    card.style.transform = "scale(1.05)";
    description.style.whiteSpace = "normal"; // Allow text to wrap
    description.style.overflow = "auto"; // Enable scrolling
    description.style.height = "auto"; // Expand height to fit content
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "scale(1)";
    description.style.whiteSpace = "nowrap"; // Revert to hiding overflow text
    description.style.overflow = "hidden"; // Disable scrolling
    description.style.height = "40px"; // Revert to fixed height
  });

  // Append elements to the card
  card.appendChild(image);
  card.appendChild(header);
  card.appendChild(description);

  // Wrap the card in the anchor element
  linkWrapper.appendChild(card);

  return linkWrapper;
}

// Function to add cards to the carousel
function addCardToCarousel(title, imageUrl, descriptionTxt, id, isActive) {
  const carouselInner = document.getElementById("carouselInner");

  const carouselItem = document.createElement("div");
  carouselItem.className = `carousel-item ${isActive ? "active" : ""}`;

  // Create a container for the card to take full width
  const container = document.createElement("div");
  container.className = "container-fluid"; // Use Bootstrap fluid container for full width

  const card = createCard(title, imageUrl, descriptionTxt, id);
  container.appendChild(card);
  carouselItem.appendChild(container);

  carouselInner.appendChild(carouselItem);
}

function showAllCategories() {
  getAllCategories()
    .then((data) => {
      let first = true;
      for (let id in data) {
        let title, imageUrl, description;

        if (data[id].name && data[id].name !== "0") {
          title = data[id].name;
        }
        if (data[id].imageUrl && data[id].imageUrl !== "") {
          imageUrl = data[id].imageUrl;
        } else {
          imageUrl =
            "https://cdn.prod.website-files.com/65aeef01ceab5a488ee1a755/65bae5dca22bad4391e32bad_category-green-bg-1200x630.jpg";
        }
        if (data[id].description && data[id].description !== "0") {
          description = data[id].description;
        }

        addCardToCarousel(title, imageUrl, description, id, first);
        first = false;
      }
      console.log("Finish Loading");
    })
    .catch((e) => {
      console.error(e);
    });
}

/********************************************************* */
showAllCategories();
