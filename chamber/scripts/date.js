document.addEventListener("DOMContentLoaded", () => {
  const currentDateElement = document.getElementById("current-date")
  if (currentDateElement) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    const formattedDate = new Date().toLocaleDateString("en-US", options)
    currentDateElement.textContent = formattedDate
  }

  const currentYearElement = document.getElementById("current-year")
  if (currentYearElement) {
    const currentYear = new Date().getFullYear()
    currentYearElement.textContent = currentYear
  }

  const lastUpdatedElement = document.getElementById("last-updated")
  if (lastUpdatedElement) {
    const options = {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }

    const formattedDate = new Date().toLocaleString("en-US", options)
    lastUpdatedElement.textContent = `Last Updated: ${formattedDate}`
  }
})

