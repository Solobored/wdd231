// Responsive Navigation Menu
document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.getElementById("hamburger-btn")
  const primaryNav = document.getElementById("primary-nav")

  // Toggle menu when hamburger button is clicked
  hamburgerBtn.addEventListener("click", () => {
    primaryNav.classList.toggle("open")
    hamburgerBtn.textContent = primaryNav.classList.contains("open") ? "✕" : "☰"
    hamburgerBtn.setAttribute("aria-expanded", primaryNav.classList.contains("open") ? "true" : "false")
  })

  // Close menu when window is resized to larger screen
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      primaryNav.classList.remove("open")
      hamburgerBtn.textContent = "☰"
      hamburgerBtn.setAttribute("aria-expanded", "false")
    }
  })

  // Add active class to current page in navigation
  const currentPage = window.location.pathname
  const navLinks = document.querySelectorAll("nav a")

  navLinks.forEach((link) => {
    if (
      link.getAttribute("href") === currentPage ||
      (currentPage.includes("index.html") && link.getAttribute("href") === "index.html")
    ) {
      link.parentElement.classList.add("active")
    }
  })
})

