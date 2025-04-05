// Discover page script for Araucania Chamber of Commerce
document.addEventListener("DOMContentLoaded", () => {
  // Track and display visit information
  displayVisitInfo()

  // Load attractions
  loadAttractions()

  // Function to display visit information using localStorage
  function displayVisitInfo() {
    const visitMessage = document.getElementById("visit-message")
    const currentDate = Date.now()

    // Get the last visit date from localStorage
    const lastVisit = localStorage.getItem("lastVisit")

    // Prepare message based on visit history
    let message = ""

    if (!lastVisit) {
      // First visit
      message = "Welcome! Let us know if you have any questions."
    } else {
      // Calculate time difference in days
      const lastVisitDate = Number.parseInt(lastVisit)
      const daysDifference = Math.floor((currentDate - lastVisitDate) / (1000 * 60 * 60 * 24))

      if (daysDifference < 1) {
        // Less than a day
        message = "Back so soon! Awesome!"
      } else if (daysDifference === 1) {
        // Exactly 1 day
        message = "You last visited 1 day ago."
      } else {
        // More than 1 day
        message = `You last visited ${daysDifference} days ago.`
      }
    }

    // Update the visit message
    if (visitMessage) {
      visitMessage.innerHTML = `<p>${message}</p>`
    }

    // Store the current visit date
    localStorage.setItem("lastVisit", currentDate.toString())
  }

  // Function to load attractions from JSON
  async function loadAttractions() {
    try {
      const response = await fetch("data/attractions.json")

      if (!response.ok) {
        throw new Error("Failed to load attractions data")
      }

      const attractions = await response.json()
      displayAttractions(attractions)
    } catch (error) {
      console.error("Error loading attractions:", error)
      displayError()
    }
  }

  // Function to display attractions
  function displayAttractions(attractions) {
    const container = document.getElementById("attractions-container")

    if (container) {
      container.innerHTML = ""

      attractions.forEach((attraction, index) => {
        const card = document.createElement("article")
        card.classList.add("attraction-card")

        card.innerHTML = `
          <figure>
            <img src="${attraction.image}" alt="${attraction.name}" loading="lazy">
          </figure>
          <h2>${attraction.name}</h2>
          <address>${attraction.address}</address>
          <p>${attraction.description}</p>
          <a href="${attraction.url}" class="learn-more" target="_blank">Learn More About ${attraction.name}</a>
        `

        container.appendChild(card)
      })
    }
  }

  // Function to display error message
  function displayError() {
    const container = document.getElementById("attractions-container")

    if (container) {
      container.innerHTML = `
        <div class="error-message">
          <p>Sorry, we couldn't load the attractions information. Please try again later.</p>
        </div>
      `
    }
  }
})

