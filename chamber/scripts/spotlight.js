// Business Spotlight script for Araucania Chamber of Commerce
document.addEventListener("DOMContentLoaded", () => {
  // Fetch member data
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

  // Display business spotlights
  function displaySpotlights(members) {
    // Filter for gold and silver members
    const eligibleMembers = members.filter(
      (member) => member.membershipLevel === "gold" || member.membershipLevel === "silver",
    )

    // Shuffle the array to get random members
    const shuffledMembers = shuffleArray(eligibleMembers)

    // Get 3 random members (or fewer if not enough eligible members)
    const spotlightCount = Math.min(3, shuffledMembers.length)
    const spotlightMembers = shuffledMembers.slice(0, spotlightCount)

    // Get spotlight container
    const spotlightContainer = document.querySelector(".spotlight-container")

    // Clear any existing content
    if (spotlightContainer) {
      spotlightContainer.innerHTML = ""

      // Create spotlight elements
      spotlightMembers.forEach((member) => {
        const spotlight = document.createElement("div")
        spotlight.classList.add("spotlight")

        spotlight.innerHTML = `
          <h3>${member.name}</h3>
          <p class="spotlight-address">${member.address}</p>
          <p class="spotlight-phone">${member.phone}</p>
          <p class="spotlight-website"><a href="${member.website}" target="_blank">Website</a></p>
          <p class="spotlight-membership">${capitalizeFirstLetter(member.membershipLevel)} Member</p>
          <p><a href="directory.html" class="spotlight-link">View in Directory</a></p>
        `

        spotlightContainer.appendChild(spotlight)
      })
    }
  }

  // Display error message for spotlights
  function displaySpotlightError() {
    const spotlightContainer = document.querySelector(".spotlight-container")
    if (spotlightContainer) {
      spotlightContainer.innerHTML = "<p>Business spotlight data is currently unavailable. Please try again later.</p>"
    }
  }

  // Helper function to shuffle array (Fisher-Yates algorithm)
  function shuffleArray(array) {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  // Helper function to capitalize first letter
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  // Initialize spotlights
  fetchMembers()
})

