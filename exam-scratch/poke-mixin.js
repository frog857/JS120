const steelMixin = {
  ironTail() {
    console.log(`${this.nickName} used iron tail.`);
  },
}

const electricMixin = {
  thunder() {
    console.log(`${this.nickName} used THUNDER`);
  }
}

class Magnemite {
  constructor(nickName) {
    this.nickName = nickName;  
  }
}

Object.assign(Magnemite.prototype, steelMixin, electricMixin);

let shocky = new Magnemite("shocky");

shocky.thunder();
shocky.ironTail();

