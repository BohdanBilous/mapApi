/*jshint esversion: 6 */
''
/* MODULE IMPORTS */
import {
  html,
  desktop,
  mobile,
  exists,
  animateSwitch
} from "../generic-helpers";

window.addEventListener("load", function () {


  let inputSearch = document.getElementById('serach-input-form');
  let searchForm = document.querySelector('.search-form');
  let clearInput = inputSearch.parentNode.querySelector('.clear-input');
  inputSearch.focus();
  clearInput.style.left = `${inputSearch.value.length*40+40}px`
  inputSearch.selectionStart = inputSearch.selectionEnd = inputSearch.value.length;
  (inputSearch.value.length === 0) && clearInput.classList.add('hide');


  clearInput.addEventListener('click', () => {
    inputSearch.value = "";
    inputSearch.focus();
    clearInput.classList.add('hide');
  })
  inputSearch.addEventListener('input', () => {
    let hiddenElement = document.querySelector('.hidden-width');
    (inputSearch.value.length === 0) ? clearInput.classList.add('hide'): clearInput.classList.remove('hide');
    hiddenElement.innerHTML = inputSearch.value;
    let hiddenElementWidth = hiddenElement.offsetWidth;
    clearInput.style.left = `${hiddenElementWidth + 15}px`;
  })





  searchForm.addEventListener('submit', (e) => {
    const data = e.target.querySelector('input').value;
    document.querySelector('.search-socket').classList.remove('search-find', 'search-not-find')
    if (data.length > 0) {
      document.querySelector('.search-socket').classList.add('search-find');
    } else {
      document.querySelector('.search-socket').classList.add('search-not-find');

    }
  })
  //search-find 
  // Seach Modal

  const searchOpen = document.querySelector(".search-switcher");
  const searchClose = document.querySelector(".search-close");
  const searchModal = document.querySelector(".search-modal");
  searchClose.addEventListener("click", () => {
    html.classList.remove("search-open");
    searchModal.classList.remove("open");
    animateSwitch(".search .fade-in", "off");
    animateSwitch(".search .move-from-right", "off");
  });
  searchOpen.addEventListener("click", () => {
    html.classList.add("search-open");
    searchModal.classList.add("open");
    animateSwitch(".search .fade-in", "on", 1, 800);
    animateSwitch(".search .move-from-right", "on", 65, 250);
  });


});