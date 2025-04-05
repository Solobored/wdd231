
function initPage() {
  const urlParams = new URLSearchParams(window.location.search)

  displayFeedbackDetails(urlParams)

  setupMobileMenu()
}

function displayFeedbackDetails(params) {
  const feedbackDetails = document.getElementById("feedback-details")

  if (!feedbackDetails) return

  let detailsHTML = '<dl class="feedback-details-list">'

  const name = params.get("name")
  if (name) {
    detailsHTML += `<dt>Name:</dt><dd>${name}</dd>`
  }

  const email = params.get("email")
  if (email) {
    detailsHTML += `<dt>Email:</dt><dd>${email}</dd>`
  }


  const feedbackType = params.get("feedback-type")
  if (feedbackType) {
    detailsHTML += `<dt>Feedback Type:</dt><dd>${formatFeedbackType(feedbackType)}</dd>`
  }

  const subject = params.get("subject")
  if (subject) {
    detailsHTML += `<dt>Subject:</dt><dd>${subject}</dd>`
  }

  const message = params.get("message")
  if (message) {
    detailsHTML += `<dt>Message:</dt><dd>${message}</dd>`
  }

  const rating = params.get("rating")
  if (rating) {
    detailsHTML += `<dt>Rating:</dt><dd>${rating} out of 5</dd>`
  }

  const howFound = params.get("how-found")
  if (howFound) {
    detailsHTML += `<dt>How You Found Us:</dt><dd>${formatHowFound(howFound)}</dd>`
  }

  const subscribe = params.get("subscribe")
  if (subscribe === "yes") {
    detailsHTML += `<dt>Newsletter:</dt><dd>Subscribed</dd>`
  }

  const contactOk = params.get("contact-ok")
  if (contactOk === "yes") {
    detailsHTML += `<dt>Contact Permission:</dt><dd>Granted</dd>`
  }

  const timestamp = params.get("timestamp")
  if (timestamp) {
    try {
      const date = new Date(timestamp)
      detailsHTML += `<dt>Submitted:</dt><dd>${date.toLocaleString()}</dd>`
    } catch (error) {
      console.error("Error parsing timestamp:", error)
    }
  }

  detailsHTML += "</dl>"

  feedbackDetails.innerHTML = detailsHTML
}

function formatFeedbackType(type) {
  switch (type) {
    case "general":
      return "General Feedback"
    case "suggestion":
      return "Feature Suggestion"
    case "recipe":
      return "Recipe Suggestion"
    case "issue":
      return "Issue Report"
    default:
      return type
  }
}

function formatHowFound(source) {
  switch (source) {
    case "search":
      return "Search Engine"
    case "social":
      return "Social Media"
    case "friend":
      return "Friend or Family"
    case "ad":
      return "Advertisement"
    case "other":
      return "Other"
    default:
      return source
  }
}

function setupMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("show")
      menuToggle.setAttribute("aria-expanded", menuToggle.getAttribute("aria-expanded") === "true" ? "false" : "true")
    })
  }
}

document.addEventListener("DOMContentLoaded", initPage)

