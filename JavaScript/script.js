document.addEventListener('DOMContentLoaded', () => {
    const checkoutFormSection = document.getElementById('checkoutFormSection');
    const receiptSection = document.getElementById('receiptSection');
    const purchaseForm = document.getElementById('purchaseForm');
    const receiptDetails = document.getElementById('receiptDetails');

    const productSelect = document.getElementById('productSelect');
    const quantityInput = document.getElementById('quantity');
    const totalPriceDisplay = document.getElementById('totalPriceDisplay');

    const selectedProductNameInput = document.getElementById('selectedProductName');
    const selectedProductPriceInput = document.getElementById('selectedProductPrice');
    const finalTotalPriceInput = document.getElementById('finalTotalPrice');



    function updateTotalPrice() {
        const selectedValue = productSelect.value;
        const quantity = parseInt(quantityInput.value) || 1;

        let productName = '';
        let productPrice = 0;
        let totalPrice = 0;

        if (selectedValue) {
            const [namePart, pricePart] = selectedValue.split('_');
            productName = namePart.replace(/_/g, ' ');
            productPrice = parseInt(pricePart);
            totalPrice = productPrice * quantity;
        }

        totalPriceDisplay.textContent = `Rp${totalPrice.toLocaleString('id-ID')},00`;

        selectedProductNameInput.value = productName;
        selectedProductPriceInput.value = productPrice;
        finalTotalPriceInput.value = totalPrice;
    }

    productSelect.addEventListener('change', updateTotalPrice);
    quantityInput.addEventListener('input', updateTotalPrice);

    updateTotalPrice();


    purchaseForm.addEventListener('submit', (event) => {
        event.preventDefault();

        updateTotalPrice();

        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;

        const purchasedProductName = selectedProductNameInput.value;
        const purchasedProductPrice = parseInt(selectedProductPriceInput.value);
        const purchasedQuantity = parseInt(quantityInput.value);
        const finalTotalPayment = parseInt(finalTotalPriceInput.value); 


        if (!purchasedProductName || purchasedQuantity < 1 || !fullName || !email || !phone || !address) {
            alert('Please fill the form and all quantities are valid!.')
            return;
        }

        receiptDetails.innerHTML = `
            <h3 class="headingDetail">Detail Pembeli:</h3>
            <table class="receipt-table">
                <tr>
                    <td class="leftPembeli"><strong>Nama Lengkap:</strong></td>
                    <td class="rightPembeli">${fullName}</td>
                </tr>
                <tr>
                    <td class="leftPembeli"><strong>Email:</strong></td>
                    <td class="rightPembeli">${email}</td>
                </tr>
                <tr>
                    <td class="leftPembeli"><strong>Nomor Telepon:</strong></td>
                    <td class="rightPembeli">${phone}</td>
                </tr>
                <tr>
                    <td class="leftPembeli"><strong>Alamat Pengiriman:</strong></td>
                    <td class="rightPembeli">${address}</td>
                </tr>
            </table>

            <h3 class="headingDetail">Detail Pesanan:</h3>
            <table class="receipt-table">
                <thead>
                    <tr>
                        <th>Produk</th>
                        <th>Harga Satuan</th>
                        <th>Jumlah</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${purchasedProductName}</td>
                        <td>Rp${purchasedProductPrice.toLocaleString('id-ID')},00</td>
                        <td>${purchasedQuantity}</td>
                        <td>Rp${(purchasedProductPrice * purchasedQuantity).toLocaleString('id-ID')},00</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3" style="text-align:right;"><strong>Total Pembayaran:</strong></td>
                        <td><strong>Rp${finalTotalPayment.toLocaleString('id-ID')},00</strong></td>
                    </tr>
                </tfoot>
            </table>
            <br>
            <p class="ending">Thank you for purchasing at TIMING CAFE! Have a timely day!</p>
        `;

    
        checkoutFormSection.style.display = 'none';
        receiptSection.style.display = 'block';
    });

});