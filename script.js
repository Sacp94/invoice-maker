/* General Reset */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
    color: #000000 ;
}

/* Form Styling */
.form-container {
    width: 80%;
    max-width: 600px;
    margin: 20px auto;
    background: #fff;
    padding: 20px;
    border: 1px solid #ddd;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.form-container h2 {
    text-align: center;
    color: #E1937C;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

.form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

.button-group {
    display: flex;
    justify-content: center;
    gap: 10px;
}

button {
    background: #E1937C;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
}

button:hover {
    background: #45a049;
}

#add-item {
    margin-bottom: 15px;
    display: block;
    width: 100%;
    background: #2196F3;
}

#add-item:hover {
    background: #1976D2;
}

/* Invoice Styling */
.invoice-container {
    width: 90%;
    max-width: 800px;
    margin: 30px auto;
    background: #fff;
    padding: 20px;
    border: 1px solid #ddd;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.invoice-header {
    text-align: center;
    border-bottom: 2px solid #ddd;
    padding-bottom: 10px;
}

.invoice-header h1 {
    margin: 0;
    color: #E1937C;
}

.invoice-info {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.invoice-info div {
    width: 45%;
}

.invoice-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.invoice-table th, .invoice-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
}

.invoice-table th {
    background: #E1937C;
    color: white;
}

.invoice-summary {
    margin-top: 20px;
    text-align: right;
    font-weight: bold;
    font-size: 16px;
}

.invoice-footer {
    margin-top: 30px;
    border-top: 1px solid #ddd;
    padding-top: 10px;
    font-size: 14px;
    color: #555;
}

.invoice-footer ul {
    list-style-type: none;
    padding: 0;
}

.invoice-footer ul li {
    margin-bottom: 5px;
}
