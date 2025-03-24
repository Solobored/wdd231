// Thank you page script for Araucania Chamber of Commerce
document.addEventListener("DOMContentLoaded", () => {
  // Get URL parameters
  const params = new URLSearchParams(window.location.search)

  // Get form data container
  const formDataContainer = document.getElementById("form-data")

  if (formDataContainer) {
    // Check if there are parameters to display
    if (params.toString()) {
      // Create HTML to display form data
      let formDataHTML = '<dl class="form-data-list">'

      // Get required fields
      const firstName = params.get("first-name")
      const lastName = params.get("last-name")
      const email = params.get("email")
      const phone = params.get("phone")
      const businessName = params.get("business-name")
      const timestamp = params.get("timestamp")

      // Format timestamp
      let formattedDate = "Not provided"
      if (timestamp) {
        try {
          const date = new Date(timestamp)
          formattedDate = date.toLocaleString()
        } catch (e) {
          console.error("Error formatting date:", e)
          formattedDate = timestamp
        }
      }

      // Add fields to HTML
      if (firstName) formDataHTML += `<dt>First Name:</dt><dd>${firstName}</dd>`
      if (lastName) formDataHTML += `<dt>Last Name:</dt><dd>${lastName}</dd>`
      if (email) formDataHTML += `<dt>Email:</dt><dd>${email}</dd>`
      if (phone) formDataHTML += `<dt>Phone:</dt><dd>${phone}</dd>`
      if (businessName) formDataHTML += `<dt>Business Name:</dt><dd>${businessName}</dd>`

      // Get membership level and format it
      const membershipLevel = params.get("membership-level")
      if (membershipLevel) {
        let formattedLevel = ""
        switch (membershipLevel) {
          case "np":
            formattedLevel = "NP Membership (Non-Profit)"
            break
          case "bronze":
            formattedLevel = "Bronze Membership"
            break
          case "silver":
            formattedLevel = "Silver Membership"
            break
          case "gold":
            formattedLevel = "Gold Membership"
            break
          default:
            formattedLevel = membershipLevel
        }
        formDataHTML += `<dt>Membership Level:</dt><dd>${formattedLevel}</dd>`
      }

      formDataHTML += `<dt>Submission Date:</dt><dd>${formattedDate}</dd>`
      formDataHTML += "</dl>"

      // Update the container
      formDataContainer.innerHTML = formDataHTML
    } else {
      // No parameters found
      formDataContainer.innerHTML =
        '<p>No submission data found. Please complete the <a href="join.html">membership application form</a>.</p>'
    }
  }
})

