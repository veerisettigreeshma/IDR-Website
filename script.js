// ============================================================
//  IDR — script.js
//  This file handles three things:
//  1. Sticky nav shadow when the user scrolls down
//  2. Hamburger menu open/close on mobile
//  3. Contact form success message
// ============================================================


// ============================================================
//  1. STICKY NAV — add shadow when user scrolls down
// ============================================================

// Grab the <nav> element from the HTML
const navbar = document.getElementById('navbar');

// Listen for scroll events on the whole window
window.addEventListener('scroll', function () {

  // If the user has scrolled more than 10px down...
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');    // adds shadow (defined in CSS)
  } else {
    navbar.classList.remove('scrolled'); // removes shadow at top of page
  }

});


// ============================================================
//  2. HAMBURGER MENU — open and close on mobile
// ============================================================

// Grab the hamburger button and the mobile menu
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

// When hamburger button is clicked...
hamburger.addEventListener('click', function () {

  // Toggle 'open' class on both elements
  // (CSS uses .open to show the menu and animate the icon)
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');

});

// When any mobile menu link is clicked — close the menu
// (so the page scrolls to the section and menu closes cleanly)
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});


// ============================================================
//  3. CONTACT FORM — show success message on submit
// ============================================================

// Grab the form and the hidden success message paragraph
const contactForm   = document.getElementById('contactForm');
const formSuccess   = document.getElementById('formSuccess');

// When the form is submitted...
contactForm.addEventListener('submit', function (event) {

  // Prevent the page from refreshing (default browser behaviour)
  event.preventDefault();

  // Check that name and email fields are not empty
  const name  = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  if (name === '' || email === '') {
    // If empty, do nothing — browser will show its own validation
    return;
  }

  // Hide the submit button
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.style.display = 'none';

  // Show the green success message
  formSuccess.classList.add('visible');

  // Optional: clear the form fields after 3 seconds
  setTimeout(function () {
    contactForm.reset();
    submitBtn.style.display = 'flex';
    formSuccess.classList.remove('visible');
  }, 5000); // 5000 milliseconds = 5 seconds

});


// ============================================================
//  4. SMOOTH SCROLL — for any anchor link (extra safety)
// ============================================================

// Grab all links that start with # (internal page links)
const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach(function (anchor) {
  anchor.addEventListener('click', function (event) {

    // Get the target section id from the href e.g. "#about"
    const targetId = this.getAttribute('href');

    // Find that section on the page
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      event.preventDefault(); // stop default jump behaviour

      // Calculate position accounting for sticky nav height
      const navHeight = navbar.offsetHeight;
      const sectionTop = targetSection.getBoundingClientRect().top + window.scrollY - navHeight;

      // Smoothly scroll to it
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    }

  });
});