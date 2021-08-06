"use strict";

const mainNav = document.getElementById("js-menu");
const navBarToggle = document.getElementById("js-navbar-toggle");

function handleWindowResize() {
  if (window.innerWidth > 768) {
    mainNav.classList.remove("active");
  }
}

/******display toggle menu*******/
navBarToggle.addEventListener("click", function () {
  mainNav.classList.toggle("active");
});

window.addEventListener("resize", handleWindowResize);
