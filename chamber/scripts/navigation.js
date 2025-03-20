
document.addEventListener("DOMContentLoaded", () => {

  const hamburgerButton = document.querySelector(".hamburger")
  const navMenu = document.querySelector("nav ul")

  if (hamburgerButton && navMenu) {
    hamburgerButton.addEventListener("click", () => {
      navMenu.classList.toggle("show")
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
    }
  })

  const darkModeToggle = document.getElementById("dark-mode-toggle")
  const body = document.body

  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    body.classList.add("dark-mode")
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode")

      if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark")
      } else {
        localStorage.setItem("theme", "light")
      }
    })
  }

  const currentPage = window.location.pathname
  const navLinks = document.querySelectorAll("nav a")

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href")
    if (currentPage.includes(linkPath) && linkPath !== "#") {
      link.classList.add("active")
    }
  })

  function handleResize() {
    if (window.innerWidth > 768 && navMenu) {
      navMenu.classList.remove("show")
    }
  }

  window.addEventListener("resize", handleResize)
})

