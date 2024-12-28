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

import { Category, CategoryPlainObject } from "../eEommerceObjects.js";

import { showingAlert } from "../controlAlert.js";

/*********************** Getting Form Elements ******************************* */
const categoryControl = document.forms["categoryControl"];
// console.log(categoryControl);
const categoryName = document.getElementById("categoryName");
const imgFile = document.getElementById("imgFile");
const imgPreview = document.getElementById("imgPreview");

const btnSearch = document.getElementById("btnSearch");
const categoriesFound = document.getElementById("categoriesFound");

const yesCategoryParent = document.getElementById("yesCategoryParent");
const noCategoryParent = document.getElementById("noCategoryParent");

const categoryParent = document.getElementById("categoryParent");

const description = document.getElementById("description");

const btnUpdate = document.getElementById("btnUpdate");
const btnDelete = document.getElementById("btnDelete");
const btnConfirmDelete = document.getElementById("btnConfirmDelete");
const staticBackdrop = document.getElementById("staticBackdrop");
/******************************************************************* */
function deleteAllSelectChilds(select) {
  while (select.firstChild) {
    select.removeChild(select.firstChild);
  }
}

function deleteAllOptionsExcept1(select, optionValue) {
  for (let i = select.options.length - 1; i >= 0; i--) {
    if (select.options[i].value == optionValue) {
      continue;
    } else {
      select.remove(i);
    }
  }
}

function handlingImagePreview() {
  if (imgFile.value && imgFile.value != "") {
    imgPreview.src = imgFile.value;
    imgPreview.style = "display:block";
  } else {
    imgPreview.style = "display:none";
  }
}

imgFile.onchange = function () {
  handlingImagePreview();
};

function getCategoryFromForm() {
  if (validateCategoryName()) {
    showingAlert(4, "Success: ", "Valid Formats");
    const categoryNameValue = document.getElementById("categoryName");
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

    let categoryDescription = "";
    if (description.value) {
      categoryDescription = description.value;
    } else {
      categoryDescription = "";
    }
    const category = CategoryPlainObject(
      categoryNameValue.value,
      imgUrl,
      categoryParentId,
      categoryDescription
    );
    return category;
  } else {
    showingAlert(1, "Error: ", "Invalid Formats");
    return null;
  }
}

/*******************************************************************/

categoryControl.onsubmit = (e) => {
  e.preventDefault();
  const category = getCategoryFromForm();
  if (category) {
    saveCategory(category);
  } else {
  }
};

function validateCategoryName() {
  const categoryName = document.getElementById("categoryName");
  let checkPattern = /^[a-zA-Z0-9\']{1,}( [a-zA-Z0-9\']{1,})*$/;
  let categoryNameValue = categoryName.value;
  let categoryNameParent = categoryName.parentNode;
  if (checkPattern.test(categoryNameValue)) {
    console.log("Accepted Name");
    categoryName.classList.remove("is-invalid");
    categoryName.classList.add("is-valid");
    categoryNameParent.classList.remove("is-invalid");
    categoryNameParent.classList.add("is-valid");
    return true;
  } else {
    console.log("Unaccepted Name");
    categoryName.classList.remove("is-valid");
    categoryName.classList.add("is-invalid");
    categoryNameParent.classList.remove("is-valid");
    categoryNameParent.classList.add("is-invalid");
    return false;
  }
}

categoryName.onkeyup = () => {
  if (validateCategoryName()) {
    btnSearch.disabled = false;
  } else {
    btnSearch.disabled = true;
  }
};
categoryName.onchange = () => {
  validateCategoryName();
};

function saveCategory(category) {
  promiseStoreObjectFirestore("categories", category)
    .then((id) => {
      console.log("Saved Category ID: ", id);
      showingAlert(4, "Category Saved", "Category Saved Successfully");
      return id;
    })
    .catch((e) => {
      console.error("Error While Saving The Category", e);
    });
}

/*********************************************************/
/********* Searching Function *********/
btnSearch.onclick = () => {
  let categoryNameValue = categoryName.value;
  if (validateCategoryName()) {
    deleteAllOptionsExcept1(categoriesFound, "0");
    promiseSearchWithKeyAndValue("categories", "name", categoryNameValue)
      .then((data) => {
        categoriesFound.disabled = false;
        for (let id in data) {
          let dataValue = data[id];
          let option = document.createElement("option");
          option.value = id;
          option.text = dataValue.name;
          categoriesFound.appendChild(option);
        }

        showingAlert(
          4,
          "Got The Matching Categories",
          "Searching Done Successfully"
        );
      })
      .catch((e) => {
        showingAlert(1, "Error: ", "Error While Searching For The Category");
        console.error("Error While Searching The Category", e);
      });
  }
};

/****************************************/
/******************* Getting All Saved catogires ***********************/

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
        showingAlert(1, "Error: ", "Error While Searching For The Category");
        console.error("Error While Searching The Category", e);
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
        deleteAllSelectChilds(categoryParent);
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
          showingAlert(4, "Success: ", "Got The Category Details");
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

categoriesFound.onchange = () => {
  console.log("ID: ", categoriesFound.value);
  if (categoriesFound.value && categoriesFound.value != "0") {
    btnUpdate.disabled = false;
    btnDelete.disabled = false;
    let categoryId = categoriesFound.value;
    promiseGetSingleDataWithID("categories", categoryId)
      .then((data) => {
        categoryName.value = data.name;
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
        handlingImagePreview();
        if (data.categoryParent) {
          choosingCategoryParent(data.categoryParent);
          // categoryParent.value = data.categoryParent;
        } else {
          noCategoryParent.checked = true;
          customizeCategoryParent();
        }
      })
      .catch((e) => {
        console.error("Error While Getting The Category", e);
      });
  } else {
    btnUpdate.disabled = true;
    btnDelete.disabled = true;
  }
};

/************************* Handling Updating **********************************/
function updateCategory(categoryId, category) {
  promiseUpdateData("categories", categoryId, category)
    .then(() => {
      console.log("Updated Category ID: ", categoryId);
      showingAlert(4, "Category Updated", "Category Updated Successfully");
    })
    .catch((e) => {
      console.error("Error While Updating The Category", e);
      showingAlert(1, "Error: ", "Failed to Update Category");
    });
}

btnUpdate.onclick = () => {
  const category = getCategoryFromForm();
  const categoryId = categoriesFound.value;
  if (category && categoryId) {
    updateCategory(categoryId, category);
  } else {
    showingAlert(1, "Error: ", "Please Select Category First");
  }
};
/*******************************************************************************/
/************************ Handling Deleting *******************************/
function deleteCategory(categoryId) {
  promiseDeleteDataFromTable("categories", categoryId)
    .then(() => {
      console.log("Deleted Category ID: ", categoryId);
      showingAlert(4, "Category Deleted", "Category Deleted Successfully");
    })
    .catch((e) => {
      console.error("Error While Deleting The Category", e);
      showingAlert(1, "Error: ", "Failed to Delete Category");
    });
}
// btnDelete.onclick = () => {

// };

const deletePopUp = new bootstrap.Modal(staticBackdrop);

btnConfirmDelete.addEventListener("click", () => {
  const categoryId = categoriesFound.value;
  if (categoryId) {
    const categoryId = categoriesFound.value;
    if (categoryId && categoryId !== "0") {
      deleteCategory(categoryId);
    } else {
      showingAlert(1, "Error: ", "Please Select Category First");
    }
  }
  deletePopUp.hide();
});
