// Product Data

const products = [

    {
        id: 1,
        name: "T-Shirt",
        category: "fashion",
        price: 499,
        image: "👕",
        description: "Comfortable cotton T-Shirt suitable for everyday wear."
    },

    {
        id: 2,
        name: "Running Shoes",
        category: "fashion",
        price: 1499,
        image: "👟",
        description: "Lightweight running shoes designed for comfort and performance."
    },

    {
        id: 3,
        name: "Smartphone",
        category: "electronics",
        price: 15999,
        image: "📱",
        description: "Modern smartphone with powerful performance and a clear display."
    },

    {
        id: 4,
        name: "Headphones",
        category: "electronics",
        price: 1999,
        image: "🎧",
        description: "Wireless headphones with excellent sound quality."
    },

    {
        id: 5,
        name: "Smart Watch",
        category: "electronics",
        price: 2999,
        image: "⌚",
        description: "Smart watch with fitness tracking and notification features."
    },

    {
        id: 6,
        name: "Backpack",
        category: "accessories",
        price: 899,
        image: "🎒",
        description: "Spacious backpack suitable for college, office and travel."
    },

    {
        id: 7,
        name: "Sunglasses",
        category: "accessories",
        price: 699,
        image: "🕶️",
        description: "Stylish sunglasses with a modern design."
    },

    {
        id: 8,
        name: "Handbag",
        category: "accessories",
        price: 1299,
        image: "👜",
        description: "Elegant handbag with enough space for daily essentials."
    }

];


// Shopping Cart

let cart = [];


// Display Products

function displayProducts(productList) {

    const container =
        document.getElementById("productContainer");

    container.innerHTML = "";

    if (productList.length === 0) {

        container.innerHTML =
            "<p>No products found.</p>";

        return;
    }

    productList.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <div class="product-image">
                ${product.image}
            </div>

            <h3>${product.name}</h3>

            <p class="category">
                ${product.category}
            </p>

            <p class="price">
                ₹${product.price}
            </p>

            <div class="product-buttons">

                <button
                    class="view-btn"
                    onclick="viewProduct(${product.id})">
                    View Details
                </button>

                <button
                    class="add-btn"
                    onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

            </div>
        `;

        container.appendChild(card);

    });
}


// Search Products

document
    .getElementById("searchInput")
    .addEventListener("input", filterProducts);


// Category Filter

document
    .getElementById("categoryFilter")
    .addEventListener("change", filterProducts);


// Filter Products

function filterProducts() {

    const searchText =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();

    const category =
        document
            .getElementById("categoryFilter")
            .value;

    const filteredProducts =
        products.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchText);

            const matchesCategory =
                category === "all" ||
                product.category === category;

            return matchesSearch &&
                   matchesCategory;

        });

    displayProducts(filteredProducts);
}


// Add Product to Cart

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );

    const existingProduct =
        cart.find(
            item => item.id === productId
        );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }

    updateCart();

    alert(product.name + " added to cart!");
}


// Increase Quantity

function increaseQuantity(productId) {

    const item =
        cart.find(
            item => item.id === productId
        );

    if (item) {
        item.quantity++;
    }

    updateCart();
}


// Decrease Quantity

function decreaseQuantity(productId) {

    const item =
        cart.find(
            item => item.id === productId
        );

    if (item) {

        item.quantity--;

        if (item.quantity <= 0) {

            removeFromCart(productId);

            return;
        }
    }

    updateCart();
}


// Remove Product

function removeFromCart(productId) {

    cart =
        cart.filter(
            item => item.id !== productId
        );

    updateCart();
}


// Update Cart

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const totalItems =
        document.getElementById("totalItems");

    const totalPrice =
        document.getElementById("totalPrice");

    const cartCount =
        document.getElementById("cartCount");

    cartItems.innerHTML = "";

    let itemCount = 0;

    let total = 0;


    if (cart.length === 0) {

        cartItems.innerHTML =
            `<p class="empty-cart">
                Your cart is empty.
            </p>`;

    }


    cart.forEach(item => {

        itemCount += item.quantity;

        total +=
            item.price * item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <h3>
                    ${item.image}
                    ${item.name}
                </h3>

                <p>
                    ₹${item.price} each
                </p>

            </div>


            <div class="quantity">

                <button
                    onclick="decreaseQuantity(${item.id})">
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="increaseQuantity(${item.id})">
                    +
                </button>

            </div>


            <strong>
                ₹${item.price * item.quantity}
            </strong>


            <button
                class="remove-btn"
                onclick="removeFromCart(${item.id})">
                Remove
            </button>

        `;

        cartItems.appendChild(cartItem);

    });


    totalItems.textContent = itemCount;

    totalPrice.textContent = total;

    cartCount.textContent = itemCount;
}


// View Product Details

function viewProduct(productId) {

    const product =
        products.find(
            item => item.id === productId
        );

    const modal =
        document.getElementById("productModal");

    const details =
        document.getElementById("productDetails");


    details.innerHTML = `

        <div class="modal-product-image">
            ${product.image}
        </div>

        <h2>
            ${product.name}
        </h2>

        <p>
            <strong>Category:</strong>
            ${product.category}
        </p>

        <p>
            ${product.description}
        </p>

        <h3>
            Price: ₹${product.price}
        </h3>

        <br>

        <button
            class="add-btn"
            onclick="addToCart(${product.id});
                     closeModal();">
            Add to Cart
        </button>
    `;


    modal.style.display = "flex";
}


// Close Product Details

function closeModal() {

    document.getElementById(
        "productModal"
    ).style.display = "none";
}


// Close Modal when clicking outside

window.onclick = function(event) {

    const modal =
        document.getElementById("productModal");

    if (event.target === modal) {

        closeModal();

    }

};


// Checkout

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    alert(
        "Thank you for shopping with ShopEasy!"
    );

    cart = [];

    updateCart();
}


// Display Products when page loads

displayProducts(products);

updateCart();