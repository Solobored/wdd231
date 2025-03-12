// Date Functions for Footer
document.addEventListener("DOMContentLoaded", () => {
  // Set current year for copyright
  const currentYear = new Date().getFullYear()
  document.getElementById("currentyear").textContent = currentYear

  // Set last modified date
  document.getElementById("lastModified").textContent = `Last Update: ${document.lastModified}`
})

