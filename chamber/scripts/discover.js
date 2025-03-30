
document.addEventListener("DOMContentLoaded", () => {
  displayVisitInfo()

  loadAttractions()


  function displayVisitInfo() {
    const visitMessage = document.getElementById("visit-message")
    const currentDate = Date.now()

    const lastVisit = localStorage.getItem("lastVisit")


    let message = ""

    if (!lastVisit) {
      message = "Welcome! Let us know if you have any questions."
    } else {

      const lastVisitDate = Number.parseInt(lastVisit)
      const daysDifference = Math.floor((currentDate - lastVisitDate) / (1000 * 60 * 60 * 24))

      if (daysDifference < 1) {

        message = "Back so soon! Awesome!"
      } else if (daysDifference === 1) {

        message = "You last visited 1 day ago."
      } else {

        message = `You last visited ${daysDifference} days ago.`
      }
    }

    if (visitMessage) {
      visitMessage.innerHTML = `<p>${message}</p>`
    }


    localStorage.setItem("lastVisit", currentDate)
  }

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
          <a href="${attraction.url}" class="learn-more" target="_blank">Learn More</a>
        `

        container.appendChild(card)
      })
    }
  }

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

