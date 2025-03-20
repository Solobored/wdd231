
document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "99910b55ff0c7772d51668a952037613" 
  const city = "Temuco"
  const countryCode = "CL"

  async function fetchCurrentWeather() {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=imperial&appid=${apiKey}`,
      )

      if (!response.ok) {
        throw new Error("Weather data not available")
      }

      const data = await response.json()
      displayCurrentWeather(data)
    } catch (error) {
      console.error("Error fetching current weather:", error)
      displayWeatherError()
    }
  }

  async function fetchForecast() {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&units=imperial&appid=${apiKey}`,
      )

      if (!response.ok) {
        throw new Error("Forecast data not available")
      }

      const data = await response.json()
      displayForecast(data)
    } catch (error) {
      console.error("Error fetching forecast:", error)
      displayForecastError()
    }
  }

  function displayCurrentWeather(data) {
    const currentTemp = document.getElementById("current-temp")
    const weatherIcon = document.getElementById("weather-icon")
    const weatherDesc = document.getElementById("weather-desc")
    const highTemp = document.getElementById("high-temp")
    const lowTemp = document.getElementById("low-temp")
    const humidity = document.getElementById("humidity")

    currentTemp.textContent = Math.round(data.main.temp)

    const descriptions = data.weather.map((item) => {
      return item.description
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    })

    weatherDesc.textContent = descriptions.join(", ")

    const iconCode = data.weather[0].icon
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    weatherIcon.alt = data.weather[0].description

    highTemp.textContent = Math.round(data.main.temp_max)
    lowTemp.textContent = Math.round(data.main.temp_min)
    humidity.textContent = data.main.humidity

    console.log("Current weather data loaded successfully")
  }

  function displayForecast(data) {
    const forecastContainer = document.getElementById("forecast-container")
    forecastContainer.innerHTML = ""

    const today = new Date().setHours(0, 0, 0, 0)
    const forecasts = []
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    const forecastsByDay = {}

    data.list.forEach((item) => {
      const forecastDate = new Date(item.dt * 1000)
      const forecastDay = forecastDate.getDate()
      const forecastMonth = forecastDate.getMonth()
      const forecastYear = forecastDate.getFullYear()

      const dayKey = `${forecastYear}-${forecastMonth}-${forecastDay}`

      const itemDay = new Date(forecastYear, forecastMonth, forecastDay).getTime()
      if (itemDay <= today) {
        return
      }

      if (!forecastsByDay[dayKey]) {
        forecastsByDay[dayKey] = []
      }

      forecastsByDay[dayKey].push(item)
    })

    const days = Object.keys(forecastsByDay).sort()

    const threeDays = days.slice(0, 3)

    threeDays.forEach((day) => {
      const dayForecasts = forecastsByDay[day]

      let closestToNoon = dayForecasts[0]
      let minDiff = Number.POSITIVE_INFINITY

      dayForecasts.forEach((forecast) => {
        const forecastDate = new Date(forecast.dt * 1000)
        const hours = forecastDate.getHours()
        const diff = Math.abs(hours - 12)

        if (diff < minDiff) {
          minDiff = diff
          closestToNoon = forecast
        }
      })

      forecasts.push(closestToNoon)
    })

    forecasts.forEach((forecast) => {
      const forecastDate = new Date(forecast.dt * 1000)
      const dayOfWeek = daysOfWeek[forecastDate.getDay()]
      const temp = Math.round(forecast.main.temp)
      const iconCode = forecast.weather[0].icon
      const description = forecast.weather[0].description
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      const forecastDay = document.createElement("div")
      forecastDay.classList.add("forecast-day")

      forecastDay.innerHTML = `
        <h3>${dayOfWeek}</h3>
        <div class="weather-icon-temp">
          <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="${description}">
          <p>${temp}°F</p>
        </div>
        <p>${description}</p>
      `

      forecastContainer.appendChild(forecastDay)
    })

    console.log("Forecast data loaded successfully")
  }

  function displayWeatherError() {
    const weatherContent = document.querySelector(".weather-content")
    if (weatherContent) {
      weatherContent.innerHTML = "<p>Weather data is currently unavailable. Please try again later.</p>"
    }
  }

  function displayForecastError() {
    const forecastContainer = document.getElementById("forecast-container")
    if (forecastContainer) {
      forecastContainer.innerHTML = "<p>Forecast data is currently unavailable. Please try again later.</p>"
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
      fetchCurrentWeather()
      fetchForecast()
    })

    weatherSection.appendChild(refreshButton)
  }

  fetchCurrentWeather()
  fetchForecast()
})

