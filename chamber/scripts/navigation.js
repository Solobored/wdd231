// Navigation script for Araucania Chamber of Commerce
document.addEventListener("DOMContentLoaded", () => {
  // Toggle mobile menu
  const hamburgerButton = document.querySelector(".hamburger")
  const navMenu = document.querySelector("nav ul")

  if (hamburgerButton && navMenu) {
    hamburgerButton.addEventListener("click", () => {
      navMenu.classList.toggle("show")
      hamburgerButton.classList.toggle("active")

      // Toggle aria-expanded attribute for accessibility
      const expanded = hamburgerButton.getAttribute("aria-expanded") === "true" || false
      hamburgerButton.setAttribute("aria-expanded", !expanded)
    })
  }

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (
      navMenu &&
      navMenu.classList.contains("show") &&
      !event.target.closest("nav") &&
      !event.target.closest(".hamburger")
    ) {
      navMenu.classList.remove("show")
      if (hamburgerButton) {
        hamburgerButton.classList.remove("active")
        hamburgerButton.setAttribute("aria-expanded", "false")
      }
    }
  })

  // Highlight current page in navigation
  const currentPage = window.location.pathname
  const navLinks = document.querySelectorAll("nav a")

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href")
    if (currentPage.includes(linkPath) && linkPath !== "#" && linkPath !== "index.html") {
      link.classList.add("active")
      link.setAttribute("aria-current", "page")
    } else if (currentPage.endsWith("/") || currentPage.endsWith("index.html")) {
      // If we're on the home page
      if (linkPath === "index.html" || linkPath === "./") {
        link.classList.add("active")
        link.setAttribute("aria-current", "page")
      }
    }
  })

  // Check if we're on mobile or desktop and adjust menu visibility
  function handleResize() {
    const isMobile = window.innerWidth <= 767

    if (!isMobile && navMenu) {
      // On desktop, always show the menu
      navMenu.classList.remove("show")
      if (hamburgerButton) {
        hamburgerButton.classList.remove("active")
        hamburgerButton.setAttribute("aria-expanded", "false")
      }
    }
  }

  // Run on load and on resize
  handleResize()
  window.addEventListener("resize", handleResize)
})

