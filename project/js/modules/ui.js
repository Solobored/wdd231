/**
 * Display recipes in a container
 * @param {HTMLElement} container - The container element
 * @param {Array} recipes - Array of recipe objects
 */
export function displayRecipes(container, recipes) {
  if (!container) return

  // Clear loading message
  container.innerHTML = ""

  if (!recipes || recipes.length === 0) {
    container.innerHTML = '<p class="no-results">No recipes found. Try different ingredients.</p>'
    return
  }

  // Create recipe cards
  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("article")
    recipeCard.className = "recipe-card"

    // Create recipe image with lazy loading
    const imageUrl = recipe.image || "images/recipe-placeholder.webp"

    recipeCard.innerHTML = `
      <div class="recipe-image">
        <img src="${imageUrl}" alt="${recipe.title}" loading="lazy">
      </div>
      <div class="recipe-content">
        <h3 class="recipe-title">${recipe.title}</h3>
        <div class="recipe-info">
          <span>${recipe.readyInMinutes || 30} mins</span>
          <span>${recipe.servings || 4} servings</span>
        </div>
        <p class="recipe-description">${recipe.summary ? truncateText(stripHtml(recipe.summary), 100) : "A delicious recipe made with your ingredients."}</p>
        <div class="recipe-tags">
          ${generateRecipeTags(recipe)}
        </div>
        <button class="view-recipe" data-recipe-id="${recipe.id}">View Recipe</button>
      </div>
    `

    container.appendChild(recipeCard)
  })

  // Add event listeners to view recipe buttons
  const viewButtons = container.querySelectorAll(".view-recipe")
  viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const recipeId = button.getAttribute("data-recipe-id")
      openRecipeModal(recipeId)
    })
  })
}

/**
 * Display recent searches
 * @param {HTMLElement} container - The container element
 * @param {Array} searches - Array of recent search objects
 */
export function displayRecentSearches(container, searches) {
  if (!container) return

  if (!searches || searches.length === 0) {
    container.innerHTML = '<p class="no-searches">Your recent searches will appear here.</p>'
    return
  }

  container.innerHTML = ""

  // Create recent search items
  searches.forEach((search) => {
    const searchItem = document.createElement("div")
    searchItem.className = "recent-search-item"
    searchItem.textContent = search.ingredients
    if (search.diet) {
      searchItem.textContent += ` (${search.diet})`
    }

    // Add click event to perform the search again
    searchItem.addEventListener("click", () => {
      window.location.href = `recipes.html?ingredients=${encodeURIComponent(search.ingredients)}&diet=${encodeURIComponent(search.diet || "")}`
    })

    container.appendChild(searchItem)
  })
}

/**
 * Setup the recipe modal
 */
export function setupModal() {
  const modal = document.getElementById("recipe-modal")
  const closeModal = document.querySelector(".close-modal")

  if (modal && closeModal) {
    // Close modal when clicking the close button
    closeModal.addEventListener("click", () => {
      modal.style.display = "none"
    })

    // Close modal when clicking outside the modal content
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none"
      }
    })

    // Close modal when pressing Escape key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.style.display === "block") {
        modal.style.display = "none"
      }
    })
  }
}

/**
 * Open the recipe modal with details
 * @param {string} recipeId - The ID of the recipe
 */
