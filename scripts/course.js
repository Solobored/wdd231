
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
      code: "WDD 130",
      name: "Web Fundamentals",
      credits: 3,
      completed: true,
      subject: "WDD",
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
      code: "WDD 131",
      name: "Introduction to CSS",
      credits: 3,
      completed: true,
      subject: "WDD",
    },
    {
      code: "WDD 231",
      name: "Advanced CSS",
      credits: 3,
      completed: false,
      subject: "WDD",
    },
  ]

  const courseCardsContainer = document.getElementById("courseCards")
  const totalCreditsElement = document.getElementById("totalCredits")
  const allBtn = document.getElementById("allBtn")
  const cseBtn = document.getElementById("cseBtn")
  const wddBtn = document.getElementById("wddBtn")


  allBtn.addEventListener("click", () => filterCourses("all"))
  cseBtn.addEventListener("click", () => filterCourses("CSE"))
  wddBtn.addEventListener("click", () => filterCourses("WDD"))

  filterCourses("all")


  function filterCourses(subject) {

    ;[allBtn, cseBtn, wddBtn].forEach((btn) => btn.classList.remove("active"))

    if (subject === "all") {
      allBtn.classList.add("active")
      displayCourses(courses)
    } else if (subject === "CSE") {
      cseBtn.classList.add("active")
      const filteredCourses = courses.filter((course) => course.subject === "CSE")
      displayCourses(filteredCourses)
    } else if (subject === "WDD") {
      wddBtn.classList.add("active")
      const filteredCourses = courses.filter((course) => course.subject === "WDD")
      displayCourses(filteredCourses)
    }
  }


  function displayCourses(coursesToDisplay) {

    courseCardsContainer.innerHTML = ""

    coursesToDisplay.forEach((course) => {
      const courseCard = document.createElement("div")
      courseCard.className = `course-card ${course.completed ? "completed" : "incomplete"}`
      courseCard.setAttribute(
        "aria-label",
        `${course.code}: ${course.name}, ${course.completed ? "Completed" : "Not completed"}`,
      )
      courseCard.textContent = course.code

      courseCard.title = `${course.name} (${course.credits} credits)`

      courseCardsContainer.appendChild(courseCard)
    })

    const totalCredits = coursesToDisplay.reduce((total, course) => total + course.credits, 0)
    totalCreditsElement.textContent = totalCredits
  }
})

