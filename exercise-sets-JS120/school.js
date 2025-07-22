const school = {
  students: [],


  addStudent(name, year) {
    // validates year
    // if year valid: create a new student and push to the list of students
    let validYears = ["1st", "2nd", "3rd", "4th", "5th", 1, 2, 3, 4, 5];
    if (validYears.includes(year)) {
      return typeof year === "number" ? createStudent(name, this.convertNumber(year)) : createStudent(name, year);
    } else {
      console.log("Invalid year");
    }
  },

  enrollStudent(student, course) {
    //takes a course (validates it?)
      // adds the course to the student
  },

  addGrade(student, course, grade) {
    // adds a grade to the course of a student
  },

  getReportCard(student) {
    // logs the report card, using "in progress" if not avail
  },

  getCourseReport(course) {
    // if no grades posted, logs undefined, exits
    
    // logs the course
      // logs each of the students grades
    // logs --- and Course Avg
  },

  convertNumber(numberYear) {
    let suffixedYear;
    switch (numberYear) {
      case 1: 
        suffixedYear = "1st";
        break;
      case 2: 
        suffixedYear = "2nd";
        break;
      case 3:
        suffixedYear = "3rd";
        break;
      case 4:
        suffixedYear = "4th";
        break;
      default:
        suffixedYear = "5th";
    }
  }
}

function createStudent(name, year) {
  return {
    name: name,
    year: year > 20 ? 1 : year,
    courses: [],
    
    info: function info() {
      console.log(`${this.name} is a ${this.year} year student.`);
    },

    listCourses: function listCourses() {
      return this.courses;
    },

    addCourse: function addCourse(course) {
      this.courses.push(course);
    },

    addNote: function addNote(code, note) {
      // this.courses.forEach(course => {
      //   if (course["code"] === code) {
      //     course["note"] ? course["note"] += ". " + note : course["note"] = note;
      //   }
      // })

      let course = this.courses.filter(course => {
        return course["code"] === code
      })[0];

      if (course) {
        course["note"] ? course["note"] += `. ${note}` : course["note"] = note;
      }
    },

    viewNotes: function viewNotes() {
      this.courses.forEach(course => {
        if (course.note) console.log(`${course.name}: ${course.note}.`);
      })
    },

    updateNote: function updateNote(code, note) {
      this.courses.forEach(course => {
        if (course["code"] === code) {
          course["note"] = note;
        }
      })
    }
  }
}


school.addStudent("paul", "3rd");



// Examples of created student objects with grades; methods
// on the objects are not shown here for brevity. The
// following are only showing the properties that aren't
// methods for the three objects

console.log(school.paul);
// {
//   name: 'Paul',
//   year: '3rd',
//   courses: [
//     { name: 'Math', code: 101, grade: 95, },
//     { name: 'Advanced Math', code: 102, grade: 90, },
//     { name: 'Physics', code: 202, }
//   ],
// }

//console.log(mary);
// {
//   name: 'Mary',
//   year: '1st',
//   courses: [
//     { name: 'Math', code: 101, grade: 91, },
//   ],
// }

//console.log(kim);
// {
//   name: 'Kim',
//   year: '2nd',
//   courses: [
//     { name: 'Math', code: 101, grade: 93, },
//     { name: 'Advanced Math', code: 102, grade: 90, },
//    ],
// }