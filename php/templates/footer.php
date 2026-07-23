<?php
/**
 * AS-SIDDIQ Haji & Umroh Travel - Reusable Footer Template
 * Gunakan file ini jika Anda merubah file .html menjadi .php dinamis.
 * Contoh penggunaan: <?php include 'php/templates/footer.php'; ?>
 */
require_once __DIR__ . '/../config.php';
?>
  <!-- Footer Section -->
  <footer class="footer">
    <div class="container footer-top">
      <!-- Info Perusahaan -->
      <div class="footer-info">
        <a href="index.html" class="footer-logo-link">
          <img src="assets/logo-horizontal.png" alt="AS-SIDDIQ Logo" class="footer-logo">
        </a>
        <p class="footer-desc">
          AS-SIDDIQ merupakan perusahaan penyelenggara perjalanan ibadah Haji & Umroh resmi terpercaya. Berkomitmen tinggi melayani tamu Allah dengan sepenuh hati.
        </p>
        <div class="footer-socials">
          <a href="#" class="footer-social-icon" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="footer-social-icon" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="#" class="footer-social-icon" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
          <a href="#" class="footer-social-icon" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
        </div>
      </div>
      
      <!-- Menu Cepat -->
      <div class="footer-menu">
        <h3 class="footer-title">Menu Cepat</h3>
        <ul class="footer-links">
          <li><a href="index.html" class="footer-link"><i class="fas fa-chevron-right"></i> Beranda</a></li>
          <li><a href="tentang.html" class="footer-link"><i class="fas fa-chevron-right"></i> Tentang Kami</a></li>
          <li><a href="paket.html" class="footer-link"><i class="fas fa-chevron-right"></i> Paket Haji & Umroh</a></li>
          <li><a href="galeri.html" class="footer-link"><i class="fas fa-chevron-right"></i> Galeri Kegiatan</a></li>
          <li><a href="artikel.html" class="footer-link"><i class="fas fa-chevron-right"></i> Artikel & Berita</a></li>
        </ul>
      </div>
      
      <!-- Informasi Hubungi Kami & Legalitas -->
      <div class="footer-contact">
        <h3 class="footer-title">Informasi & Kantor</h3>
        <ul class="footer-links" style="gap: 1.2rem;">
          <li style="display: flex; gap: 0.75rem; font-size: 0.9rem;">
            <i class="fas fa-map-marker-alt" style="color: var(--accent-gold); margin-top: 3px; font-size: 0.95rem;"></i>
            <span><?php echo COMPANY_ADDRESS; ?></span>
          </li>
          <li style="display: flex; gap: 0.75rem; font-size: 0.9rem;">
            <i class="fas fa-phone-alt" style="color: var(--accent-gold); margin-top: 3px; font-size: 0.95rem;"></i>
            <span><?php echo COMPANY_PHONE; ?></span>
          </li>
          <li style="display: flex; gap: 0.75rem; font-size: 0.9rem;">
            <i class="fas fa-envelope" style="color: var(--accent-gold); margin-top: 3px; font-size: 0.95rem;"></i>
            <span><?php echo COMPANY_EMAIL; ?></span>
          </li>
        </ul>
      </div>
      
      <!-- Google Maps Integration -->
      <div class="footer-map">
        <h3 class="footer-title">Lokasi Kami</h3>
        <div class="footer-map-container">
          <!-- Google Maps Embed Placeholder -->
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126907.08375630248!2d106.71967527653772!3d-6.284146914561005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1ec24227c3b%3A0xbc2b7c6c3905cf52!2sJakarta%20Selatan%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1689849503482!5m2!1sid!2sid" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </div>
    
    <div class="container footer-bottom">
      <p>&copy; <?php echo date('Y'); ?> <?php echo COMPANY_NAME; ?>. All Rights Reserved. Designed for Premium Service.</p>
      <p>Izin Umroh No: U.384 Tahun 2026 | Izin PIHK No: H.188 Tahun 2026</p>
    </div>
  </footer>

  <!-- Lightbox Gallery Skeleton Modal -->
  <div class="lightbox-modal">
    <span class="lightbox-close">&times;</span>
    <div class="lightbox-content">
      <img src="" alt="" class="lightbox-img">
      <div class="lightbox-caption"></div>
    </div>
  </div>

  <!-- JavaScript file -->
  <script src="js/main.js"></script>
</body>
</html>
