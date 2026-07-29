/**
 * AS-SIDDIQ Haji & Umroh Travel - Main Javascript
 * Mengontrol Animasi Opening, Sticky Navbar, Scroll Reveal, Lightbox Gallery, Accordion Itinerary, Ripple Effect, & Integrasi WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  // Jalankan inisialisasi utama
  initOpeningAnimation();
  initStickyNavbar();
  initMobileMenu();
  initScrollReveal();
  initButtonRipple();
  initItineraryAccordion();
  initLightboxGallery();
  initWhatsAppBooking();
  initPackageFilter();
});

/* ==========================================================================
   1. Opening Splash Screen Animation
   ========================================================================== */
function initOpeningAnimation() {
  const overlay = document.querySelector('.opening-overlay');
  if (!overlay) return;

  // Optimasi UX: Hanya tampilkan opening animation satu kali per sesi browser
  const hasVisited = sessionStorage.getItem('as_siddiq_visited');

  if (hasVisited) {
    // Jika user sudah berkunjung di sesi ini, langsung hilangkan overlay tanpa delay
    overlay.style.display = 'none';
  } else {
    // Jalankan animasi 2.5 detik
    setTimeout(() => {
      overlay.classList.add('slide-out');
      sessionStorage.setItem('as_siddiq_visited', 'true');
      
      // Hapus dari DOM setelah animasi selesai agar tidak menghalangi interaksi
      setTimeout(() => {
        overlay.remove();
      }, 1200);
    }, 2500);
  }
}

/* ==========================================================================
   2. Sticky & Shrink Navbar on Scroll
   ========================================================================== */
function initStickyNavbar() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Jalankan saat load pertama kali untuk mengantisipasi jika page direfresh di posisi tengah
  handleScroll();
  window.addEventListener('scroll', handleScroll);
}

/* ==========================================================================
   3. Mobile Navigation Menu Toggle
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  // Toggle menu saat hamburger di-klik
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('active');
  });

  // Tutup menu saat menklik link navigasi
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });

  // Tutup menu jika user mengklik area di luar menu
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      navMenu.classList.remove('active');
    }
  });
}

/* ==========================================================================
   4. Scroll Reveal (Intersection Observer)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null, // viewport
      threshold: 0.15, // elemen 15% terlihat baru memicu animasi
      rootMargin: '0px 0px -50px 0px' // offset pemicu bawah
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Hapus observer setelah elemen terungkap (satu kali animasi)
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback untuk browser jadul
    revealElements.forEach(el => el.classList.add('active'));
  }
}

/* ==========================================================================
   5. Button Ripple Click Effect (Micro-interaction)
   ========================================================================== */
function initButtonRipple() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Hilangkan ripple lama jika ada
      const existingRipple = this.querySelector('.btn-ripple');
      if (existingRipple) {
        existingRipple.remove();
      }

      const ripple = document.createElement('span');
      ripple.classList.add('btn-ripple');
      
      // Dapatkan koordinat klik relatif terhadap tombol
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      // Bersihkan ripple dari DOM setelah selesai animasi
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

/* ==========================================================================
   6. Itinerary Accordion (detail-paket.html)
   ========================================================================== */
function initItineraryAccordion() {
  const accordionHeaders = document.querySelectorAll('.itinerary-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const parent = this.parentElement;
      const isActive = parent.classList.contains('active');
      
      // Tutup semua accordion item aktif lainnya
      const activeItems = document.querySelectorAll('.itinerary-item.active');
      activeItems.forEach(item => {
        if (item !== parent) {
          item.classList.remove('active');
          item.querySelector('.itinerary-content').style.maxHeight = null;
        }
      });

      // Toggle item yang di-klik
      parent.classList.toggle('active');
      const content = parent.querySelector('.itinerary-content');
      
      if (!isActive) {
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = null;
      }
    });
  });
}

/* ==========================================================================
   7. Lightbox Gallery Preview (galeri.html)
   ========================================================================== */
function initLightboxGallery() {
  const galleryItems = document.querySelectorAll('[data-lightbox]');
  const lightboxModal = document.querySelector('.lightbox-modal');
  
  if (!lightboxModal) return;

  const lightboxImg = lightboxModal.querySelector('.lightbox-img');
  const lightboxCaption = lightboxModal.querySelector('.lightbox-caption');
  const lightboxClose = lightboxModal.querySelector('.lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      const imgSrc = this.getAttribute('href') || this.querySelector('img').getAttribute('src');
      const caption = this.getAttribute('data-caption') || this.querySelector('img').getAttribute('alt') || '';

      lightboxImg.setAttribute('src', imgSrc);
      lightboxCaption.textContent = caption;
      
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Kunci scroll halaman belakang
    });
  });

  // Tutup lightbox
  const closeLightbox = () => {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = ''; // Aktifkan kembali scroll
    setTimeout(() => {
      lightboxImg.setAttribute('src', '');
      lightboxCaption.textContent = '';
    }, 300);
  };

  lightboxClose.addEventListener('click', closeLightbox);
  
  // Tutup jika mengklik area hitam / luar gambar
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  // Keyboard support (Escape untuk menutup)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* ==========================================================================
   8. WhatsApp Direct Booking Integration
   ========================================================================== */
function initWhatsAppBooking() {
  const bookingButtons = document.querySelectorAll('[data-wa-booking]');
  
  bookingButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      
      const waNumber = '6281234567890'; // Nomor admin default (format intl)
      const packageName = this.getAttribute('data-package-name') || 'Paket Haji/Umroh';
      const packagePrice = this.getAttribute('data-package-price') || 'Hubungi Kami';
      const packageDate = this.getAttribute('data-package-date') || '-';

      // Template pesan otomatis WhatsApp
      const rawMessage = `Halo AS-SIDDIQ Travel,

Saya tertarik untuk melakukan pemesanan paket perjalanan berikut:
📌 *Nama Paket:* ${packageName}
💰 *Harga Paket:* ${packagePrice}
📅 *Estimasi Keberangkatan:* ${packageDate}

Mohon informasi ketersediaan kuota dan langkah pemesanan selanjutnya. Terima kasih.`;

      const encodedMessage = encodeURIComponent(rawMessage);
      const waUrl = `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodedMessage}`;
      
      // Buka link WhatsApp di tab baru
      window.open(waUrl, '_blank');
    });
  });
}

/* ==========================================================================
   9. Package List Filter (paket.html)
   ========================================================================== */
function initPackageFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const packageCards = document.querySelectorAll('.packages-grid .package-card');

  if (filterButtons.length === 0 || packageCards.length === 0) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      // Toggle class aktif pada tombol filter
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');

      packageCards.forEach(card => {
        // Efek transisi mengecil lalu menghilang/muncul
        card.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
        
        if (filterValue === 'all') {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          const category = card.getAttribute('data-category');
          if (category === filterValue) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 400);
          }
        }
      });
    });
  });
}
