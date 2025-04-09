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

    // Convert ingredients to lowercase for caseinsensitive comparison
    const searchTerms = ingredients
      .toLowerCase()
      .split(",")
      .map((term) => term.trim())

    // Filter results based on ingredients and diet
    let filteredResults = data.results.filter((recipe) => {
      // Check if recipe title contains any of the search terms
      const titleMatches = searchTerms.some((term) => recipe.title.toLowerCase().includes(term))

      // Check if recipe summary contains any of the search terms
      const summaryMatches = recipe.summary
        ? searchTerms.some((term) => recipe.summary.toLowerCase().includes(term))
        : false

      const ingredientMatches = recipe.extendedIngredients
        ? recipe.extendedIngredients.some((ingredient) =>
            searchTerms.some(
              (term) =>
                (ingredient.name && ingredient.name.toLowerCase().includes(term)) ||
                (ingredient.original && ingredient.original.toLowerCase().includes(term)),
            ),
          )
        : false

      // Return true if any match is found
      return titleMatches || summaryMatches || ingredientMatches
    })

    // filter by diet if specified
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
    if (!recipe) {
      throw new Error(`Recipe with ID ${recipeId} not found`)
    }
    return recipe
  } catch (error) {
    console.error("Error getting recipe details:", error)
    throw error
  }
}
