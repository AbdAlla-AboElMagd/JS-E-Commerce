const xhr1 = new XMLHttpRequest();
xhr1.open("GET", 'https://hossamgamalelhelw.github.io/Host_API/product.json', true);
var arr;
// !
xhr1.onreadystatechange = function() {
    if (xhr1.readyState === 4 && xhr1.status === 200) {
        arr = JSON.parse(xhr1.responseText); 
        loadCartItems(); 
    }
};
xhr1.send();

const buttons = document.querySelectorAll(".btn");
const cartTable = document.getElementsByClassName("cart-table")[0];
const totalPrice = document.getElementById("total_price");
var totalPriceOfCart = 0;

// Load cart items from local storage
function loadCartItems() {
    //* [] as when cartItems not return null value
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    savedCart.forEach(item => {
        addProduct(item, false);
    });
}

// ! Add product to the cart
function addProduct(element, updateStorage = true) {
    if (updateStorage) {
        // Add item to local storage
        let savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
        savedCart.push(element);
        localStorage.setItem("cartItems", JSON.stringify(savedCart));
    }

    cartTable.style.display = "flex";
    const product = document.createElement("div");
    product.className = "cart_item";
    product.innerHTML += 
    `<img src="${element.image}" class="product-image">
        <div class="item-details">
            <h2>${element.title}</h2>
            <p>Price: $<p class="price_product">${element.price}</p></p>
        </div>
        <i class="icon_delete fa-solid fa-trash-can" style="color: #155263;"></i>`;
    
    cartTable.appendChild(product);
    totalPriceOfCart += element.price;
    totalPrice.innerHTML = `$${totalPriceOfCart.toFixed(2)}`;

    // Set up delete functionality
    setupDeleteFunctionality(product);
}

// ! Set up delete functionality for products
function setupDeleteFunctionality(product) {
    const deleteIcon = product.querySelector(".icon_delete");
    deleteIcon.addEventListener("click", function() {
        const priceProduct = product.querySelector(".price_product").textContent;

        // Update the total price by subtracting the price of the deleted product
        totalPriceOfCart -= (+priceProduct);

        // Ensure total price doesn't go negative
        if (totalPriceOfCart < 0) totalPriceOfCart = 0;
        // Update the displayed total price
        updateTotalPrice();
        // Remove the product from the cart
        cartTable.removeChild(product);

        // Check if there are no items left in the cart
        if (cartTable.children.length === 0) {
            // Hide the cart if empty
            cartTable.style.display = "none"; 
        }
        // Remove from local storage
        removeProductFromLocalStorage(product);
    });
}

// ! Remove product from local storage
function removeProductFromLocalStorage(product) {
    let savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const title = product.querySelector("h2").textContent;
    // Remove the item based on title
    savedCart = savedCart.filter(function(item) {
        return item.title !== title;
    });
    // Save updated cart
    localStorage.setItem("cartItems", JSON.stringify(savedCart));
}
// !Update displayed total price
function updateTotalPrice() {
    totalPrice.innerHTML = `$${totalPriceOfCart.toFixed(2)}`;
}

// ! Add event listeners to buttons // 
buttons.forEach(button => {
    button.addEventListener("click", function() {
        if (xhr1.readyState === 4 && xhr1.status === 200) {
            // Get the value of the clicked button
            const productId = this.value; 
            for (const element of arr) {
                if (element.id == productId) {
                    // Add product and update local storage
                    addProduct(element, true); 
                    break; 
                }
            }
        }
    });
});

// ! Success message & Delete Products // 
// * This ensures that the script runs only after the DOM has fully loaded, 
// * preventing the undefined error when selecting elements like .second_btn.

const continueBuying = document.getElementsByClassName("second_btn")[0];
const messageSuccess = document.getElementsByClassName("success-message")[0];

continueBuying.addEventListener("click", function() {
    if (totalPriceOfCart > 0) { // Ensure the cart has products
        // Hide the cart and show the success message
        cartTable.style.display = "none";
        messageSuccess.style.display = "block";

        // Hide the success message after 4 seconds
        setTimeout(() => {
            messageSuccess.style.display = "none";
        }, 4000);

        // Clear local storage
        localStorage.removeItem("cartItems");

        // Remove all products from the cart visually
        cartTable.innerHTML = "";

        // Reset total price to 0 and update the displayed total
        totalPriceOfCart = 0;  
        totalPrice.innerHTML = `$${totalPriceOfCart.toFixed(2)}`;

    } else {
        // Alert the user if there are no products in the cart
        alert("Please choose products to add to your cart.");
    }
});




