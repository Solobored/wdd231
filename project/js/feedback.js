
import { setupModal } from "./modules/ui.js"


const feedbackForm = document.getElementById("feedback-form")
const timestampField = document.getElementById("timestamp")

function initPage() {

  setupEventListeners()

  setupModal()

  if (timestampField) {
    timestampField.value = new Date().toISOString()
  }
}

function setupEventListeners() {
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", (event) => {

      const feedbackType = document.getElementById("feedback-type")
      const subject = document.getElementById("subject")
      const message = document.getElementById("message")

      if (feedbackType && feedbackType.value === "") {
        alert("Please select a feedback type")
        event.preventDefault()
        feedbackType.focus()
        return
      }

      if (subject && subject.value.trim() === "") {
        alert("Please enter a subject")
        event.preventDefault()
        subject.focus()
        return
      }

      if (message && message.value.trim() === "") {
        alert("Please enter a message")
        event.preventDefault()
        message.focus()
        return
      }
    })
  }

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

