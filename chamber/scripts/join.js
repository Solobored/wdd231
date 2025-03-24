
document.addEventListener("DOMContentLoaded", () => {

  const timestampField = document.getElementById("timestamp")
  if (timestampField) {
    timestampField.value = new Date().toISOString()
  }

  const modals = document.querySelectorAll(".modal")
  const infoButtons = document.querySelectorAll(".info-btn")
  const closeButtons = document.querySelectorAll(".close-modal")

  infoButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.getAttribute("data-modal")
      const modal = document.getElementById(modalId)
      if (modal) {
        modal.style.display = "block"
      }
    })
  })


  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal")
      if (modal) {
        modal.style.display = "none"
      }
    })
  })

  window.addEventListener("click", (event) => {
    modals.forEach((modal) => {
      if (event.target === modal) {
        modal.style.display = "none"
      }
    })
  })


  const membershipCards = document.querySelectorAll(".membership-card")


  setTimeout(() => {
    membershipCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("animate")
      }, index * 150)
    })
  }, 300)
})

