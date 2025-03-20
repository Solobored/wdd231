
document.addEventListener("DOMContentLoaded", () => {

  displayRandomWeather()
  displayRandomForecast()


  function displayRandomWeather() {

    const currentTemp = document.getElementById("current-temp")
    const weatherIcon = document.getElementById("weather-icon")
    const weatherDesc = document.getElementById("weather-desc")
    const highTemp = document.getElementById("high-temp")
    const lowTemp = document.getElementById("low-temp")
    const humidity = document.getElementById("humidity")


    const weatherConditions = [
      { description: "Clear Sky", icon: "01d" },
      { description: "Few Clouds", icon: "02d" },
      { description: "Scattered Clouds", icon: "03d" },
      { description: "Broken Clouds", icon: "04d" },
      { description: "Light Rain", icon: "10d" },
      { description: "Moderate Rain", icon: "09d" },
      { description: "Thunderstorm", icon: "11d" },
      { description: "Mist", icon: "50d" },
    ]

    const month = new Date().getMonth() // 0-11 (Jan-Dec)

    let tempRange
    if (month >= 11 || month <= 1) {

      tempRange = { min: 55, max: 85 }
    } else if (month >= 2 && month <= 4) {

      tempRange = { min: 45, max: 75 }
    } else if (month >= 5 && month <= 7) {

      tempRange = { min: 35, max: 60 }
    } else {

      tempRange = { min: 45, max: 70 }
    }

    const temp = Math.floor(Math.random() * (tempRange.max - tempRange.min + 1)) + tempRange.min
    const high = temp + Math.floor(Math.random() * 8) + 2 
    const low = temp - Math.floor(Math.random() * 8) - 2 
    const humidityValue = Math.floor(Math.random() * 30) + 50 
    const weatherCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)]

    currentTemp.textContent = temp
    weatherIcon.src = `https://openweathermap.org/img/wn/${weatherCondition.icon}@2x.png`
    weatherIcon.alt = weatherCondition.description
    weatherDesc.textContent = weatherCondition.description
    highTemp.textContent = high
    lowTemp.textContent = low
    humidity.textContent = humidityValue
  }

    function displayRandomForecast() {
    const forecastContainer = document.getElementById("forecast-container")
    forecastContainer.innerHTML = ""

    const today = new Date()
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    const weatherConditions = [
      { description: "Clear Sky", icon: "01d" },
      { description: "Few Clouds", icon: "02d" },
      { description: "Scattered Clouds", icon: "03d" },
      { description: "Broken Clouds", icon: "04d" },
      { description: "Light Rain", icon: "10d" },
      { description: "Moderate Rain", icon: "09d" },
      { description: "Thunderstorm", icon: "11d" },
      { description: "Mist", icon: "50d" },
    ]


    const month = today.getMonth() 

    let tempRange
    if (month >= 11 || month <= 1) {
      tempRange = { min: 55, max: 85 }
    } else if (month >= 2 && month <= 4) {
      tempRange = { min: 45, max: 75 }
    } else if (month >= 5 && month <= 7) {
      tempRange = { min: 35, max: 60 }
    } else {
      tempRange = { min: 45, max: 70 }
    }

    for (let i = 1; i <= 3; i++) {
      const forecastDate = new Date()
      forecastDate.setDate(today.getDate() + i)

      const dayOfWeek = daysOfWeek[forecastDate.getDay()]

      const temp = Math.floor(Math.random() * (tempRange.max - tempRange.min + 1)) + tempRange.min

      const weatherCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)]

      const forecastDay = document.createElement("div")
      forecastDay.classList.add("forecast-day")

      forecastDay.innerHTML = `
        <h3>${dayOfWeek}</h3>
        <div class="weather-icon-temp">
          <img src="https://openweathermap.org/img/wn/${weatherCondition.icon}.png" alt="${weatherCondition.description}">
          <p>${temp}°F</p>
        </div>
        <p>${weatherCondition.description}</p>
      `

      forecastContainer.appendChild(forecastDay)
    }
  }

  const weatherSection = document.querySelector(".weather-section h2")
  if (weatherSection) {
    const refreshButton = document.createElement("button")
    refreshButton.textContent = "↻"
    refreshButton.classList.add("refresh-weather")
    refreshButton.setAttribute("aria-label", "Refresh weather data")
    refreshButton.style.float = "right"
    refreshButton.style.background = "none"
    refreshButton.style.border = "none"
    refreshButton.style.color = "white"
    refreshButton.style.fontSize = "1.2rem"
    refreshButton.style.cursor = "pointer"

    refreshButton.addEventListener("click", () => {
      displayRandomWeather()
      displayRandomForecast()
    })

    weatherSection.appendChild(refreshButton)
  }
})

