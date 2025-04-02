
class BankAccount {
  #balance;

  constructor(balance = 0) {
    this.#balance = balance;
  }

  deposit(amount) {
    if (typeof amount === "number") {
      this.#balance += amount;
      this.#checkBalance();
    }
  }

  withdraw(amount) {
    if (typeof amount === "number" && this.#balance > amount) {
      this.#balance -= amount;
      this.#checkBalance();
    } else {
      throw new RangeError(`Insufficient funds.\nYou only have $${this.#balance.toFixed(2)}, and thus cannot withdrawal $${amount.toFixed(2)}`)
    }
  }

  #checkBalance() {
    console.log("Your balance is: $" + this.#balance.toFixed(2));
  }
}

let account = new BankAccount();
account.deposit(100);
account.withdraw(50);
try {
  account.withdraw(100); // RangeError: Insufficient funds
} catch (e) {
  console.log(e);
}

console.log("made it here\n==============================")


