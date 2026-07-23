/* ==========================================================================
   AS-SIDDIQ Travel Haji & Umroh - Main JavaScript Logic
   AOS Animation, Navbar Dynamic Scroll, Package Modal & Gallery Filtering
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  
  // 1. Initialize AOS (Animate On Scroll) - Disabled on screens < 992px to prevent mobile shaking
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 60,
      disable: function() {
        return window.innerWidth < 992;
      }
    });
  }

  // 2. Navbar Glassmorphic Blur on Scroll
  const navbar = document.querySelector(".navbar-assiddiq");
  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  // 3. Floating Scroll to Top Button Visibility
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (scrollTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    });

    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // 4. Swiper Testimonial Slider Init (If Swiper is present)
  if (typeof Swiper !== 'undefined' && document.querySelector('.testimonial-swiper')) {
    new Swiper('.testimonial-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 3 }
      }
    });
  }

  // 5. Dynamic Package Detail Modal Binding
  const packageDetailModal = document.getElementById('packageDetailModal');
  if (packageDetailModal) {
    packageDetailModal.addEventListener('show.bs.modal', function (event) {
      const button = event.relatedTarget;
      const card = button.closest('.package-card-premium') || button.closest('.package-card');
      
      if (!card) return;

      const name = card.getAttribute('data-name') || 'Paket Haji & Umroh';
      const price = card.getAttribute('data-price') || 'Hubungi Kami';
      const cardImgEl = card.querySelector('.package-card-header img') || card.querySelector('img');
      const img = card.getAttribute('data-img') || (cardImgEl ? cardImgEl.getAttribute('src') : 'assets/orangumroh.png');
      const duration = card.getAttribute('data-duration') || '9 Hari';
      const airline = card.getAttribute('data-airline') || 'Direct Flight';
      const makkah = card.getAttribute('data-makkah') || 'Hotel Bintang 5';
      const madinah = card.getAttribute('data-madinah') || 'Hotel Bintang 5';

      document.getElementById('modalPackageTitle').innerText = name;
      document.getElementById('modalPackagePrice').innerText = price;
      document.getElementById('modalPackageImg').setAttribute('src', img);
      document.getElementById('modalPackageDuration').innerText = duration;
      document.getElementById('modalPackageAirline').innerText = airline;
      document.getElementById('modalHotelMakkah').innerText = makkah;
      document.getElementById('modalHotelMadinah').innerText = madinah;

      const waText = encodeURIComponent(`Assalamu'alaikum CS AS-SIDDIQ, saya ingin mendaftar ${name} (Harga: ${price}). Mohon informasi jadwal dan ketersediaan seat.`);
      document.getElementById('modalWaLink').setAttribute('href', `https://wa.me/6281234567890?text=${waText}`);
    });
  }

  // 6. Gallery Filtering System (Clear Display Pajangan Model)
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item-wrapper');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            item.style.display = 'block';
            item.classList.remove('d-none');
          } else {
            item.style.display = 'none';
            item.classList.add('d-none');
          }
        });
      });
    });
  }

});
