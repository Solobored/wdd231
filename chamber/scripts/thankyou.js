
document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search)
  const formDataContainer = document.getElementById("form-data")

  if (formDataContainer) {
    if (params.toString()) {
      let formDataHTML = '<dl class="form-data-list">'

      const firstName = params.get("first-name")
      const lastName = params.get("last-name")
      const email = params.get("email")
      const phone = params.get("phone")
      const businessName = params.get("business-name")
      const timestamp = params.get("timestamp")

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

      if (firstName) formDataHTML += `<dt>First Name:</dt><dd>${firstName}</dd>`
      if (lastName) formDataHTML += `<dt>Last Name:</dt><dd>${lastName}</dd>`
      if (email) formDataHTML += `<dt>Email:</dt><dd>${email}</dd>`
      if (phone) formDataHTML += `<dt>Phone:</dt><dd>${phone}</dd>`
      if (businessName) formDataHTML += `<dt>Business Name:</dt><dd>${businessName}</dd>`

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

      formDataContainer.innerHTML = formDataHTML
    } else {
      formDataContainer.innerHTML =
        '<p>No submission data found. Please complete the <a href="join.html">membership application form</a>.</p>'
    }
  }
})

