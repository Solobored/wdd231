
document.addEventListener("DOMContentLoaded", () => {
  const currentYear = new Date().getFullYear()
  document.getElementById("currentyear").textContent = currentYear


  document.getElementById("lastModified").textContent = `Last Update: ${document.lastModified}`
})

