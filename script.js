"use strict";

const navButtons = document.querySelectorAll(".right-nav--btn");
const sections = document.querySelectorAll(".section");
const contactBtns = document.querySelectorAll(".secondary");
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

contactBtns[0].addEventListener("click", () => {
  sections.forEach((section) => {
    section.classList.add("hidden");
  });

  const activeSection = document.getElementById(`contact-${activeLang}`);
  activeSection.classList.remove("hidden");
  activeSection.classList.add("active");

  document
    .querySelector(".content")
    .insertAdjacentElement("afterbegin", activeSection); // ✅ Adăugat

  navButtons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.getAttribute("data-section") === "contact") {
      btn.classList.add("active");
    }
  });
});

contactBtns[1].addEventListener("click", () => {
  sections.forEach((section) => {
    section.classList.add("hidden");
  });

  const activeSection = document.getElementById(`contact-${activeLang}`);
  activeSection.classList.remove("hidden");
  activeSection.classList.add("active");

  document
    .querySelector(".content")
    .insertAdjacentElement("afterbegin", activeSection); // ✅ Adăugat

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

// Mobile optimizations
function isMobile() {
  return window.innerWidth <= 768;
}

// Touch event support for better mobile experience
function addTouchSupport() {
  const navBtns = document.querySelectorAll(".right-nav--btn");
  const contactButtons = document.querySelectorAll(".secondary");
  const links = document.querySelectorAll("a, .github-link, .demo-link");

  // Add touch feedback for navigation buttons
  navBtns.forEach((btn) => {
    btn.addEventListener("touchstart", function () {
      this.style.transform = "scale(0.95)";
    });

    btn.addEventListener("touchend", function () {
      this.style.transform = "scale(1)";
    });
  });

  // Add touch feedback for contact buttons
  contactButtons.forEach((btn) => {
    btn.addEventListener("touchstart", function () {
      this.style.transform = "scale(0.95)";
    });

    btn.addEventListener("touchend", function () {
      this.style.transform = "scale(1)";
    });
  });

  // Add touch feedback for links
  links.forEach((link) => {
    link.addEventListener("touchstart", function () {
      this.style.transform = "scale(0.95)";
    });

    link.addEventListener("touchend", function () {
      this.style.transform = "scale(1)";
    });
  });
}

// Optimize scrolling for mobile
function optimizeScrolling() {
  if (isMobile()) {
    // Prevent horizontal scrolling
    document.body.style.overflowX = "hidden";

    // Smooth scrolling for iOS
    document.documentElement.style.webkitOverflowScrolling = "touch";
  }
}

// Handle orientation change
function handleOrientationChange() {
  window.addEventListener("orientationchange", function () {
    // Small delay to ensure proper reflow
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  });
}

// Prevent zoom on double tap for iOS
function preventDoubleTabZoom() {
  let lastTouchEnd = 0;
  document.addEventListener(
    "touchend",
    function (event) {
      const now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    },
    false
  );
}

// Performance optimizations for mobile
function optimizePerformance() {
  // Lazy load images on mobile
  if (isMobile()) {
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      if (
        !img.src.includes("avatar") &&
        !img.src.includes("linkedin") &&
        !img.src.includes("github")
      ) {
        img.loading = "lazy";
      }
    });
  }

  // Debounce scroll events
  let scrollTimeout;
  window.addEventListener("scroll", function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function () {
      // Handle scroll optimizations here if needed
    }, 100);
  });

  // Optimize animations for mobile
  if (isMobile()) {
    // Reduce animations on mobile for better performance
    const style = document.createElement("style");
    style.textContent = `
      @media (max-width: 768px) {
        *, *::before, *::after {
          animation-duration: 0.3s !important;
          transition-duration: 0.3s !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Handle network connectivity
function handleNetworkOptimizations() {
  // Check if we're on a slow connection
  if ("connection" in navigator) {
    const connection = navigator.connection;
    if (
      connection.effectiveType === "slow-2g" ||
      connection.effectiveType === "2g"
    ) {
      // Disable some heavy animations on slow connections
      document.body.classList.add("slow-connection");
    }
  }
}

// Keyboard navigation support for accessibility
function addKeyboardNavigation() {
  document.addEventListener("keydown", function (e) {
    const navButtons = document.querySelectorAll(".right-nav--btn");
    const activeButton = document.querySelector(".right-nav--btn.active");

    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();

      const currentIndex = Array.from(navButtons).indexOf(activeButton);
      let nextIndex;

      if (e.key === "ArrowLeft") {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : navButtons.length - 1;
      } else {
        nextIndex = currentIndex < navButtons.length - 1 ? currentIndex + 1 : 0;
      }

      navButtons[nextIndex].click();
      navButtons[nextIndex].focus();
    }
  });
}

// Safe area support for iPhone X and newer
function handleSafeArea() {
  if (isMobile()) {
    // Add padding for safe areas on newer iPhones
    const style = document.createElement("style");
    style.textContent = `
      @supports (padding: max(0px)) {
        .content {
          padding-left: max(1rem, env(safe-area-inset-left));
          padding-right: max(1rem, env(safe-area-inset-right));
        }
        
        .right-nav {
          bottom: max(1rem, env(safe-area-inset-bottom));
        }
        
        .sidebar {
          padding-top: max(1rem, env(safe-area-inset-top));
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Update the initialization function
function initMobileOptimizations() {
  addTouchSupport();
  optimizeScrolling();
  handleOrientationChange();
  preventDoubleTabZoom();
  optimizePerformance();
  handleNetworkOptimizations();
  addKeyboardNavigation();
  handleSafeArea();

  // Update navigation position for mobile
  if (isMobile()) {
    const rightNav = document.querySelector(".right-nav");
    if (rightNav) {
      rightNav.style.position = "fixed";
      rightNav.style.bottom = "1rem";
      rightNav.style.left = "50%";
      rightNav.style.transform = "translateX(-50%)";
      rightNav.style.top = "auto";
      rightNav.style.right = "auto";
    }
  }
}

// Handle resize events
function handleResize() {
  window.addEventListener("resize", function () {
    // Update mobile optimizations on resize
    setTimeout(() => {
      initMobileOptimizations();
    }, 100);
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initMobileOptimizations();
  handleResize();
});

// Also run on window load for safety
window.addEventListener("load", function () {
  initMobileOptimizations();
});
