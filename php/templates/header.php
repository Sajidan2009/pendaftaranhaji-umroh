<?php
/**
 * AS-SIDDIQ Haji & Umroh Travel - Reusable Header Template
 * Gunakan file ini jika Anda merubah file .html menjadi .php dinamis.
 * Contoh penggunaan: <?php include 'php/templates/header.php'; ?>
 */
require_once __DIR__ . '/../config.php';

// Menentukan halaman aktif untuk class indicator navbar
$current_page = basename($_SERVER['PHP_SELF']);
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo isset($page_title) ? $page_title . " - " . COMPANY_NAME : COMPANY_NAME; ?></title>
  <meta name="description" content="Perjalanan Haji dan Umroh Aman, Nyaman, Profesional, dan Terpercaya bersama <?php echo COMPANY_NAME; ?>.">
  
  <!-- SEO & Open Graph Metatags -->
  <meta property="og:title" content="<?php echo isset($page_title) ? $page_title : COMPANY_NAME; ?>">
  <meta property="og:description" content="Melayani perjalanan ibadah Haji & Umroh dengan bimbingan sesuai Sunnah, fasilitas bintang lima, dan pelayanan profesional.">
  <meta property="og:type" content="website">
  
  <!-- CSS Stylesheet -->
  <link rel="stylesheet" href="css/style.css">
  
  <!-- FontAwesome Icons for modern aesthetic -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>

  <!-- 1. Opening Animation (Hanya tampil pada kunjungan pertama sesi browser) -->
  <div class="opening-overlay">
    <div class="opening-logo-container">
      <img src="assets/logo-horizontal.png" alt="AS-SIDDIQ Logo" class="opening-logo">
      <div class="opening-spinner"></div>
    </div>
  </div>

  <!-- 2. Sticky Navbar -->
  <header class="header">
    <div class="container navbar-container">
      <a href="index.html" class="logo-link">
        <img src="assets/logo-horizontal.png" alt="<?php echo COMPANY_NAME; ?>" class="logo-img">
      </a>
      
      <!-- Nav Menu Grid -->
      <nav class="nav-menu" id="navMenu">
        <a href="index.html" class="nav-link <?php echo ($current_page == 'index.php' || $current_page == 'index.html' || $current_page == '') ? 'active' : ''; ?>">Beranda</a>
        <a href="tentang.html" class="nav-link <?php echo ($current_page == 'tentang.php' || $current_page == 'tentang.html') ? 'active' : ''; ?>">Tentang Kami</a>
        <a href="paket.html" class="nav-link <?php echo ($current_page == 'paket.php' || $current_page == 'paket.html' || $current_page == 'detail-paket.html') ? 'active' : ''; ?>">Paket Haji & Umroh</a>
        <a href="galeri.html" class="nav-link <?php echo ($current_page == 'galeri.php' || $current_page == 'galeri.html') ? 'active' : ''; ?>">Galeri</a>
        <a href="artikel.html" class="nav-link <?php echo ($current_page == 'artikel.php' || $current_page == 'artikel.html' || $current_page == 'detail-artikel.html') ? 'active' : ''; ?>">Artikel</a>
      </nav>
      
      <!-- Hamburger Menu for mobile -->
      <button class="nav-toggle" aria-label="Toggle Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
