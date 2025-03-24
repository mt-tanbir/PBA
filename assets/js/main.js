/* =========================================================
    Compare Slider & Testimonial Slider
=========================================================*/
var swiper = new Swiper(".pba-compare-slider .swiper-container", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  slidesPerView: 3,
  loop: true,
  spaceBetween: 30,
  slideToClickedSlide: true,

  breakpoints: {
    0: {
      slidesPerView: 1,
      centeredSlides: true,
      pagination: { el: ".swiper-pagination", clickable: true },
    },
    640: {
      slidesPerView: 2,
      centeredSlides: true,
    },
    992: {
      slidesPerView: 2,
      centeredSlides: true,
    },
    1200: {
      slidesPerView: 3,
      centeredSlides: true,
    },
  },
});

var Swipes = new Swiper(".pba-testimonial-slider .swiper-container", {
  loop: true,
  slidesPerView: 1,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// AOS
$(document).ready(function () {
  AOS.init({
    duration: 1000,
  });
});

// Sticky Header
$(document).ready(function () {
  $(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    if (scrollTop > 0) {
      $(".header").addClass("sticky");
      $(".resp-none").addClass("scroll-none");
    } else {
      $(".header").removeClass("sticky");
      $(".resp-none").removeClass("scroll-none");
    }
  });

  // Toggle menu icon change (bars ↔ close)
  $("#headerNavbarDropdown")
    .on("show.bs.collapse", function () {
      $("#menuIcon").removeClass("fa-bars").addClass("fa-xmark");
    })
    .on("hide.bs.collapse", function () {
      $("#menuIcon").removeClass("fa-xmark").addClass("fa-bars");
    });

  // Navbar logo show/hide when toggler is clicked
  const navbarCollapse = $("#headerNavbarDropdown");
  const navbarBrand = $(".navbar-brand.header-logo");
  const navbarToggler = $(".navbar-toggler");
  navbarToggler.on("click", function () {
    navbarBrand.hide();
  });
  navbarCollapse
    .on("shown.bs.collapse", function () {
      navbarBrand.hide();
    })
    .on("hidden.bs.collapse", function () {
      navbarBrand.show();
    });
});

// PBA logo Slick Slider
$(".slick-carousel").slick({
  speed: 5000,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: "linear",
  slidesToShow: 5,
  slidesToScroll: 1,
  infinite: true,
  swipeToSlide: true,
  centerMode: true,
  focusOnSelect: true,
  arrows: false,
  dots: false,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1080,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
});

// Form
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("ajaxForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      const form = this;
      const formData = new FormData(form);
      const formResponse = document.getElementById("formResponse");

      fetch("submit-form.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            formResponse.innerHTML = `<div class="alert alert-success">${data.message}</div>`;
            form.reset(); // Reset the form on success
            setTimeout(
              () => (window.location.href = "download-screen.html"),
              2000
            );
          } else {
            formResponse.innerHTML = `<div class="alert alert-danger">${data.message}</div>`;
          }
        })
        .catch((error) => {
          formResponse.innerHTML = `<div class="alert alert-danger">An error occurred. Please try again later.</div>`;
        });
    });
});

// Scroll To Top
const scrollToTopBtn = $(".scrollToTop");
// Show or hide the button based on scroll position
function handleScrollToTop() {
  if ($(window).scrollTop() > 400) {
    scrollToTopBtn.fadeIn();
  } else {
    scrollToTopBtn.fadeOut();
  }
}
$(window).on("scroll", handleScrollToTop);
scrollToTopBtn.on("click", function () {
  $("html, body").animate({ scrollTop: 0 }, "slow");
});
handleScrollToTop(); // Initial check when the page loads


// POPup Form
document.addEventListener("DOMContentLoaded", function () {
  const popupTrigger = document.getElementById("popupTrigger");
  const popupContainer = document.getElementById("popupContainer");
  const popupClose = document.querySelector(".popup-close");
  const ajaxForm = document.getElementById("ajaxForm");

  // Show Popup
  popupTrigger.addEventListener("click", function (event) {
    event.preventDefault();
    popupContainer.style.display = "flex";
  });

  // Close Popup
  popupClose.addEventListener("click", function () {
    popupContainer.style.display = "none";
  });

  // Close when clicking outside the form
  popupContainer.addEventListener("click", function (event) {
    if (event.target === popupContainer) {
      popupContainer.style.display = "none";
    }
  });

  // Form Submission
  ajaxForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Simulate form submission
    setTimeout(() => {
      window.location.href = "download-screen.html";
    }, 500);
  });
});
