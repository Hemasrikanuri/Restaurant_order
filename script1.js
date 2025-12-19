// Cart data
let cartItems = [];
let cartCount = 0;

// Navigate to menu page
function goToMenu() {
    window.location.href = "menu.html";
}

// Add item to cart
function addToCart(itemName, price) {
    cartItems.push({ name: itemName, price: price });
    cartCount++;

    document.getElementById("cartCount").innerText = cartCount;
    alert(itemName + " added to cart 🛒");
}

// View order summary
function placeOrder() {
    const tableNo = document.getElementById("tableNumber").value;

    if (tableNo === "") {
        alert("Please enter table number!");
        return;
    }

    if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    renderOrderSummary(tableNo);
}

// Build order summary
function renderOrderSummary(tableNo) {
    let total = 0;
    let summary = `<h3>Order Summary</h3>
                   <p><b>Table Number:</b> ${tableNo}</p>
                   <ul>`;

    cartItems.forEach((item, index) => {
        summary += `
            <li>
                ${item.name} - ₹${item.price}
                <button onclick="removeItem(${index}, ${tableNo})">❌</button>
            </li>
        `;
        total += item.price;
    });

    summary += `</ul>
                <p><b>Total Amount: ₹${total}</b></p>
                <button onclick="confirmOrder()">Confirm Order</button>`;

    document.getElementById("orderSummary").innerHTML = summary;
}

// Remove mis-pressed item
function removeItem(index, tableNo) {
    cartItems.splice(index, 1);
    cartCount--;

    document.getElementById("cartCount").innerText = cartCount;

    if (cartItems.length === 0) {
        document.getElementById("orderSummary").innerHTML =
            "<p>Your cart is empty.</p>";
        return;
    }

    renderOrderSummary(tableNo);
}

// Final confirmation
function confirmOrder() {
    document.getElementById("orderSummary").innerHTML =
        "<h3>✅ Order Placed Successfully!</h3>";

    cartItems = [];
    cartCount = 0;
    document.getElementById("cartCount").innerText = 0;
    document.getElementById("tableNumber").value = "";
}
