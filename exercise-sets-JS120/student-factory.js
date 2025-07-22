function createStudent(name, year) {
  return {
    name: name,
    year: year > 20 ? 1 : year,
    courses: [],
    
    info: function info() {
      
      let suffix = "";
      switch (this.year) {
        case 11:
          suffix += "th";
          break;
        case 12: 
          suffix += "th";
          break;
        case 1:   
          suffix += "st";
          break;
        case 2:
          suffix += "nd";
          break;
        case 3:
          suffix += "rd";
          break;
        default:
          suffix += "th";
      }
      console.log(`${this.name} is a ${this.year}${suffix} year student.`);
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



let foo = createStudent('Foo', 11);
let bar = createStudent('Bar', 2);
let qux = createStudent("Qux", 5);
foo.info();
bar.info();
qux.info();
// "Foo is a 1st year student"
foo.listCourses();
// [];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
console.log(foo.listCourses());
// [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
(foo.viewNotes());
// "Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
// "Advance Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
// "Math: Fun course"
// "Advanced Math: Difficult subject"