
document.addEventListener("DOMContentLoaded", () => {
  const courses = [
    {
      code: "CSE 110",
      name: "Introduction to Programming",
      credits: 3,
      completed: true,
      subject: "CSE",
    },
    {
      code: "CSE 111",
      name: "Programming with Functions",
      credits: 3,
      completed: true,
      subject: "CSE",
    },
    {
      code: "CSE 210",
      name: "Programming with Classes",
      credits: 3,
      completed: false,
      subject: "CSE",
    },
    {
      code: "WDD 130",
      name: "Web Fundamentals",
      credits: 3,
      completed: true,
      subject: "WDD",
    },
    {
      code: "WDD 131",
      name: "Web Design",
      credits: 3,
      completed: true,
      subject: "WDD",
    },
    {
      code: "WDD 231",
      name: "Web Frontend Development I",
      credits: 3,
      completed: false,
      subject: "WDD",
    },
  ]

  const courseContainer = document.getElementById("course-container")
  const totalCreditsElement = document.getElementById("total-credits")
  const allBtn = document.getElementById("all-btn")
  const cseBtn = document.getElementById("cse-btn")
  const wddBtn = document.getElementById("wdd-btn")


  function displayCourses(coursesToDisplay) {
    courseContainer.innerHTML = ""

    coursesToDisplay.forEach((course) => {
      const courseCard = document.createElement("div")
      courseCard.className = `course-card ${course.completed ? "completed" : ""}`
      courseCard.textContent = `${course.code} - ${course.name}`
      courseContainer.appendChild(courseCard)
    })

    const totalCredits = coursesToDisplay.reduce((total, course) => total + course.credits, 0)
    totalCreditsElement.textContent = totalCredits
  }

  displayCourses(courses)

  allBtn.addEventListener("click", () => {
    setActiveButton(allBtn)
    displayCourses(courses)
  })

  cseBtn.addEventListener("click", () => {
    setActiveButton(cseBtn)
    const cseOnly = courses.filter((course) => course.subject === "CSE")
    displayCourses(cseOnly)
  })

  wddBtn.addEventListener("click", () => {
    setActiveButton(wddBtn)
    const wddOnly = courses.filter((course) => course.subject === "WDD")
    displayCourses(wddOnly)
  })

  function setActiveButton(activeButton) {
    ;[allBtn, cseBtn, wddBtn].forEach((btn) => {
      btn.classList.remove("active")
    })

    activeButton.classList.add("active")
  }
})

