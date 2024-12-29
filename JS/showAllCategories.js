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
function getAllCategories() {
  return promiseGetAllTableData("categories");
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

        // let card = createCard(title, imageUrl, description);
        let card = createCard(title, imageUrl, description, "#");
        foundCategories.appendChild(card);

        // /*** Containers */
        // let divContainer = document.createElement("div");
        // let img = document.createElement("img");
        // let name = document.createElement("h2");
        // let description = document.createElement("p");
        // /*** Data */
        // if (data[id].name && data[id].name != "0") {
        //   name.textContent = data[id].name;
        // }
        // if (data[id].imageUrl && data[id].imageUrl != "") {
        //   img.src = data[id].imageUrl;
        // } else {
        //   img.src =
        //     "https://cdn.prod.website-files.com/65aeef01ceab5a488ee1a755/65bae5dca22bad4391e32bad_category-green-bg-1200x630.jpg";
        // }
        // if (data[id].description && data[id].description != "0") {
        //   description.textContent = data[id].description;
        // }
        // // let dataValue = data[id];

        // divContainer.appendChild(img);
        // divContainer.appendChild(name);
        // divContainer.appendChild(description);
        // foundCategories.appendChild(divContainer);

        /********************************* */

        /********************************* */
      }
      console.log("Finish Loading");
    })
    .catch((e) => {
      console.error(e);
    });
}

// Function to create and style a card
// function createCard(title, imageUrl, descriptionTxt) {
//   // Create elements
//   const card = document.createElement("div");
//   const image = document.createElement("img");
//   const header = document.createElement("h2");
//   const description = document.createElement("p");

//   // Set content
//   image.src = imageUrl;
//   header.textContent = title;
//   description.textContent = descriptionTxt;

//   // Add styles
//   card.style.width = "800px";
//   card.style.border = "1px solid #ccc";
//   card.style.borderRadius = "8px";
//   card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
//   card.style.padding = "16px";
//   card.style.textAlign = "center";
//   card.style.backgroundColor = "#fff";
//   card.style.transition = "transform 0.2s";

//   image.style.width = "100%";
//   image.style.borderRadius = "4px";

//   header.style.fontSize = "18px";
//   header.style.margin = "12px 0 8px";

//   description.style.fontSize = "14px";
//   description.style.color = "#555";

//   // Add hover effect
//   card.addEventListener("mouseenter", () => {
//     card.style.transform = "scale(1.05)";
//   });

//   card.addEventListener("mouseleave", () => {
//     card.style.transform = "scale(1)";
//   });

//   // Append elements to the card
//   card.appendChild(image);
//   card.appendChild(header);
//   card.appendChild(description);

//   return card;
// }

/******************************************************* */

/********************************** */
showAllCategories();

/********************************************************* */
// Function to create and style a card
function createCard(title, imageUrl, descriptionTxt, link) {
  // Create anchor element to wrap the card
  const linkWrapper = document.createElement("a");
  linkWrapper.href = link;
  linkWrapper.style.textDecoration = "none"; // Remove underline
  linkWrapper.style.color = "inherit"; // Inherit text color for a clean look

  // Create card element
  const card = document.createElement("div");
  const image = document.createElement("img");
  const header = document.createElement("h2");
  const description = document.createElement("p");

  // Set content
  image.src = imageUrl;
  header.textContent = title;
  description.textContent = descriptionTxt;

  // Add styles
  card.style.width = "800px";
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

  // Add click event listener to the card
  card.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior
    console.log(`Card clicked: ${title}`);
    window.location.href = link; // Navigate to the link
  });

  // Wrap the card in the anchor element
  linkWrapper.appendChild(card);

  return linkWrapper;
}
