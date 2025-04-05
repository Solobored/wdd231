
import { searchRecipes } from "./modules/api.js"
import { displayRecipes, setupModal } from "./modules/ui.js"
import { saveSearch } from "./modules/storage.js"

const searchForm = document.getElementById("search-form")
const ingredientSearch = document.getElementById("ingredient-search")
const recipeResults = document.getElementById("recipe-results")
const searchSummary = document.getElementById("search-summary")
const applyFiltersBtn = document.getElementById("apply-filters")

async function initPage() {

  setupEventListeners()

  setupModal()

  const urlParams = new URLSearchParams(window.location.search)
  const ingredients = urlParams.get("ingredients")
  const diet = urlParams.get("diet")

  if (ingredients) {
    if (ingredientSearch) {
      ingredientSearch.value = ingredients
    }

    if (diet && document.getElementById("diet-preference")) {
      document.getElementById("diet-preference").value = diet
    }

    await performSearch(ingredients, diet)
  } else {
    if (recipeResults) {
      recipeResults.innerHTML = `
        <div class="empty-state">
          <p>Enter ingredients above to find recipes.</p>
        </div>
      `
    }

    if (searchSummary) {
      searchSummary.textContent = "Enter ingredients to search for recipes"
    }
  }
}

function setupEventListeners() {
  if (searchForm) {
    searchForm.addEventListener("submit", async (event) => {
      event.preventDefault()

      const ingredients = ingredientSearch.value.trim()
      const dietPreference = document.getElementById("diet-preference").value

      if (ingredients) {
        saveSearch(ingredients, dietPreference)

        const searchParams = new URLSearchParams()
        searchParams.set("ingredients", ingredients)
        if (dietPreference) {
          searchParams.set("diet", dietPreference)
        }

        const newUrl = `${window.location.pathname}?${searchParams.toString()}`
        window.history.pushState({ path: newUrl }, "", newUrl)

        await performSearch(ingredients, dietPreference)
      }
    })
  }

  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener("click", () => {
      applyFilters()
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

async function performSearch(ingredients, diet = "") {
  if (!recipeResults) return

  recipeResults.innerHTML = '<div class="loading">Searching for recipes...</div>'

  if (searchSummary) {
    searchSummary.textContent = `Searching for recipes with: ${ingredients}${diet ? ` (${diet})` : ""}`
  }

  try {
    const recipes = await searchRecipes(ingredients, diet)

    if (searchSummary) {
      searchSummary.textContent = `Found ${recipes.length} recipes with: ${ingredients}${diet ? ` (${diet})` : ""}`
    }

    displayRecipes(recipeResults, recipes)

    recipeResults.setAttribute("data-recipes", JSON.stringify(recipes))
  } catch (error) {
    console.error("Error searching recipes:", error)
    recipeResults.innerHTML = `
      <div class="error-message">
        <p>Sorry, we couldn't search for recipes. Please try again later.</p>
      </div>
    `

    if (searchSummary) {
      searchSummary.textContent = "Error searching for recipes"
    }
  }
}

function applyFilters() {
  const recipesData = recipeResults.getAttribute("data-recipes")
  if (!recipesData) return

  const recipes = JSON.parse(recipesData)

  const timeFilters = Array.from(document.querySelectorAll('input[name="time"]:checked')).map((input) =>
    Number.parseInt(input.value),
  )
  const mealFilters = Array.from(document.querySelectorAll('input[name="meal"]:checked')).map((input) => input.value)

  let filteredRecipes = recipes

  if (timeFilters.length > 0) {
    filteredRecipes = filteredRecipes.filter((recipe) => {
      const cookingTime = recipe.readyInMinutes || 30
      return timeFilters.some((time) => cookingTime <= time)
    })
  }

  if (mealFilters.length > 0) {
    filteredRecipes = filteredRecipes.filter((recipe) => {
      if (!recipe.dishTypes) return false
      return mealFilters.some((meal) =>
        recipe.dishTypes.some((type) => type.toLowerCase().includes(meal.toLowerCase())),
      )
    })
  }

  if (searchSummary) {
    const urlParams = new URLSearchParams(window.location.search)
    const ingredients = urlParams.get("ingredients")
    const diet = urlParams.get("diet")

    searchSummary.textContent = `Found ${filteredRecipes.length} recipes with: ${ingredients}${diet ? ` (${diet})` : ""}`

    if (timeFilters.length > 0 || mealFilters.length > 0) {
      searchSummary.textContent += " (filtered)"
    }
  }

  displayRecipes(recipeResults, filteredRecipes)
}

document.addEventListener("DOMContentLoaded", initPage)

