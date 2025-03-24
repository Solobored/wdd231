
document.addEventListener("DOMContentLoaded", () => {

  const hamburgerButton = document.querySelector(".hamburger")
  const navMenu = document.querySelector("nav ul")

  if (hamburgerButton && navMenu) {
    hamburgerButton.addEventListener("click", () => {
      navMenu.classList.toggle("show")
      hamburgerButton.classList.toggle("active")

      const expanded = hamburgerButton.getAttribute("aria-expanded") === "true" || false
      hamburgerButton.setAttribute("aria-expanded", !expanded)
    })
  }

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

  const currentPage = window.location.pathname
  const navLinks = document.querySelectorAll("nav a")

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href")
    if (currentPage.includes(linkPath) && linkPath !== "#" && linkPath !== "index.html") {
      link.classList.add("active")
      link.setAttribute("aria-current", "page")
    } else if (currentPage.endsWith("/") || currentPage.endsWith("index.html")) {
      if (linkPath === "index.html" || linkPath === "./") {
        link.classList.add("active")
        link.setAttribute("aria-current", "page")
      }
    }
  })

  function handleResize() {
    const isMobile = window.innerWidth <= 767

    if (!isMobile && navMenu) {
      navMenu.classList.remove("show")
      if (hamburgerButton) {
        hamburgerButton.classList.remove("active")
        hamburgerButton.setAttribute("aria-expanded", "false")
      }
    }
  }

  handleResize()
  window.addEventListener("resize", handleResize)
})

