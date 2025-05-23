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




