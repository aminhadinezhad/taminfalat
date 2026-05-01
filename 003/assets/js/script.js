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
});
