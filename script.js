document.getElementById("generate-invoice").addEventListener("click", function () {
    const customerName = document.getElementById("customer-name").value;
    const customerAddress = document.getElementById("customer-address").value;
    const customerPhone = document.getElementById("customer-phone").value;
    const invoiceNumber = document.getElementById("invoice-number").value || Math.floor(Math.random() * 10000);
    const invoiceDate = document.getElementById("invoice-date").value || new Date().toISOString().split('T')[0];
    const dueDate = document.getElementById("due-date").value || new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0];

    // Fill SHIP TO details same as BILL TO
    document.getElementById("bill-to-name").textContent = customerName;
    document.getElementById("bill-to-address").textContent = customerAddress;
    document.getElementById("bill-to-phone").textContent = customerPhone;

    document.getElementById("ship-to-name").textContent = customerName;
    document.getElementById("ship-to-address").textContent = customerAddress;
    document.getElementById("ship-to-phone").textContent = customerPhone;

    // Display invoice info
    document.getElementById("display-invoice-number").textContent = invoiceNumber;
    document.getElementById("display-invoice-date").textContent = invoiceDate;
    document.getElementById("display-due-date").textContent = dueDate;

    // Populate items
    const itemList = document.querySelectorAll(".item-group");
    const tableBody = document.getElementById("item-display-table");
    tableBody.innerHTML = ""; // Clear existing rows
    let grandTotal = 0;

    itemList.forEach((itemGroup, index) => {
        const itemName = itemGroup.querySelector(".item-name").value;
        const itemQuantity = parseFloat(itemGroup.querySelector(".item-quantity").value);
        const itemRate = parseFloat(itemGroup.querySelector(".item-rate").value);
        const itemTax = (itemRate * itemQuantity * 0.18).toFixed(2);
        const itemAmount = (itemRate * itemQuantity + parseFloat(itemTax)).toFixed(2);

        grandTotal += parseFloat(itemAmount);

        const row = `<tr>
            <td>${itemName}</td>
            <td>${itemQuantity}</td>
            <td>${itemRate.toFixed(2)}</td>
            <td>${itemTax}</td>
            <td>${itemAmount}</td>
        </tr>`;

        tableBody.innerHTML += row;
    });

    document.getElementById("total-amount").textContent = grandTotal.toFixed(2);
    document.getElementById("amount-in-words").textContent = numberToWords(grandTotal.toFixed(2)) + " Rupees Only";

    // Show the invoice
    document.getElementById("invoice").style.display = "block";
});

document.getElementById("add-item").addEventListener("click", function () {
    const itemList = document.getElementById("item-list");
    const itemCount = itemList.children.length + 1;

    const newItem = document.createElement("div");
    newItem.classList.add("item-group");
    newItem.innerHTML = `
        <div class="form-group">
            <label for="item-name-${itemCount}">Item Name:</label>
            <input type="text" class="item-name" id="item-name-${itemCount}" placeholder="Enter item name" required>
        </div>
        <div class="form-group">
            <label for="item-quantity-${itemCount}">Quantity:</label>
            <input type="number" class="item-quantity" id="item-quantity-${itemCount}" placeholder="Enter quantity" required>
        </div>
        <div class="form-group">
            <label for="item-rate-${itemCount}">Rate:</label>
            <input type="number" class="item-rate" id="item-rate-${itemCount}" placeholder="Enter rate" step="0.01" required>
        </div>
    `;

    itemList.appendChild(newItem);
});

// Function to convert numbers to words (Basic Implementation)
function numberToWords(amount) {
    const words = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const integerPart = Math.floor(amount);
    return words[integerPart] || "Complex Amount"; // Simplified for demonstration
}
