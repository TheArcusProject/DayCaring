Template.paymentModal.helpers({
  
})
Template.paymentModal.events({
  "click #ccsubmit": function(e) {
    ccNum = $('[data-stripe="cardNumber"]').val();
    cvc = $('[data-stripe="cvc"]').val();
    expMo = $('[data-stripe="expMo"]').val();
    expYr = $('[data-stripe="expYr"]').val();
    e.preventDefault();
    Stripe.card.createToken({
      number: ccNum,
      cvc: cvc,
      exp_month: expMo,
      exp_year: expYr,
    }, function(status, response) {
    	console.log("this is the response", response)
      stripeToken = response.id;
      Meteor.call('chargeCard', stripeToken, function(err) {
        if (err) {
          console.log("ERROR", err)
        } else {
          Meteor.call('feePaid',this._id);
        }
      });
    });
  }
})
