'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const searchBtn = document.getElementById('searchBtn');
  const searchText = document.getElementById('searchText');
  const searchOverlay = document.getElementById('searchOverlay');
  const closeSearch = document.getElementById('closeSearch');
  const overlaySearchInput = document.getElementById('overlaySearchInput');

  searchBtn.addEventListener('click', function () {
    searchOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    overlaySearchInput.focus();
  });

  closeSearch.addEventListener('click', function () {
    searchOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });

  overlaySearchInput.addEventListener('input', function () {
    searchText.textContent = this.value;
    if (this.value.trim().length > 0) {
      searchBtn.style.backgroundColor = '#f8f9fa';
    } else {
      searchBtn.style.backgroundColor = '';
    }
  });

  const menuBtn = document.querySelector('.menu-btn');
  const menuOverlay = document.getElementById('menuOverlay');

  if (menuBtn && menuOverlay) {
    menuBtn.addEventListener('click', () => {
      menuOverlay.classList.toggle('active');
    });
  }

  const menuBtnMobileItem = document.querySelector('.menu-btn-mobile-item');
  const menuBtnMobile = document.querySelector('.menu-btn-mobile');
  const closeMenu = document.getElementById('closeMenu');
  const menuOverlayMobile = document.getElementById('menuOverlayMobile');
  const menuBtnsWrapper = document.querySelector('.menu-overlay__btns-wrapper');
  const menuBtns = document.querySelectorAll('.menu-overlay__btn');
  const menuCategories = document.querySelectorAll('.menu-overlay__category');

  let currentActiveItem = document.querySelector('.bottom-nav-item.active');

  menuBtnMobile.addEventListener('click', () => {
    currentActiveItem.classList.toggle('active');
    menuBtnMobileItem.classList.toggle('active');
    menuOverlayMobile.classList.toggle('active');
    document.body.classList.toggle('overflow-hidden');
  });

  closeMenu.addEventListener('click', function () {
    menuBtnMobileItem.classList.remove('active');
    currentActiveItem.classList.add('active');
    menuOverlayMobile.classList.remove('active');
    document.body.classList.remove('overflow-hidden');
  });

  if (menuBtnsWrapper) {
    menuBtnsWrapper.addEventListener('click', e => {
      const clickedBtn = e.target.closest('.menu-overlay__btn');
      if (!clickedBtn) return;

      menuBtns.forEach(btn => btn.classList.remove('active'));
      clickedBtn.classList.add('active');

      const targetId = clickedBtn.dataset.target;

      menuCategories.forEach(cat => {
        if (cat.id === targetId) {
          cat.classList.remove('d-none');
          cat.classList.add('d-flex');
        } else {
          cat.classList.add('d-none');
          cat.classList.remove('d-flex');
        }
      });
    });
  }

  const slides = document.querySelectorAll('.banner-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.banner-arrow-prev');
  const nextBtn = document.querySelector('.banner-arrow-next');

  let currentSlide = 0;
  let autoPlayInterval;
  const autoPlayDelay = 5000;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (index >= slides.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = index;
    }

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }
  function prevSlide() {
    showSlide(currentSlide - 1);
  }
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
  }
  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  nextBtn.addEventListener('click', function () {
    nextSlide();
  });
  prevBtn.addEventListener('click', function () {
    prevSlide();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', function () {
      showSlide(index);
    });
  });

  const sliderContainer = document.querySelector('.banner-slider-container');
  sliderContainer.addEventListener('mouseenter', stopAutoPlay);
  sliderContainer.addEventListener('mouseleave', startAutoPlay);

  startAutoPlay();

  let touchStartX = 0;
  let touchEndX = 0;

  sliderContainer.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoPlay();
  });

  sliderContainer.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) prevSlide();
    if (touchEndX > touchStartX + 50) nextSlide();
    startAutoPlay();
  });

  const categorySlider = document.querySelector('.category-slider');
  const catPrevBtn = document.querySelector('.category-arrow-prev');
  const catNextBtn = document.querySelector('.category-arrow-next');
  function getScrollAmount() {
    return window.innerWidth <= 991.98 ? 114 : 192;
  }

  function updateCategoryButtons() {
    const maxScroll = categorySlider.scrollWidth - categorySlider.clientWidth;
    const currentScroll = Math.abs(categorySlider.scrollLeft);

    if (currentScroll < 5) {
      catPrevBtn.setAttribute('disabled', 'true');
      catNextBtn.removeAttribute('disabled');
    } else if (currentScroll >= maxScroll - 5) {
      catNextBtn.setAttribute('disabled', 'true');
      catPrevBtn.removeAttribute('disabled');
    } else {
      catPrevBtn.removeAttribute('disabled');
      catNextBtn.removeAttribute('disabled');
    }
  }

  categorySlider.addEventListener('scroll', updateCategoryButtons);

  updateCategoryButtons();

  catPrevBtn.addEventListener('click', () => {
    categorySlider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  });

  catNextBtn.addEventListener('click', () => {
    categorySlider.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  });

  let catAutoScrollInterval;

  function startCatAutoScroll() {
    catAutoScrollInterval = setInterval(() => {
      const maxScroll = categorySlider.scrollWidth - categorySlider.clientWidth;
      const currentScroll = Math.abs(categorySlider.scrollLeft);

      if (currentScroll >= maxScroll - 5) {
        categorySlider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        categorySlider.scrollBy({
          left: -getScrollAmount(),
          behavior: 'smooth',
        });
      }
    }, 3000);
  }

  function stopCatAutoScroll() {
    clearInterval(catAutoScrollInterval);
  }

  const categorySliderWrapper = document.querySelector(
    '.category-slider-wrapper',
  );
  categorySliderWrapper.addEventListener('mouseenter', stopCatAutoScroll);
  categorySliderWrapper.addEventListener('mouseleave', startCatAutoScroll);
  categorySliderWrapper.addEventListener('touchstart', stopCatAutoScroll);
  categorySliderWrapper.addEventListener('touchend', startCatAutoScroll);

  startCatAutoScroll();
});
