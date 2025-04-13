"use strict";

const navButtons = document.querySelectorAll(".right-nav--btn");
const sections = document.querySelectorAll(".section");
const contactBtn = document.querySelector(".secondary");
const langBtns = document.querySelectorAll(".lang-btn");
let activeLang = "ro";

document.getElementById("about-ro").classList.add("active");

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("active")) return;

    sections.forEach((section) => {
      section.classList.add("hidden");
    });

    const sectionId = `${button.getAttribute("data-section")}-${activeLang}`;
    const activeSection = document.getElementById(sectionId);
    activeSection.classList.add("active");

    activeSection.classList.remove("hidden");
    document
      .querySelector(".content")
      .insertAdjacentElement("afterbegin", activeSection);

    navButtons.forEach((btn) => {
      btn.classList.remove("active");
    });
    button.classList.add("active");
  });
});

contactBtn.addEventListener("click", () => {
  sections.forEach((section) => {
    section.classList.add("hidden");
  });

  const activeSection = document.getElementById(`contact-${activeLang}`);
  activeSection.classList.remove("hidden");

  activeSection.classList.add("active");

  navButtons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.getAttribute("data-section") === "contact") {
      btn.classList.add("active");
    }
  });
});

langBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) return;

    langBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    btn.classList.add("active");

    activeLang = btn.getAttribute("data-lang");

    const activeSection = document.querySelector(".section.active");
    const sectionId = `${
      activeSection.getAttribute("id").split("-")[0]
    }-${activeLang}`;
    activeSection.classList.remove("active");
    activeSection.classList.add("hidden");
    const newActiveSection = document.getElementById(sectionId);
    document
      .querySelector(".content")
      .insertAdjacentElement("afterbegin", newActiveSection);
    newActiveSection.classList.remove("hidden");
    newActiveSection.classList.add("active");
  });
});
