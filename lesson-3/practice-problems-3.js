function createInvoice(services = {}) {
  let obj = {
    phone: services.phone || 3000,
    internet: services.internet || 5500,
    payments: 0,
  }
  // ORIGINAL SOLUTION
  //obj.phone = services.phone ? services.phone : 3000;
  //obj.internet = services.internet ? services.internet : 5500;


  obj.total = function() {
    return this.internet + this.phone;
  }

  obj.addPayment = function(payment) {
    this.payments += payment.total();
  }

  obj.addPayments = function(payments) {
    for (let i = 0; i < payments.length; i++) {
      this.addPayment(payments[i]);
    }
  }

  obj.amountDue = function() {
    return (this.total() - this.payments);
  }

  return obj;
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


function invoiceTotal(invoices) {
  let total = 0;

  for (let index = 0; index < invoices.length; index += 1) {
    total += invoices[index].total();
    console.log(invoices[index], total)
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({ internet: 6500 }));
invoices.push(createInvoice({ phone: 2000 }));
invoices.push(createInvoice({
  phone: 1000,
  internet: 4500,
}));

//console.log(invoiceTotal(invoices)); // 31000

