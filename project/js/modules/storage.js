// Storage Module for MealMatch

// Maximum number of recent searches to store
const MAX_RECENT_SEARCHES = 5

/**
 * Get recent searches from localStorage
 * @returns {Array} Array of recent search objects
 */
export function getRecentSearches() {
  try {
    const searches = localStorage.getItem("recentSearches")
    return searches ? JSON.parse(searches) : []
  } catch (error) {
    console.error("Error getting recent searches:", error)
    return []
  }
}

/**
 * Save a search to localStorage
 * @param {string} ingredients - Ingredients search query
 * @param {string} diet - Diet preference
 */
export function saveSearch(ingredients, diet = "") {
  try {
    // Get existing searches
    const searches = getRecentSearches()

    // Create new search object
    const newSearch = {
      ingredients,
      diet,
      timestamp: Date.now(),
    }

    // Check if this search already exists
    const existingIndex = searches.findIndex(
      (search) => search.ingredients.toLowerCase() === ingredients.toLowerCase() && search.diet === diet,
    )

    // If it exists, remove it (we'll add it back at the beginning)
    if (existingIndex !== -1) {
      searches.splice(existingIndex, 1)
    }

    // Add new search to the beginning
    searches.unshift(newSearch)

    // Limit to MAX_RECENT_SEARCHES
    const limitedSearches = searches.slice(0, MAX_RECENT_SEARCHES)

    // Save to localStorage
    localStorage.setItem("recentSearches", JSON.stringify(limitedSearches))
  } catch (error) {
    console.error("Error saving search:", error)
  }
}

/**
 * Clear all recent searches
 */
export function clearRecentSearches() {
  try {
    localStorage.removeItem("recentSearches")
  } catch (error) {
    console.error("Error clearing recent searches:", error)
  }
}

/**
 * Save a favorite recipe
 * @param {Object} recipe - Recipe object to save
 */
export function saveFavoriteRecipe(recipe) {
  try {
    // Get existing favorites
    const favorites = getFavoriteRecipes()

    // Check if recipe already exists in favorites
    const exists = favorites.some((fav) => fav.id === recipe.id)

    if (!exists) {
      // Add recipe to favorites
      favorites.push(recipe)

      // Save to localStorage
      localStorage.setItem("favoriteRecipes", JSON.stringify(favorites))
    }
  } catch (error) {
    console.error("Error saving favorite recipe:", error)
  }
}

/**
 * Get favorite recipes from localStorage
 * @returns {Array} Array of favorite recipe objects
 */
export function getFavoriteRecipes() {
  try {
    const favorites = localStorage.getItem("favoriteRecipes")
    return favorites ? JSON.parse(favorites) : []
  } catch (error) {
    console.error("Error getting favorite recipes:", error)
    return []
  }
}

/**
 * Remove a recipe from favorites
 * @param {number} recipeId - ID of the recipe to remove
 */
export function removeFavoriteRecipe(recipeId) {
  try {
    // Get existing favorites
    const favorites = getFavoriteRecipes()

    // Filter out the recipe to remove
    const updatedFavorites = favorites.filter((recipe) => recipe.id !== recipeId)

    // Save to localStorage
    localStorage.setItem("favoriteRecipes", JSON.stringify(updatedFavorites))
  } catch (error) {
    console.error("Error removing favorite recipe:", error)
  }
}

