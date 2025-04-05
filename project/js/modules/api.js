// API Module for MealMatch

// API configuration
const API_KEY = "demo-key" // Replace with your actual API key in production
const BASE_URL = "https://api.spoonacular.com/recipes"

/**
 * Fetch featured recipes from the API
 * @returns {Promise<Array>} Array of recipe objects
 */
export async function fetchFeaturedRecipes() {
  try {
    // For demo purposes, we'll use a local JSON file instead of making an actual API call
    // In a real application, you would use the commented code below

    // const response = await fetch(`${BASE_URL}/random?number=6&apiKey=${API_KEY}`);
    // if (!response.ok) throw new Error('Failed to fetch featured recipes');
    // const data = await response.json();
    // return data.recipes;

    // Using local data for demo
    const response = await fetch("../data/featured-recipes.json")
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
    // For demo purposes, we'll use a local JSON file instead of making an actual API call
    // In a real application, you would use the commented code below

    // let url = `${BASE_URL}/findByIngredients?ingredients=${ingredients}&number=12&apiKey=${API_KEY}`;
    // if (diet) {
    //   url += `&diet=${diet}`;
    // }
    // const response = await fetch(url);
    // if (!response.ok) throw new Error('Failed to search recipes');
    // return await response.json();

    // Using local data for demo
    const response = await fetch("../data/search-results.json")
    if (!response.ok) throw new Error("Failed to search recipes")
    const data = await response.json()

    // Filter results based on diet if specified
    if (diet) {
      return data.results.filter((recipe) => recipe.diets && recipe.diets.includes(diet.toLowerCase()))
    }

    return data.results
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
    // For demo purposes, we'll use a local JSON file instead of making an actual API call
    // In a real application, you would use the commented code below

    // const response = await fetch(`${BASE_URL}/${recipeId}/information?apiKey=${API_KEY}`);
    // if (!response.ok) throw new Error('Failed to get recipe details');
    // return await response.json();

    // Using local data for demo
    const response = await fetch("../data/recipe-details.json")
    if (!response.ok) throw new Error("Failed to get recipe details")
    const data = await response.json()

    // Find the recipe with the matching ID
    const recipe = data.recipes.find((r) => r.id === Number.parseInt(recipeId))
    return recipe || data.recipes[0] // Return first recipe as fallback
  } catch (error) {
    console.error("Error getting recipe details:", error)
    throw error
  }
}

