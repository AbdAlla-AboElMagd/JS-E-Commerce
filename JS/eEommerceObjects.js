export function User(
  name = "",
  email = "",
  password = "",
  gender = "",
  isAdmin = "0"
) {
  this.name = name;
  this.email = email;
  this.password = password;
  this.gender = gender;
  this.isAdmin = isAdmin;
}
export function Category(
  name = "",
  imageUrl = "",
  categoryParent = null,
  description = ""
) {
  this.name = name;
  this.imageUrl = imageUrl;
  this.categoryParent = categoryParent;
  this.description = description;
}

export function CategoryPlainObject(
  name = "",
  imageUrl = "",
  categoryParent = null,
  description = ""
) {
  return {
    name: name,
    imageUrl: imageUrl,
    categoryParent: categoryParent,
    description: description,
  };
}

export function Product(
  name = "",
  price = 0,
  description = "",
  imageUrl = "",
  category = null,
  quantity = 0,
  objectFeedback = {}
) {
  this.name = name;
  this.price = price;
  this.description = description;
  this.imageUrl = imageUrl;
  this.category = category;
  this.quantity = quantity;
  this.objectFeedback = objectFeedback;
}

export function FullProduct(
  id = "",
  name = "",
  price = 0,
  description = "",
  imageUrl = "",
  category = null,
  quantity = 0,
  objectFeedback = {}
) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.description = description;
  this.imageUrl = imageUrl;
  this.category = category;
  this.quantity = quantity;
  this.objectFeedback = objectFeedback;
}

export function ProductPlainObject(
  name = "",
  price = 0,
  description = "",
  imageUrl = "",
  category = null,
  quantity = 0,
  objectFeedback = {}
) {
  return {
    name: name,
    price: price,
    description: description,
    imageUrl: imageUrl,
    category: category,
    quantity: quantity,
    objectFeedback: objectFeedback,
  };
}

export function FullProductPlainObject(
  id = "",
  name = "",
  price = 0,
  description = "",
  imageUrl = "",
  category = null,
  quantity = 0,
  objectFeedback = {},
  status = 0
) {
  return {
    id: id,
    name: name,
    price: price,
    description: description,
    imageUrl: imageUrl,
    category: category,
    quantity: quantity,
    objectFeedback: objectFeedback,
    status: status,
  };
}

export function CartPlainObject(userID, cart) {
  let cartArray = [];
  let order = {};
  for (let product of cart) {
    order = FullProductPlainObject(
      product.id,
      product.name,
      product.price,
      product.description,
      product.imageUrl,
      product.category,
      product.quantity,
      product.objectFeedback,
      product.status
    );
    order["userID"] = userID;
    cartArray.push(order);
  }
  return cartArray;
}

export function getStatus(statusNumber) {
  switch (statusNumber) {
    case 0:
      return "Pending";
      break;
    case 1:
      return "Approved";
      break;
    case 2:
      return "Rejected";
      break;
    case 3:
      return "Returned";
      break;
    case 4:
      return "Shipped";
      break;
    default:
      return "Unknown";
      break;
  }
}