export async function openRecipeModal(recipeId) {
  const modal = document.getElementById("recipe-modal")
  const modalContent = document.getElementById("modal-recipe-content")

  if (!modal || !modalContent) return

  // Show loading state
  modalContent.innerHTML = '<div class="loading">Loading recipe details...</div>'
  modal.style.display = "block"

  try {
    // Import the API module dynamically to avoid circular dependencies
    const { getRecipeDetails } = await import("./api.js")
    const recipe = await getRecipeDetails(recipeId)

    if (!recipe) {
      throw new Error("Recipe not found")
    }

    modalContent.innerHTML = `
      <div class="recipe-detail-header">
        <h2 class="recipe-detail-title">${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe-detail-image" loading="lazy">
        <div class="recipe-detail-info">
          <div class="recipe-detail-info-item">
            <span>Ready in: ${recipe.readyInMinutes || 30} minutes</span>
          </div>
          <div class="recipe-detail-info-item">
            <span>Servings: ${recipe.servings || 4}</span>
          </div>
          ${
            recipe.healthScore
              ? `
          <div class="recipe-detail-info-item">
            <span>Health Score: ${recipe.healthScore}/100</span>
          </div>
          `
              : ""
          }
        </div>
      </div>
      
      <div class="recipe-detail-section">
        <h3>Ingredients</h3>
        <ul class="ingredients-list">
          ${
            recipe.extendedIngredients
              ? recipe.extendedIngredients
                  .map(
                    (ingredient) => `
            <li>${ingredient.original || ingredient.name}</li>
          `,
                  )
                  .join("")
              : "<li>Ingredients not available</li>"
          }
        </ul>
      </div>
      
      <div class="recipe-detail-section">
        <h3>Instructions</h3>
        ${
          recipe.instructions
            ? `
          <ol class="instructions-list">
            ${parseInstructions(recipe.instructions)}
          </ol>
        `
            : "<p>Instructions not available</p>"
        }
      </div>
      
      ${
        recipe.summary
          ? `
      <div class="recipe-detail-section">
        <h3>Summary</h3>
        <p>${stripHtml(recipe.summary)}</p>
      </div>
      `
          : ""
      }
    `
  } catch (error) {
    console.error("Error opening recipe modal:", error)
    modalContent.innerHTML = `
      <div class="error-message">
        <p>Sorry, we couldn't load the recipe details. Please try again later.</p>
      </div>
    `
  }
}

/**
 * Generate recipe tags HTML
 * @param {Object} recipe - Recipe object
 * @returns {string} HTML string of recipe tags
 */
function generateRecipeTags(recipe) {
  const tags = []

  if (recipe.vegetarian) tags.push("Vegetarian")
  if (recipe.vegan) tags.push("Vegan")
  if (recipe.glutenFree) tags.push("Gluten-Free")
  if (recipe.dairyFree) tags.push("Dairy-Free")

  if (recipe.diets && recipe.diets.length > 0) {
    recipe.diets.forEach((diet) => {
      // Convert diet to title case and add if not already included
      const formattedDiet = diet
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      if (!tags.includes(formattedDiet)) {
        tags.push(formattedDiet)
      }
    })
  }

  // Limit to 3 tags
  const limitedTags = tags.slice(0, 3)

  return limitedTags.map((tag) => `<span class="recipe-tag">${tag}</span>`).join("")
}

/**
 * Parse recipe instructions into list items
 * @param {string} instructions - Recipe instructions text
 * @returns {string} HTML string of instruction list items
 */
function parseInstructions(instructions) {
  // Check if instructions are already in steps
  if (instructions.includes("<ol>") || instructions.includes("<li>")) {
    // Extract list items from HTML
    const liRegex = /<li>(.*?)<\/li>/g
    const matches = [...instructions.matchAll(liRegex)]

    if (matches.length > 0) {
      return matches.map((match) => `<li>${stripHtml(match[1])}</li>`).join("")
    }
  }

  // Split by periods or numbered steps
  let steps = instructions.split(/\.\s+|\n/)

  // Filter out empty steps
  steps = steps.filter((step) => step.trim().length > 0)

  // If no steps found, return the whole text as one step
  if (steps.length === 0) {
    return `<li>${instructions}</li>`
  }

  return steps
    .map((step) => {
      // Remove numbers at the beginning of steps
      const cleanStep = step.replace(/^\d+[.)]\s*/, "").trim()
      if (cleanStep.length > 0) {
        return `<li>${cleanStep}</li>`
      }
      return ""
    })
    .join("")
}

/**
 * Truncate text to a specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + "..."
}

/**
 * Strip HTML tags from text
 * @param {string} html - HTML string
 * @returns {string} Plain text
 */
function stripHtml(html) {
  const temp = document.createElement("div")
  temp.innerHTML = html
  return temp.textContent || temp.innerText || ""
}

