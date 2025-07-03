const produk = {
    semen: ["SEMEN TIGA RODA 50 KG", "SEMEN TONASA 50 KG", "SEMEN PUTIH JAGUAR 40 KG", "SB PEREKAT BATA RINGAN 40 KG"],
    besi: ["KAWAT 8 (DELAPAN)", "KAWAT 10 (SEPULUH)", "KAWAT 12 (DUA BELAS)","KAWAT 8.4 X 12","KAWAT 25 (DUA PULUH LIMA) ULIR","KAWAT 19 (SEMBILAN BELAS) ULIR","KAWAT 22 (DUA PULUH DUA) ULIR","KAWAT 13 (TIGA BELAS) ULIR","KAWAT 7.1 X 12","KAWAT 16 (ENAM BELAS)","KAWAT 16 (ENAM BELAS) ULIR","KAWAT 14 (EMPAT BELAS)","KAWAT 11.4 X 12","KAWAT 4.7 X 12","KAWAT 10 (SEPULUH) ULIR","KAWAT 6 (ENAM)"],
    bwg_kawatduri: ["BENDRAT PUTIH ROL (25 KG)", "BENDRAT PUTIH ROL (20 KG)", "BWG 12", "BWG 14", "BWG 16", "BWG 6", "BWG 8", "KAWAT DURI BIASA", "KAWAT DURI 100M (ANTI KARAT)","LIS KAYU 4X4","BENDRAT STIK 20 KG","BWG 10"],
    galvalum_bondex: ["GALVALUM KENCANA (0.25) 4 M","GALVALUM KENCANA (0.3) 4 M","GALVALUM KENCANA (0.35) 4 M","GALVALUM SOLID (0.3) 4 M"],
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
    let qtyLabel;

    // Menentukan qtyLabel berdasarkan nama produk
    if (namaProduk.includes("SEMEN")||namaProduk.includes("SB PEREKAT")) {
        qtyLabel = 'sak';
    } else if (namaProduk.includes("KAWAT") || namaProduk.includes("BESI") || namaProduk.includes("BENDRAT STIK 20 KG") || namaProduk.includes("LIS")) {
        qtyLabel = 'batang';
    } else if (namaProduk.includes("BENDRAT") || namaProduk.includes("BWG") || namaProduk.includes("KAWAT DURI")){
        qtyLabel = 'rol';
    } else if (namaProduk.includes("GALVALUM")) {
        qtyLabel = 'lembar';
    } else {
        qtyLabel = 'unit'; // Default untuk produk yang tidak terdaftar
    }

    const timestamp = new Date().toLocaleString();
    // Menampilkan hasil input di history
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
    const url = "https://script.google.com/macros/s/AKfycbyuXAKoGoeCr2T0sLCwpFwzDhokJwnY4jMimxiKo2g24TlH9yxitdBazAZk8hWpGyk4kg/exec"; // Ganti dengan URL Google Apps Script Anda
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
