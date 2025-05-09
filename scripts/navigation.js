
document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.getElementById("hamburger-btn")
  const primaryNav = document.getElementById("primary-nav")


  hamburgerBtn.addEventListener("click", () => {
    primaryNav.classList.toggle("open")
    hamburgerBtn.textContent = primaryNav.classList.contains("open") ? "✕" : "☰"
    hamburgerBtn.setAttribute("aria-expanded", primaryNav.classList.contains("open") ? "true" : "false")
  })


  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      primaryNav.classList.remove("open")
      hamburgerBtn.textContent = "☰"
      hamburgerBtn.setAttribute("aria-expanded", "false")
    }
  })

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
