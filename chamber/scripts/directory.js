// Directory Page JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Navigation Toggle
  const hamburgerBtn = document.getElementById("hamburger-btn")
  const primaryNav = document.getElementById("primary-nav")

  if (hamburgerBtn && primaryNav) {
    hamburgerBtn.addEventListener("click", () => {
      primaryNav.classList.toggle("open")
      hamburgerBtn.textContent = primaryNav.classList.contains("open") ? "✕" : "☰"
      hamburgerBtn.setAttribute("aria-expanded", primaryNav.classList.contains("open") ? "true" : "false")
    })
  }

  // Current Date
  const currentDateElement = document.getElementById("current-date")
  if (currentDateElement) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    currentDateElement.textContent = new Date().toLocaleDateString("en-US", options)
  }

  // Directory View Toggle
  const gridBtn = document.getElementById("grid-btn")
  const listBtn = document.getElementById("list-btn")
  const directoryContainer = document.getElementById("directory-container")

  if (gridBtn && listBtn && directoryContainer) {
    gridBtn.addEventListener("click", () => {
      directoryContainer.classList.add("grid")
      directoryContainer.classList.remove("list")
      gridBtn.classList.add("active")
      listBtn.classList.remove("active")
    })

    listBtn.addEventListener("click", () => {
      directoryContainer.classList.add("list")
      directoryContainer.classList.remove("grid")
      listBtn.classList.add("active")
      gridBtn.classList.remove("active")
    })
  }

  // Fetch and display members
  async function loadMembers() {
    try {
      const response = await fetch("data/members.json")
      if (!response.ok) {
        throw new Error("Failed to fetch member data")
      }
      const data = await response.json()
      displayMembers(data.members)
    } catch (error) {
      console.error("Error loading members:", error)
      const container = document.getElementById("directory-container")
      if (container) {
        container.innerHTML = "<p>Error loading member data. Please try again later.</p>"
      }
    }
  }

  // Display members
  function displayMembers(members) {
    const container = document.getElementById("directory-container")
    if (!container) return

    const fragment = document.createDocumentFragment()

    members.forEach((member) => {
      const memberCard = document.createElement("div")
      memberCard.className = "member-card"

      let levelText = ""
      let levelClass = ""

      switch (member.membershipLevel) {
        case 1:
          levelText = "Member"
          levelClass = "level-1"
          break
        case 2:
          levelText = "Silver Member"
          levelClass = "level-2"
          break
        case 3:
          levelText = "Gold Member"
          levelClass = "level-3"
          break
        default:
          levelText = "Member"
          levelClass = "level-1"
      }

      memberCard.innerHTML = `
                  <img data-src="images/${member.image}" alt="${member.name} Logo" onerror="this.src='images/placeholder.png'">
                  <h2>${member.name}</h2>
                  <p>${member.address}</p>
                  <p>${member.phone}</p>
                  <p><a href="${member.website}" target="_blank">Website</a></p>
                  <p class="member-level ${levelClass}">${levelText}</p>
              `

      fragment.appendChild(memberCard)
    })

    container.innerHTML = ""
    container.appendChild(fragment)
  }

  // Load members when page loads
  loadMembers()

  // Footer date
  document.getElementById("current-year").textContent = new Date().getFullYear()
  document.getElementById("last-modified").textContent = `Last Modified: ${document.lastModified}`

  // Add intersection observer for lazy loading
  const lazyLoadImages = () => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.removeAttribute("data-src")
          observer.unobserve(img)
        }
      })
    })

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img)
    })
  }

  // Initialize lazy loading
  lazyLoadImages()
})

