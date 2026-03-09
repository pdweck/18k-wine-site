/**
 * 18K Wine - Main JavaScript
 * Carousel, navigation, animations
 */

(function () {
  'use strict';

  // Product images: tenta images/produtos/ primeiro, depois fallback
  function initProductImageFallback(selector) {
    document.querySelectorAll(selector).forEach(function (img) {
    var product = img.getAttribute('data-product') || img.getAttribute('data-product-mini');
    var fallback = img.getAttribute('data-fallback');
    var extensions = ['png', 'jpeg', 'webp'];
    var tried = 0;

    function tryNext() {
      if (tried >= extensions.length && fallback) {
        img.src = fallback;
        return;
      }
      if (tried < extensions.length) {
        img.src = 'images/produtos/' + product + '.' + extensions[tried];
        tried++;
      }
    }

    img.onerror = tryNext;
    });
  }
  initProductImageFallback('img[data-product]');
  initProductImageFallback('img[data-product-mini]');

  // Branding images: tenta imagens locais (jpg, png...), depois fallback
  document.querySelectorAll('img[data-branding]').forEach(function (img) {
    var branding = img.getAttribute('data-branding');
    var fallback = img.getAttribute('data-fallback');
    var extensions = ['jpg', 'png', 'webp']; // jpeg já é o src inicial no HTML
    var tried = 0;

    function tryNext() {
      if (tried >= extensions.length) {
        if (fallback) img.src = fallback;
        return;
      }
      img.src = 'images/branding/' + branding + '.' + extensions[tried];
      tried++;
    }

    img.onerror = tryNext;
  });

  // Galeria de branding (manifest.json)
  var gallery = document.getElementById('branding-gallery');
  if (gallery) {
    fetch('images/branding/manifest.json')
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (files) {
        if (files.length === 0) {
          gallery.closest('.branding-gallery').style.display = 'none';
          return;
        }
        files.forEach(function (file) {
          var a = document.createElement('a');
          a.href = 'images/branding/' + file;
          a.setAttribute('target', '_blank');
          var img = document.createElement('img');
          img.src = 'images/branding/' + file;
          img.alt = 'Imagem do branding 18K Wine';
          a.appendChild(img);
          gallery.appendChild(a);
        });
      })
      .catch(function () {
        gallery.closest('.branding-gallery').style.display = 'none';
      });
  }

  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu on escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Initialize Hero Swiper (only on index page)
  window.initHeroSwiper = function () {
    if (typeof Swiper === 'undefined') return;

    const heroSwiper = document.querySelector('.hero-swiper');
    if (!heroSwiper) return;

    new Swiper('.hero-swiper', {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      effect: 'slide',
      speed: 600,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        320: {
          slidesPerView: 1
        },
        768: {
          slidesPerView: 1
        }
      }
    });
  };

  // Header scroll effect - add shadow on scroll
  const header = document.querySelector('.header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
      } else {
        header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
      }
      lastScroll = currentScroll;
    });
  }

  // Fade-in animation for sections on scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section, .product-detail, .welcome-grid, .products-intro').forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  // Add animate-in class styles via JS (backup for CSS)
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // Back to top button
  var backBtn = document.createElement('button');
  backBtn.className = 'back-to-top';
  backBtn.setAttribute('aria-label', 'Voltar ao topo');
  backBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>';
  document.body.appendChild(backBtn);

  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 400) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  });

  backBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

})();
