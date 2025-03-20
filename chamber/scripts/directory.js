
document.addEventListener("DOMContentLoaded", () => {
  fetch("data/members.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    })
    .then((data) => {
      displayMembers(data)
      setupViewToggle()
    })
    .catch((error) => {
      console.error("Error fetching data:", error)
      displayError()
    })

  function displayMembers(members) {
    const container = document.getElementById("directory-container")

    if (container) {
      container.innerHTML = ""

      members.forEach((member) => {
        const card = document.createElement("div")
        card.classList.add("directory-card")

        const membershipLevel = member.membershipLevel.charAt(0).toUpperCase() + member.membershipLevel.slice(1)

        card.innerHTML = `
        <img src="${member.image}" alt="${member.name} logo" class="member-image">
        <h2>${member.name}</h2>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p><a href="${member.website}" target="_blank">Website</a></p>
        <p class="membership-badge">${membershipLevel} Member</p>
      `

        container.appendChild(card)
      })
    }
  }

  function displayError() {
    const container = document.getElementById("directory-container")
    if (container) {
      container.innerHTML = '<p class="error-message">Unable to load directory data. Please try again later.</p>'
    }
  }

  function setupViewToggle() {
    const gridBtn = document.getElementById("grid-btn")
    const listBtn = document.getElementById("list-btn")
    const directoryContainer = document.getElementById("directory-container")

    if (gridBtn && listBtn && directoryContainer) {
      directoryContainer.classList.add("grid-view")
      directoryContainer.classList.remove("list-view")

      gridBtn.addEventListener("click", () => {
        directoryContainer.classList.add("grid-view")
        directoryContainer.classList.remove("list-view")
        gridBtn.setAttribute("aria-pressed", "true")
        listBtn.setAttribute("aria-pressed", "false")
      })

      listBtn.addEventListener("click", () => {
        directoryContainer.classList.add("list-view")
        directoryContainer.classList.remove("grid-view")
        listBtn.setAttribute("aria-pressed", "true")
        gridBtn.setAttribute("aria-pressed", "false")
      })
    }
  }
})

