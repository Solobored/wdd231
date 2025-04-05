
import { fetchFeaturedRecipes } from "./modules/api.js"
import { displayRecipes, displayRecentSearches, setupModal } from "./modules/ui.js"
import { getRecentSearches, saveSearch } from "./modules/storage.js"


const searchForm = document.getElementById("search-form")
const ingredientSearch = document.getElementById("ingredient-search")
const featuredRecipesContainer = document.getElementById("featured-recipes-container")
const recentSearchesContainer = document.getElementById("recent-searches-container")


async function initApp() {

  setupEventListeners()

  displayRecentSearches(recentSearchesContainer, getRecentSearches())

  try {
    const featuredRecipes = await fetchFeaturedRecipes()
    displayRecipes(featuredRecipesContainer, featuredRecipes)
  } catch (error) {
    console.error("Error loading featured recipes:", error)
    featuredRecipesContainer.innerHTML = `
      <div class="error-message">
        <p>Sorry, we couldn't load the featured recipes. Please try again later.</p>
      </div>
    `
  }

  setupModal()
}

function setupEventListeners() {
  if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
      const ingredients = ingredientSearch.value.trim()
      const dietPreference = document.getElementById("diet-preference").value

      if (ingredients) {
        saveSearch(ingredients, dietPreference)
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

document.addEventListener("DOMContentLoaded", initApp)

