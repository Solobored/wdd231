
document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.getElementById("hamburgerBtn")
  const primaryNav = document.getElementById("primaryNav")

  hamburgerBtn.addEventListener("click", () => {
    primaryNav.classList.toggle("open")
    const isOpen = primaryNav.classList.contains("open")
    hamburgerBtn.textContent = isOpen ? "✕" : "☰"
    hamburgerBtn.setAttribute("aria-expanded", isOpen)
  })

  const navLinks = document.querySelectorAll("nav ul li a")
  const currentPage = window.location.pathname

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href")
    if (
      (currentPage.includes(linkPath) && linkPath !== "#") ||
      (currentPage.endsWith("/") && linkPath === "index.html")
    ) {
      link.parentElement.classList.add("active")
      link.setAttribute("aria-current", "page")
    }
  })

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      primaryNav.classList.remove("open")
      hamburgerBtn.textContent = "☰"
      hamburgerBtn.setAttribute("aria-expanded", "false")
    }
  })
})

