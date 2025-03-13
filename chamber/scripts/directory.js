document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.getElementById("hamburger-btn")
  const primaryNav = document.getElementById("primary-nav")

  if (hamburgerBtn && primaryNav) {
    hamburgerBtn.addEventListener("click", () => {
      primaryNav.classList.toggle("open")
      hamburgerBtn.textContent = primaryNav.classList.contains("open") ? "✕" : "☰"
      hamburgerBtn.setAttribute("aria-expanded", primaryNav.classList.contains("open") ? "true" : "false")
    })
  }

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

  function displayMembers(members) {
    const container = document.getElementById("directory-container")
    if (!container) return

    container.innerHTML = ""

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
                <img src="images/${member.image}" alt="${member.name} Logo" onerror="this.src='images/placeholder.png'">
                <h2>${member.name}</h2>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank">Website</a></p>
                <p class="member-level ${levelClass}">${levelText}</p>
            `

      container.appendChild(memberCard)
    })
  }

  loadMembers()

  document.getElementById("current-year").textContent = new Date().getFullYear()
  document.getElementById("last-modified").textContent = `Last Modified: ${document.lastModified}`
})

