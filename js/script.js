// Shadow of navbar on scroll
document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    
  });
});


// Selection of section links
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 70; // Adjust offset for fixed navbar height
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});


// Animate progress bar
document.addEventListener("DOMContentLoaded", () => {
  const skillsSection = document.querySelector("#skills");
  const skillFills = document.querySelectorAll(".skill-fill");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillFills.forEach(fill => {
          const width = fill.getAttribute("data-width");
          fill.style.width = width;
        });
        observer.unobserve(skillsSection); // run once
      }
    });
  }, {
    threshold: 0.3 // trigger when 30% of the section is visible
  });

  observer.observe(skillsSection);
});

// Portfolio section

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".gallery-card");
  const modal = document.getElementById("galleryModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalSubtitle = document.getElementById("modalSubtitle");
  const modalDescription = document.getElementById("modalDescription");
  const imageDetails = document.getElementById("imageDetails");
  const modalClose = document.getElementById("modalClose");
  const swipePrevBtn = document.getElementById("swipePrev");
  const swipeNextBtn = document.getElementById("swipeNext");

  const cardsArray = Array.from(cards);
  let currentIndex = -1;

  function showModal(index) {
    const card = cardsArray[index];
    const img = card.querySelector(".gallery-item");
    modalImage.src = img.src;
    modal.classList.add("active");
    modalTitle.textContent = card.dataset.title;
    modalSubtitle.textContent = card.dataset.subtitle;
    modalDescription.textContent = card.dataset.description;

    modalImage.onload = () => {
      imageDetails.textContent = `Dimensions: ${modalImage.naturalWidth}px × ${modalImage.naturalHeight}px`;
    };

    currentIndex = index;
  }

  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      showModal(index);
    });
  });

  modalClose.addEventListener("click", () => {
    modal.classList.remove("active");
    currentIndex = -1;
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      currentIndex = -1;
    }
  });

  swipePrevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      showModal(currentIndex - 1);
    }
  });

  swipeNextBtn.addEventListener("click", () => {
    if (currentIndex < cardsArray.length - 1) {
      showModal(currentIndex + 1);
    }
  });

  // Swipe support for modal (touch devices)
  let touchStartX = 0;
  let touchEndX = 0;

  modalImage.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
  });

  modalImage.addEventListener("touchend", e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
  });

  function handleSwipeGesture() {
    const swipeThreshold = 50; // minimum px needed to consider a swipe
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left - next image
      if (currentIndex < cardsArray.length - 1) {
        showModal(currentIndex + 1);
      }
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right - previous image
      if (currentIndex > 0) {
        showModal(currentIndex - 1);
      }
    }
  }
});


// Tab filtering
document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".tab-btn");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    const moreToggle = document.querySelector(".more-toggle");

    // Filtering logic placeholder
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"));
        tab.classList.add("active");

        // Example: add your filtering logic here
        const filter = tab.getAttribute("data-filter");
        console.log("Filtering:", filter);
      });
    });

    // Clone overflowed tabs to dropdown on mobile
function setupResponsiveTabs() {
  const container = document.querySelector(".tab-container");
  const tabsContainer = container.querySelector(".tabs");
  const tabButtons = Array.from(tabsContainer.children);
  const dropdownMenu = container.querySelector(".dropdown-menu");
  const moreToggle = container.querySelector(".more-toggle");

  // Reset styles and dropdown
  dropdownMenu.innerHTML = "";
  tabButtons.forEach(btn => btn.style.display = "inline-block");

  const containerWidth = container.offsetWidth;
  let usedWidth = 0;
  let overflowStarted = false;

  for (let i = 0; i < tabButtons.length; i++) {
    const btn = tabButtons[i];
    usedWidth += btn.offsetWidth + 8; // include gap

    if (usedWidth + 100 > containerWidth) {
      overflowStarted = true;
      dropdownMenu.appendChild(btn.cloneNode(true));
      btn.style.display = "none";
    }
  }

  // Only show the "More" button if overflow tabs exist
  moreToggle.style.display = dropdownMenu.children.length > 0 ? "inline-block" : "none";

  // Hide dropdown by default
  dropdownMenu.style.display = "none";
}


    // Toggle dropdown visibility
    moreToggle.addEventListener("click", () => {
      dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".more-dropdown")) {
        dropdownMenu.style.display = "none";
      }
    });

    // Handle dropdown button clicks
    dropdownMenu.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        document.querySelectorAll(".tab-btn").forEach((btn) => {
          btn.classList.remove("active");
          if (btn.textContent === e.target.textContent) {
            btn.classList.add("active");
            btn.click(); // trigger original click
          }
        });
        dropdownMenu.style.display = "none";
      }
    });

    // Initial run + resize
    setupResponsiveTabs();
    window.addEventListener("resize", setupResponsiveTabs);
  });

  document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const galleryCards = document.querySelectorAll(".gallery-card");

    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all tabs
        tabButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        galleryCards.forEach(card => {
          const category = card.getAttribute("data-category");

          if (filter === "all" || category === filter) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  });

