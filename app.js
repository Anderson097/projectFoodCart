const Wrapper = document.querySelector(".cards");
const cartContainer = document.querySelector(".cartCard");
let cart = [];

// Function to update the cart display
function updateCartDisplay() {
    cartContainer.innerHTML = `<h3>Your Cart (${cart.length})</h3>`; // Update cart header with item count
    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cartItem");

        cartItem.innerHTML = `
            <div class="cartItemDetails">
                <div>
                    <h4>${item.name}</h4>
                    <p>$${item.price} x ${item.quantity}</p>
                </div>
            </div>
            <div class="cartItemQuantity">
                <button class="decrease">-</button>
                <span>${item.quantity}</span>
                <button class="increase">+</button>
            </div>
        `;

        // Add event listeners for quantity change
        cartItem.querySelector(".increase").addEventListener("click", () => {
            updateItemQuantity(item.name, 1); // Increase the quantity
        });
        cartItem.querySelector(".decrease").addEventListener("click", () => {
            updateItemQuantity(item.name, -1); // Decrease the quantity
        });

        cartContainer.appendChild(cartItem);
    });
}

// Function to update item quantity in the cart
function updateItemQuantity(itemName, change) {
    const item = cart.find(item => item.name === itemName);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.name !== itemName);
        }
    }
    updateCartDisplay();
}

// Function to add item to cart
function addToCart(item) {
    // Check if the item already exists in the cart
    const existingItem = cart.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCartDisplay();
}

// Function to create product card dynamically
function createCard(item) {
    const card = document.createElement("div");
    card.classList.add("cardOne");

    const cardContent = `
        <div class="cardImg">
            <img src="${item.image.desktop}" alt="${item.name}">
            <button class="btn">
                <img src="./assets/images/icon-add-to-cart.svg" alt="Add to Cart">
                <p>Add to Cart</p>
            </button>
        </div>
        <div class="cardCont">
            <p>${item.category}</p>
            <h3>${item.name}</h3>
            <span>$${item.price}</span>
        </div>
    `;

    card.innerHTML = cardContent;

    // Add event listener to the "Add to Cart" button
    card.querySelector(".btn").addEventListener("click", () => {
        addToCart(item);
    });

    Wrapper.appendChild(card);
}

// Render all products dynamically
const products = [
    {
       "image": {
            "desktop": "./assets/images/image-waffle-desktop.jpg"
       },
       "name": "Waffle with Berries",
       "category": "Waffle",
       "price": 6.50
    },
    {
        "image": {
            "desktop": "./assets/images/image-creme-brulee-desktop.jpg"
        },
        "name": "Vanilla Bean Crème Brûlée",
        "category": "Crème Brûlée",
        "price": 7.00
     },
     {
        "image": {
            "desktop": "./assets/images/image-macaron-desktop.jpg"
        },
        "name": "Macaron Mix of Five",
        "category": "Macaron",
        "price": 8.00
     },
     {
        "image": {
            "desktop": "./assets/images/image-tiramisu-desktop.jpg"
        },
        "name": "Classic Tiramisu",
        "category": "Tiramisu",
        "price": 5.50
     },
     {
        "image": {
            "desktop": "./assets/images/image-baklava-desktop.jpg"
        },
        "name": "Pistachio Baklava",
        "category": "Baklava",
        "price": 4.00
     },
     {
        "image": {
            "desktop": "./assets/images/image-meringue-desktop.jpg"
        },
        "name": "Lemon Meringue Pie",
        "category": "Pie",
        "price": 5.00
     },
     {
        "image": {
            "desktop": "./assets/images/image-cake-desktop.jpg"
        },
        "name": "Red Velvet Cake",
        "category": "Cake",
        "price": 4.50
     },
     {
        "image": {
            "desktop": "./assets/images/image-brownie-desktop.jpg"
        },
        "name": "Salted Caramel Brownie",
        "category": "Brownie",
        "price": 4.50
     },
     {
        "image": {
            "desktop": "./assets/images/image-panna-cotta-desktop.jpg"
        },
        "name": "Vanilla Panna Cotta",
        "category": "Panna Cotta",
        "price": 6.50
     }
];

// Loop through each product and create cards
products.forEach(item => createCard(item));

// Function to update the cart display
function updateCartDisplay() {
    cartContainer.innerHTML = `<h3>Your Cart (${cart.length})</h3>`; // Update cart header with item count
    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cartItem");

        cartItem.innerHTML = `
            <div class="cartItemDetails">
                <h4>${item.name}</h4>
                <p>$${item.price} x ${item.quantity}</p>
            </div>
            <div class="cartItemQuantity">
                <button class="decrease">-</button>
                <span>${item.quantity}</span>
                <button class="increase">+</button>
            </div>
        `;

        // Add event listeners for quantity change
        cartItem.querySelector(".increase").addEventListener("click", () => {
            updateItemQuantity(item.name, 1);
        });
        cartItem.querySelector(".decrease").addEventListener("click", () => {
            updateItemQuantity(item.name, -1);
        });

        cartContainer.appendChild(cartItem);
    });

    // Only show Checkout button if cart has items
    const checkoutButton = document.querySelector(".checkout-btn");
    if (cart.length > 0) {
        checkoutButton.style.display = "block";  // Show Checkout button
    } else {
        checkoutButton.style.display = "none";  // Hide Checkout button
    }
}
