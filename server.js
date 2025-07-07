// Import modul yang dibutuhkan
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Gunakan port dari environment variable (Heroku) atau default 3000
const PORT = process.env.PORT || 3000;

// Aktifkan CORS agar frontend bisa akses proxy tanpa masalah
app.use(cors());

// Middleware untuk parsing JSON body dari request
app.use(express.json());

// URL Google Apps Script Web App Anda (ganti dengan URL asli)
const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwHAcPYF1gaYK2u6oiCDmMfuYZ_JIJ0QskwFQ91DmIR7YScSTFVvl93v35YYS6DnZDndQ/exec'; // Ganti dengan URL Anda

// Endpoint proxy untuk meneruskan request dari frontend ke Google Apps Script
app.post('/proxy', async (req, res) => {
  try {
    const data = req.body;

    // Kirim POST request ke Google Apps Script dengan data yang diterima
    const response = await axios.post(GAS_WEB_APP_URL, data, {
      headers: { 'Content-Type': 'application/json' }
    });

    // Kirim response dari Google Apps Script kembali ke frontend
    res.status(response.status).json(response.data);

  } catch (error) {
    console.error('Error saat meneruskan ke Google Apps Script:', error.message);
    res.status(500).json({ result: 'error', message: error.message });
  }
});

// Jalankan server proxy
app.listen(PORT, () => {
  console.log(`Server proxy berjalan di http://localhost:${PORT}`);
});
