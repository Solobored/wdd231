// Directory Page JavaScript with embedded member data
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded - starting script execution")
  
    try {
      // Member data directly in the script
      const members = [
        {
          name: "Araucania Eco Tours",
          address: "123 Lautaro St, Temuco, Araucania",
          phone: "+56 45 222 3344",
          website: "https://araucaniaecotours.cl",
          image: "eco-tours.png",
          membershipLevel: 3,
          description: "Sustainable tourism experiences in the Araucania region",
        },
        {
          name: "Mapuche Crafts Cooperative",
          address: "456 Caupolican Ave, Villarrica, Araucania",
          phone: "+56 45 233 4455",
          website: "https://mapuchecrafts.cl",
          image: "mapuche-crafts.png",
          membershipLevel: 2,
          description: "Traditional Mapuche textiles and crafts",
        },
        {
          name: "Araucania Tech Solutions",
          address: "789 Digital Blvd, Temuco, Araucania",
          phone: "+56 45 244 5566",
          website: "https://araucaniatech.cl",
          image: "tech-solutions.png",
          membershipLevel: 3,
          description: "IT services and digital transformation",
        },
        {
          name: "Southern Chile Lumber",
          address: "101 Forest Road, Angol, Araucania",
          phone: "+56 45 255 6677",
          website: "https://sclumber.cl",
          image: "lumber.png",
          membershipLevel: 2,
          description: "Sustainable forestry and wood products",
        },
        {
          name: "Araucania Fresh Produce",
          address: "202 Market St, Temuco, Araucania",
          phone: "+56 45 266 7788",
          website: "https://araucaniafresh.cl",
          image: "fresh-produce.png",
          membershipLevel: 1,
          description: "Local fruits, vegetables, and agricultural products",
        },
        {
          name: "Volcano View Hotel",
          address: "303 Villarrica View, Pucon, Araucania",
          phone: "+56 45 277 8899",
          website: "https://volcanoviewhotel.cl",
          image: "hotel.png",
          membershipLevel: 3,
          description: "Luxury accommodations with views of Villarrica Volcano",
        },
        {
          name: "Araucania Legal Services",
          address: "404 Justice Ave, Temuco, Araucania",
          phone: "+56 45 288 9900",
          website: "https://araucanialegal.cl",
          image: "legal-services.png",
          membershipLevel: 1,
          description: "Legal consultation and services for businesses and individuals",
        },
        {
          name: "Araucania Agricultural Supplies",
          address: "505 Farm Road, Victoria, Araucania",
          phone: "+56 45 299 0011",
          website: "https://agrosupplies.cl",
          image: "agricultural.png",
          membershipLevel: 2,
          description: "Seeds, fertilizers, and equipment for farmers",
        },
      ]
  
      console.log("Member data defined:", members.length, "members")
  
      // Navigation Toggle
      const hamburgerBtn = document.getElementById("hamburger-btn")
      const primaryNav = document.getElementById("primary-nav")
  
      if (hamburgerBtn && primaryNav) {
        hamburgerBtn.addEventListener("click", () => {
          primaryNav.classList.toggle("open")
          hamburgerBtn.textContent = primaryNav.classList.contains("open") ? "✕" : "☰"
          hamburgerBtn.setAttribute("aria-expanded", primaryNav.classList.contains("open") ? "true" : "false")
        })
        console.log("Navigation event listeners added")
      } else {
        console.warn("Navigation elements not found")
      }
  
      // Current Date
      const currentDateElement = document.getElementById("current-date")
      if (currentDateElement) {
        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }
        const currentDate = new Date()
        currentDateElement.textContent = currentDate.toLocaleDateString("en-US", options)
        console.log("Current date set")
      } else {
        console.warn("Current date element not found")
      }
  
      // Directory View Toggle
      const gridBtn = document.getElementById("grid-btn")
      const listBtn = document.getElementById("list-btn")
      const directoryContainer = document.getElementById("directory-container")
  
      if (gridBtn && listBtn && directoryContainer) {
        gridBtn.addEventListener("click", () => {
          directoryContainer.classList.add("grid")
          directoryContainer.classList.remove("list")
          gridBtn.classList.add("active")
          listBtn.classList.remove("active")
        })
  
        listBtn.addEventListener("click", () => {
          directoryContainer.classList.add("list")
          directoryContainer.classList.remove("grid")
          listBtn.classList.add("active")
          gridBtn.classList.remove("active")
        })
        console.log("View toggle event listeners added")
      } else {
        console.warn("View toggle elements not found")
      }
  
      // Display members
      function displayMembers() {
        const container = document.getElementById("directory-container")
        if (!container) {
          console.error("Directory container not found")
          return
        }
  
        console.log("Displaying members...")
        container.innerHTML = ""
  
        members.forEach((member, index) => {
          try {
            const memberCard = document.createElement("div")
            memberCard.className = "member-card"
  
            let levelText = ""
            let levelClass = ""
  
            switch (member.membershipLevel) {
              case 1:
                levelText = "Member"
                levelClass = "level-1"
                break
              case 2:
                levelText = "Silver Member"
                levelClass = "level-2"
                break
              case 3:
                levelText = "Gold Member"
                levelClass = "level-3"
                break
              default:
                levelText = "Member"
                levelClass = "level-1"
            }
  
            memberCard.innerHTML = `
                          <img src="images/${member.image}" alt="${member.name} Logo">
                          <h2>${member.name}</h2>
                          <p>${member.address}</p>
                          <p>${member.phone}</p>
                          <p><a href="${member.website}" target="_blank">Website</a></p>
                          <p class="member-level ${levelClass}">${levelText}</p>
                      `
  
            container.appendChild(memberCard)
            console.log(`Member ${index + 1} (${member.name}) added to display`)
          } catch (err) {
            console.error(`Error displaying member ${index}:`, err)
          }
        })
  
        console.log(`Displayed ${members.length} members`)
      }
  
      // Initial display
      displayMembers()
  
      // Footer date
      const currentYearElement = document.getElementById("current-year")
      const lastModifiedElement = document.getElementById("last-modified")
  
      if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear()
      } else {
        console.warn("Current year element not found")
      }
  
      if (lastModifiedElement) {
        lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`
      } else {
        console.warn("Last modified element not found")
      }
  
      console.log("Script execution completed successfully")
    } catch (error) {
      console.error("Critical error in directory script:", error)
      // Try to display an error message on the page
      const directoryContainer = document.getElementById("directory-container")
      if (directoryContainer) {
        directoryContainer.innerHTML = "<p>An error occurred while loading the directory. Please try again later.</p>"
      }
    }
  })
  
  