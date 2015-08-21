Template.paymentModal.helpers({
  getDaycareName: function() {
    return this.name;
  }
})
Template.paymentModal.events({
  "click #ccsubmit": function(e) {
    ccNum = $('[data-stripe="cardNumber"]').val();
    cvc = $('[data-stripe="cvc"').val();
    expMo = $('[data-stripe="expMo"').val();
    expYr = $('[data-stripe="expYr"').val();
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
          console.log("add this user to database!")
        }
      });
      //add user to collection
      var daycare = FlowRouter.getParam('daycareId');
      var currentUser = Meteor.user();
      Meteor.call('addToWaitlist', daycare, currentUser.profile.name, parentName, childName, age, address, city, zippycode, phoneNumber, startDate, function(err, results) {
        if(err) { 
          console.log(err);
        } else {
          console.log("success");
          daycares.update({iD: daycare}, {$push: {waitlist: this._id}});
        }
      })
    });
  }
})
