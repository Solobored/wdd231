
const API_KEY = "demo-key" 
const BASE_URL = "https://api.spoonacular.com/recipes"

/**
 * Fetch featured recipes from the API
 * @returns {Promise<Array>} Array of recipe objects
 */
export async function fetchFeaturedRecipes() {
  try {


    const response = await fetch("data/featured-recipes.json")
    if (!response.ok) throw new Error("Failed to fetch featured recipes")
    const data = await response.json()
    return data.recipes
  } catch (error) {
    console.error("Error fetching featured recipes:", error)
    throw error
  }
}

/**
 * Search for recipes based on ingredients
 * @param {string} ingredients - Comma-separated list of ingredients
 * @param {string} diet - Optional diet preference
 * @returns {Promise<Array>} Array of recipe objects
 */
export async function searchRecipes(ingredients, diet = "") {
  try {

    const response = await fetch("data/search-results.json")
    if (!response.ok) throw new Error("Failed to search recipes")
    const data = await response.json()

    const searchTerms = ingredients
      .toLowerCase()
      .split(",")
      .map((term) => term.trim())

    let filteredResults = data.results.filter((recipe) => {
      const titleMatches = searchTerms.some((term) => recipe.title.toLowerCase().includes(term))

      return titleMatches
    })

    // Further filter by diet if specified
    if (diet) {
      filteredResults = filteredResults.filter((recipe) => recipe.diets && recipe.diets.includes(diet.toLowerCase()))
    }

    return filteredResults
  } catch (error) {
    console.error("Error searching recipes:", error)
    throw error
  }
}

/**
 * Get detailed recipe information
 * @param {number} recipeId - The ID of the recipe
 * @returns {Promise<Object>} Recipe detail object
 */
export async function getRecipeDetails(recipeId) {
  try {

    const response = await fetch("data/recipe-details.json")
    if (!response.ok) throw new Error("Failed to get recipe details")
    const data = await response.json()

    // Find the recipe with the matching ID
    const recipe = data.recipes.find((r) => r.id === Number.parseInt(recipeId))
    return recipe || data.recipes[0] 
  } catch (error) {
    console.error("Error getting recipe details:", error)
    throw error
  }
}

