// Initialize item counter
let itemCounter = 1;

// Function to add a new item row
document.getElementById("add-item").addEventListener("click", function () {
    itemCounter++;
    const newItemGroup = document.createElement("div");
    newItemGroup.classList.add("item-group");
    newItemGroup.innerHTML = `
        <div class="form-group">
            <label for="item-name-${itemCounter}">Item Name:</label>
            <input type="text" class="item-name" id="item-name-${itemCounter}" placeholder="Enter item name" required>
        </div>
        <div class="form-group">
            <label for="item-quantity-${itemCounter}">Quantity:</label>
            <input type="number" class="item-quantity" id="item-quantity-${itemCounter}" placeholder="Enter quantity" required>
        </div>
        <div class="form-group">
            <label for="item-rate-${itemCounter}">Rate (Incl. Tax):</label>
            <input type="number" class="item-rate" id="item-rate-${itemCounter}" placeholder="Enter rate including tax" step="0.01" required>
        </div>
    `;
    document.getElementById("item-list").appendChild(newItemGroup);
});

// Generate invoice and open in a new tab
document.getElementById("generate-invoice").addEventListener("click", function () {
    const billToName = document.getElementById("customer-name").value;
    const billToAddress = document.getElementById("customer-address").value;

    const shipToName = billToName; // "Ship To" matches "Bill To"
    const shipToAddress = billToAddress;

    const invoiceNumber = document.getElementById("invoice-number").value || Math.floor(Math.random() * 10000);
    const invoiceDate = formatDate(document.getElementById("invoice-date").value) || new Date().toLocaleDateString("en-GB");
    const dueDate = formatDate(document.getElementById("due-date").value) || new Date(new Date().setDate(new Date().getDate() + 30)).toLocaleDateString("en-GB");

    // Collect item data
    const itemList = document.querySelectorAll(".item-group");
    let itemsHTML = "";
    let grandTotal = 0;

    itemList.forEach((itemGroup, index) => {
        const itemName = itemGroup.querySelector(".item-name").value;
        const itemQuantity = parseFloat(itemGroup.querySelector(".item-quantity").value);
        const itemRateInclTax = parseFloat(itemGroup.querySelector(".item-rate").value);

        const itemRateExclTax = (itemRateInclTax / 1.18).toFixed(2); // Calculate rate excluding tax
        const itemTax = (itemRateExclTax * itemQuantity * 0.18).toFixed(2); // Calculate 18% tax
        const itemAmount = (itemRateExclTax * itemQuantity + parseFloat(itemTax)).toFixed(2);

        grandTotal += parseFloat(itemAmount);

        itemsHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${itemName}</td>
                <td>${itemQuantity}</td>
                <td>${itemRateExclTax}</td>
                <td>${itemTax}</td>
                <td>${itemAmount}</td>
            </tr>`;
    });

    const totalAmountWords = numberToWords(grandTotal) + " Rupees Only";

    // Create a new page for the invoice
    const invoiceHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Invoice #${invoiceNumber}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; padding: 0; }
                .invoice-container { max-width: 800px; margin: auto; }
                .invoice-header { text-align: center; border-bottom: 2px solid #ddd; margin-bottom: 20px; padding-bottom: 10px; }
                .invoice-header h1 { color: #4CAF50; margin: 0; }
                .invoice-info, .invoice-summary { margin-top: 20px; }
                .invoice-info div { margin-bottom: 10px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ddd; padding: 10px; text-align: center; }
                th { background: #4CAF50; color: white; }
                .invoice-summary { text-align: right; font-weight: bold; font-size: 16px; margin-top: 20px; }
                .invoice-footer { margin-top: 30px; font-size: 14px; color: #555; border-top: 1px solid #ddd; padding-top: 10px; }
            </style>
        </head>
        <body>
            <div class="invoice-container">
                <header class="invoice-header">
                    <h1>Ambey Traders</h1>
                    <p>Flat NO 11 Ground Floor Nilkanth Tower, Kaushambi, Ghaziabad, Uttar Pradesh, 201010</p>
                    <p>Mobile: 9876543210 | GSTIN: 09CWZPK1158E1Z2 | PAN: CWZPK1158E</p>
                    <p>Email: ambey.traders06@gmail.com</p>
                </header>
                <section class="invoice-info">
                    <div><strong>Invoice No.:</strong> ${invoiceNumber}</div>
                    <div><strong>Invoice Date:</strong> ${invoiceDate}</div>
                    <div><strong>Due Date:</strong> ${dueDate}</div>
                    <div><strong>BILL TO:</strong><br>${billToName}<br>${billToAddress}</div>
                    <div><strong>SHIP TO:</strong><br>${shipToName}<br>${shipToAddress}</div>
                </section>
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>ITEMS</th>
                            <th>QTY</th>
                            <th>RATE (Excl. Tax)</th>
                            <th>TAX (18%)</th>
                            <th>AMOUNT</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHTML}
                    </tbody>
                </table>
                <div class="invoice-summary">
                    <p>Total Amount (Incl. Tax): ₹ ${grandTotal.toFixed(2)}</p>
                    <p>Total Amount (in words): ${totalAmountWords}</p>
                </div>
                <footer class="invoice-footer">
                    <p><strong>Terms and Conditions:</strong></p>
                    <ul>
                        <li>Goods once sold will not be taken back or exchanged.</li>
                        <li>All disputes are subject to the jurisdiction of our business location.</li>
                    </ul>
                </footer>
            </div>
            <script>
                window.print();
            </script>
        </body>
        </html>
    `;

    // Open the invoice in a new tab
    const invoiceWindow = window.open("", "_blank");
    invoiceWindow.document.write(invoiceHTML);
    invoiceWindow.document.close();
});

// Function to format dates in dd/mm/yyyy
function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Format: dd/mm/yyyy
}

// Function to convert numbers to words
// Function to convert numbers to words
function numberToWords(number) {
    const a = [
        "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
        "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen",
    ];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    
    if (number === 0) return "Zero";

    const convertToWords = (n) => {
        if (n < 20) return a[n];
        if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
        if (n < 1000)
            return (
                a[Math.floor(n / 100)] +
                " Hundred" +
                (n % 100 ? " and " + convertToWords(n % 100) : "")
            );
        if (n < 100000)
            return (
                convertToWords(Math.floor(n / 1000)) +
                " Thousand" +
                (n % 1000 ? " " + convertToWords(n % 1000) : "")
            );
        if (n < 10000000)
            return (
                convertToWords(Math.floor(n / 100000)) +
                " Lakh" +
                (n % 100000 ? " " + convertToWords(n % 100000) : "")
            );
        return (
            convertToWords(Math.floor(n / 10000000)) +
            " Crore" +
            (n % 10000000 ? " " + convertToWords(n % 10000000) : "")
        );
    };

    const [whole, decimal] = number.toString().split(".");
    let result = convertToWords(parseInt(whole)) + " Rupees";
    if (decimal && parseInt(decimal) > 0) {
        result += " and " + convertToWords(parseInt(decimal)) + " Paise";
    }
    return result + " Only";
}

