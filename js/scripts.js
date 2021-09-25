"use strict";

const mainNav = document.getElementById("js-menu");
const navBarToggle = document.getElementById("js-navbar-toggle");

function handleWindowResize() {
  if (window.innerWidth > 768) {
    mainNav.classList.remove("active");
  }
}

/******display toggle menu navbar*******/
navBarToggle.addEventListener("click", function () {
  mainNav.classList.toggle("active");
});

window.addEventListener("resize", handleWindowResize);

/******display toggle menu order*******/
const acc = document.getElementsByClassName("order-accordion");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    const panel = this.nextElementSibling;

    if (panel.style.display === "flex") {
      panel.style.display = "none";
    } else {
      panel.style.display = "flex";
    }
  });
}

const menus = document.getElementsByClassName("menu-title");
const orderPanel = document.getElementsByClassName("order-panel");
let m;

for (let x = 0; x < menus.length; x++) {
  menus[x].addEventListener("click", function (e) {
    if (e.target.dataset.index) {
      m = e.target.dataset.index;
    } else {
      m = e.target.parentElement.dataset.index;
    }

    for (let z = 0; z < orderPanel.length; z++) {
      if (z === parseInt(m)) {
        if (orderPanel[z].style.display === "flex") {
          orderPanel[z].style.display = "none";
        } else {
          orderPanel[z].style.display = "flex";
        }
      }
    }
  });
}

/*********save choices and display in summary*********/
let options = {};
let price;
let summaryText;
const summaryBtn = document.getElementById("summary");

function showSummary() {
  document.getElementById("summary-text").innerHTML = `"I drink my coffe as <span id="options">${
    options.radio1 ?? "_______"
  }</span> with a <span id="options">${options.radio2 ?? "_______"}</span> type of bean. <span id="options">${
    options.radio3 ?? "_______"
  }</span> ground ala <span id="options">${options.radio4 ?? "_______"}</span>, sent to me <span id="options">${
    options.radio5 ?? "_______"
  }</span>."`;
}

function saveSummary() {
  summaryText = `"I drink my coffe as <span id="options">${
    options.radio1 ?? "_______"
  }</span> with a <span id="options">${options.radio2 ?? "_______"}</span> type of bean. <span id="options">${
    options.radio3 ?? "_______"
  }</span> ground ala <span id="options">${options.radio4 ?? "_______"}</span>, sent to me <span id="options">${
    options.radio5 ?? "_______"
  }</span>."`;
}

function disableBtn() {
  summaryBtn.disabled = true;
}

function enableBtn() {
  summaryBtn.disabled = false;
}

showSummary();
disableBtn();

for (let y = 0; y < orderPanel.length; y++) {
  orderPanel[y].addEventListener("click", function (e) {
    if (e.target.type === "radio" && e.target.name && e.target.value) {
      const radioName = e.target.name;
      const radioValue = e.target.value;

      if (e.target.dataset.price) {
        price = e.target.dataset.price;
      }

      options[radioName] = radioValue;

      showSummary();
      saveSummary();

      if (options.radio1 && options.radio2 && options.radio3 && options.radio4 && options.radio5 !== undefined) {
        enableBtn();
      } else {
        disableBtn();
      }
    }
  });
}

/*********overlay summary*********/

const overlaySummary = document.querySelector(".overlay-summary");
const overlayContainer = document.querySelector(".overlay-container");

summaryBtn.addEventListener("click", function () {
  overlaySummary.classList.remove("hidden");
  overlayContainer.classList.remove("hidden");

  checkoutBtn();

  document.getElementById("summary-overlay-text").innerHTML = summaryText;
  document.getElementById("checkout-desktop-price").innerHTML = `${price} / mo`;
});

function checkoutBtn() {
  document.getElementById("checkout").innerHTML = `Checkout - ${price} / mo`;
}
