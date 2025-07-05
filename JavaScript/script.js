// Menambahkan sebuah 'event listener' yang akan menjalankan semua kode di dalamnya
// hanya setelah seluruh konten halaman HTML (DOM) selesai dimuat.
// Ini adalah praktik terbaik untuk memastikan semua elemen HTML sudah ada saat script dijalankan.
document.addEventListener('DOMContentLoaded', () => {

    // --- Mengambil Elemen-elemen HTML ---
    // Mengambil elemen div atau section yang berisi form checkout.
    const checkoutFormSection = document.getElementById('checkoutFormSection');

    // Mengambil elemen div atau section yang akan menampilkan struk pembayaran.
    const receiptSection = document.getElementById('receiptSection');

    // Mengambil elemen form itu sendiri untuk menangani event 'submit'.
    const purchaseForm = document.getElementById('purchaseForm');

    // Mengambil elemen di mana detail struk akan dimasukkan secara dinamis.
    const receiptDetails = document.getElementById('receiptDetails');

    // Mengambil elemen input dropdown untuk pilihan produk.
    const productSelect = document.getElementById('productSelect');

    // Mengambil elemen input untuk jumlah (kuantitas) produk.
    const quantityInput = document.getElementById('quantity');

    // Mengambil elemen (misalnya <span> atau <p>) untuk menampilkan total harga.
    const totalPriceDisplay = document.getElementById('totalPriceDisplay');

    // Mengambil elemen input (kemungkinan tipe 'hidden') untuk menyimpan nama produk yang dipilih.
    const selectedProductNameInput = document.getElementById('selectedProductName');

    // Mengambil elemen input (kemungkinan tipe 'hidden') untuk menyimpan harga produk yang dipilih.
    const selectedProductPriceInput = document.getElementById('selectedProductPrice');

    // Mengambil elemen input (kemungkinan tipe 'hidden') untuk menyimpan total harga akhir.
    const finalTotalPriceInput = document.getElementById('finalTotalPrice');


    // --- Fungsi untuk Memperbarui Total Harga ---
    // Fungsi ini dipanggil setiap kali ada perubahan pada produk atau kuantitas.
    function updateTotalPrice() {

        // Mendapatkan nilai dari dropdown produk yang dipilih. Contoh: "Kopi_Susu_25000".
        const selectedValue = productSelect.value;

        // Mendapatkan nilai kuantitas, mengubahnya menjadi angka (integer). 
        // Jika input kosong atau tidak valid, nilai defaultnya adalah 1.
        const quantity = parseInt(quantityInput.value) || 1;

        // Mendeklarasikan variabel untuk menyimpan detail produk dan total harga.
        let productName = '';
        let productPrice = 0;
        let totalPrice = 0;

        // Memeriksa apakah ada produk yang dipilih (apakah `selectedValue` tidak kosong).
        if (selectedValue) {

            // Memecah nilai `selectedValue` berdasarkan karakter '_' menjadi array.
            const [namePart, pricePart] = selectedValue.split('_');

            // Mengganti karakter '_' dengan spasi pada nama produk agar mudah dibaca.
            productName = namePart.replace(/_/g, ' ');
            
            // Mengubah bagian harga dari teks (string) menjadi angka (integer).
            productPrice = parseInt(pricePart);

            // Menghitung total harga dengan mengalikan harga satuan dengan kuantitas.
            totalPrice = productPrice * quantity;
        }

        // Menampilkan total harga yang sudah diformat ke dalam mata uang Rupiah Indonesia.
        // `toLocaleString('id-ID')` akan menambahkan pemisah ribuan (titik).
        totalPriceDisplay.textContent = `Rp${totalPrice.toLocaleString('id-ID')},00`;

        // Menyimpan nilai-nilai yang sudah dihitung ke dalam input tersembunyi (hidden inputs).
        // Ini berguna agar data bisa dengan mudah diambil saat form disubmit.
        selectedProductNameInput.value = productName;
        selectedProductPriceInput.value = productPrice;
        finalTotalPriceInput.value = totalPrice;
    }

    // --- Event Listeners untuk Interaktivitas ---
    // Menjalankan fungsi `updateTotalPrice` setiap kali pengguna mengubah pilihan produk di dropdown.
    productSelect.addEventListener('change', updateTotalPrice);

    // Menjalankan fungsi `updateTotalPrice` setiap kali pengguna mengubah nilai di input kuantitas.
    quantityInput.addEventListener('input', updateTotalPrice);

    // Memanggil fungsi `updateTotalPrice` sekali saat halaman pertama kali dimuat.
    // Ini untuk menginisialisasi total harga berdasarkan nilai default yang ada.
    updateTotalPrice();


    // --- Logika Saat Form Disubmit ---
    // Menambahkan 'event listener' yang akan berjalan ketika tombol submit pada form ditekan.
    purchaseForm.addEventListener('submit', (event) => {

        // Mencegah perilaku default dari form submission, yaitu me-reload halaman.
        // Ini penting agar kita bisa menampilkan struk di halaman yang sama.
        event.preventDefault();

        // Memanggil `updateTotalPrice()` sekali lagi untuk memastikan data harga adalah yang paling final.
        updateTotalPrice();

        // --- Mengambil Data dari Input Form ---
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;

        // Mengambil data produk dan harga dari input tersembunyi yang sudah kita siapkan sebelumnya.
        const purchasedProductName = selectedProductNameInput.value;
        const purchasedProductPrice = parseInt(selectedProductPriceInput.value);
        const purchasedQuantity = parseInt(quantityInput.value);
        const finalTotalPayment = parseInt(finalTotalPriceInput.value);


        // --- Validasi Sederhana ---
        // Memeriksa apakah semua data yang diperlukan sudah diisi.
        if (!purchasedProductName || purchasedQuantity < 1 || !fullName || !email || !phone || !address) {
            
            // Jika ada data yang kosong, tampilkan pesan peringatan.
            alert('Harap isi semua kolom formulir dengan benar!');

            // Hentikan eksekusi fungsi lebih lanjut.
            return;
        }

        // --- Membuat dan Menampilkan Struk ---
        // Mengisi elemen `receiptDetails` dengan struktur HTML struk pembayaran.
        // Ini menggunakan 'template literal' (ditandai dengan backtick ``) yang memungkinkan
        // penyisipan variabel langsung ke dalam string dengan sintaks `${variabel}`.
        receiptDetails.innerHTML = `
            <h2 class="paymentRec">Payment Receipt</h2>
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
            <p class="ending">
                Thank you for purchasing at TIMING CAFE!
                <br> 
                Have a timely day!
                <br>
                Your timely treat will be delivered to your homely home soon.
            </p>
        `;

        // --- Mengubah Tampilan Halaman ---
        // Menyembunyikan bagian form checkout.
        checkoutFormSection.style.display = 'none';
        
        // Menampilkan bagian struk pembayaran yang tadinya tersembunyi.
        receiptSection.style.display = 'block';
    });
});