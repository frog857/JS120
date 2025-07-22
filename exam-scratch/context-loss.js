let checkSubstr = {
  substr: "cat",
  hasLetters(words) {
    let self = this;
    return words.filter(function (word) {
      //console.log(this);
      return word.includes(self.substr);
    });
  },
};

let words = ["category", "BBQ", "capstone", "Cat"];
console.log(checkSubstr.hasLetters(words));