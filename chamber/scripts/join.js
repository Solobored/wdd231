// Join page script for Araucania Chamber of Commerce
document.addEventListener("DOMContentLoaded", () => {
  // Set the timestamp when the form loads
  const timestampField = document.getElementById("timestamp")
  if (timestampField) {
    timestampField.value = new Date().toISOString()
  }

  // Modal functionality
  const modals = document.querySelectorAll(".modal")
  const infoButtons = document.querySelectorAll(".info-btn")
  const closeButtons = document.querySelectorAll(".close-modal")

  // Open modal when info button is clicked
  infoButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.getAttribute("data-modal")
      const modal = document.getElementById(modalId)
      if (modal) {
        modal.style.display = "block"
      }
    })
  })

  // Close modal when close button is clicked
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal")
      if (modal) {
        modal.style.display = "none"
      }
    })
  })

  // Close modal when clicking outside the modal content
  window.addEventListener("click", (event) => {
    modals.forEach((modal) => {
      if (event.target === modal) {
        modal.style.display = "none"
      }
    })
  })

  // Add animation to membership cards
  const membershipCards = document.querySelectorAll(".membership-card")

  // Add animation class after a short delay to trigger the animation
  setTimeout(() => {
    membershipCards.forEach((card, index) => {
      // Stagger the animations
      setTimeout(() => {
        card.classList.add("animate")
      }, index * 150)
    })
  }, 300)
})

