const produk = {
    semen: ["Semen Tiga Roda 50 KG", "Semen Tonasa 50 KG", "Semen Putih Jaguar 40 KG", "SB Perekat Bata Ringan 40 KG"],
    besi: ["Kawat 8", "Kawat 10", "Kawat 12"],
    bwg_kawatduri: ["Kawat 8", "Kawat 10", "Kawat 12"],
    galvalum_bondex: ["Kawat 8", "Kawat 10", "Kawat 12"],
    // Tambahkan produk baru di sini
};

function updateProduk() {
    const jenisProduk = document.getElementById("jenis-produk").value;
    const namaProdukSelect = document.getElementById("nama-produk");
    namaProdukSelect.innerHTML = '<option value="">-- Pilih Nama Produk --</option>';

    if (jenisProduk && produk[jenisProduk]) {
        produk[jenisProduk].forEach(item => {
            const option = document.createElement("option");
            option.value = item;
            option.textContent = item;
            namaProdukSelect.appendChild(option);
        });
    }
}

function submitData(tipe) {
    const jenisProduk = document.getElementById("jenis-produk").value;
    const namaProduk = document.getElementById("nama-produk").value;
    const jumlah = document.getElementById("jumlah").value;
    const checker = document.getElementById("checker").value;

    if (!jenisProduk || !namaProduk || !jumlah || !checker) {
        alert("Semua field harus diisi!");
        return;
    }

    const action = tipe === 'masuk' ? 'masuk' : 'keluar';
    const qtyLabel = jenisProduk === 'semen' ? 'sak' : 'batang';
    const timestamp = new Date().toLocaleString();
// menampilkan hasil input di history
    const historyDiv = document.getElementById("history");
    historyDiv.innerHTML += `<p>${timestamp} ${action} - ${namaProduk} ( ${jumlah} ${qtyLabel} ) oleh ${checker}</p>`;

    // Kirim data ke Google Sheets
    sendToGoogleSheets(jenisProduk, namaProduk, jumlah, checker, action);

    resetForm();
}

function resetForm() {
    document.getElementById("jenis-produk").value = "";
    document.getElementById("nama-produk").innerHTML = '<option value="">-- Pilih Nama Produk --</option>';
    document.getElementById("jumlah").value = "";
    document.getElementById("checker").value = "";
}

function sendToGoogleSheets(jenisProduk, namaProduk, jumlah, checker, action) {
    const url = "https://script.google.com/macros/library/d/1PkSUak-sNKDbI1iT93QtOs0bylUMvkaICfQPUT8Dr96N5EIjemTbaz4-/1https://script.google.com/macros/s/AKfycbxc0XaMSpT1pQWIGUqy9cedrnKGmeTGryFuMn7yxp8hiuM2XjTsSdNRTLMZJ6KQCBx2aA/exechttps://script.google.com/macros/s/AKfycbyUGeFfk5osWIs7tql9924OzgjN7jEZ6J6om3UXMMNuioWsdN1pblLshkV5AVUjkXe7ZQ/exec"; // Ganti dengan URL Google Apps Script Anda
    const data = {
        jenisProduk,
        namaProduk,
        jumlah,
        checker,
        action,
        timestamp: new Date().toISOString()
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log("Success:", data))
    .catch((error) => console.error("Error:", error));
}
