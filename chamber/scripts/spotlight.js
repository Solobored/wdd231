
document.addEventListener("DOMContentLoaded", () => {
  async function fetchMembers() {
    try {
      const response = await fetch("data/members.json")

      if (!response.ok) {
        throw new Error("Member data not available")
      }

      const data = await response.json()
      displaySpotlights(data)
    } catch (error) {
      console.error("Error fetching member data:", error)
      displaySpotlightError()
    }
  }

  function displaySpotlights(members) {
    const eligibleMembers = members.filter(
      (member) => member.membershipLevel === "gold" || member.membershipLevel === "silver",
    )

    const shuffledMembers = shuffleArray(eligibleMembers)

    const spotlightCount = Math.min(3, shuffledMembers.length)
    const spotlightMembers = shuffledMembers.slice(0, spotlightCount)

    const spotlightContainer = document.querySelector(".spotlight-container")

    if (spotlightContainer) {
      spotlightContainer.innerHTML = ""

      spotlightMembers.forEach((member) => {
        const spotlight = document.createElement("div")
        spotlight.classList.add("spotlight")

        spotlight.innerHTML = `
          <h3>${member.name}</h3>
          <p class="spotlight-address">${member.address}</p>
          <p class="spotlight-phone">${member.phone}</p>
          <p class="spotlight-website"><a href="${member.website}" target="_blank">Website</a></p>
          <p class="spotlight-membership">${capitalizeFirstLetter(member.membershipLevel)} Member</p>
        `

        spotlightContainer.appendChild(spotlight)
      })
    }
  }

  function displaySpotlightError() {
    const spotlightContainer = document.querySelector(".spotlight-container")
    if (spotlightContainer) {
      spotlightContainer.innerHTML = "<p>Business spotlight data is currently unavailable. Please try again later.</p>"
    }
  }

  function shuffleArray(array) {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  fetchMembers()
})

