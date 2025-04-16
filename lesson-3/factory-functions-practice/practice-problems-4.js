function _createPayment(payments = {}) {

  if (Object.keys(payments).length === 0) {
    //console.log("First Logic: " + payments)
    return {
      amount: 0,
      total: function() {
        return this.amount;
      }
    }
  }

  if (payments.amount !== undefined) {
    //console.log("Second Logic: " + payments)
    return {
      amount: payments.amount,
      total: function() {
        return this.amount;
      }
    }
  }
  
  //console.log("Third Logic: " + payments);
  let myObj = {};
  
  myObj.internet = payments.internet ? payments.internet : 0;
  myObj.phone = payments.phone ? payments.phone : 0;
  myObj.total = function total() {
    return this.internet + this.phone;
  }

  return myObj;
}

function createPayment(services = {}) {
  let payment = {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount,
  }

  payment.total = function() {
    return this.amount || this.phone + this.internet;
  }

  return payment;
}

function paymentTotal(payments) {
  return payments.reduce((sum, payment, idx)  => {
    console.log(payments[idx])
    //console.log(payment.total(), sum);
    return sum + payment.total();
  }, 0);
}

let payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500,
}));

payments.push(createPayment({
  phone: 2000,
}));

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));

payments.push(createPayment({
  amount: 10000,
}));

console.log(paymentTotal(payments));      // => 24000