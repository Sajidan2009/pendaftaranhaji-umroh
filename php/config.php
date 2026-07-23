<?php
/**
 * AS-SIDDIQ Haji & Umroh Travel - Configuration File
 * File ini menyimpan konfigurasi global seperti koneksi database dan nomor WhatsApp tujuan.
 */

// Kredensial Database MySQL
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'as_siddiq_travel');

// Informasi Kontak Global
define('WHATSAPP_NUMBER', '6281234567890'); // Ganti dengan nomor WhatsApp tujuan Anda (format internasional, tanpa tanda '+')
define('COMPANY_NAME', 'AS-SIDDIQ Travel Haji & Umroh');
define('COMPANY_EMAIL', 'info@as-siddiq.com');
define('COMPANY_PHONE', '+62 812-3456-7890');
define('COMPANY_ADDRESS', 'Jl. Raya Islami No. 88, Jakarta Selatan, Indonesia');

// Mode Aplikasi (development / production)
define('APP_ENV', 'development');

if (APP_ENV === 'development') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}
