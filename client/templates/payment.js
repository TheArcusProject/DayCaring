
STRIPE.getToken('#ccsubmit', {
	ccNum: $('[data-stripe="cardNumber"]').val(),
	expMon: $('[data-stripe="expMo"').val(),
	expYr: $('[data-stripe="expYr"').val(),
	cvc: $('[data-stripe="cvc"').val()
}, function(status, response) {
	 	stripeToken = response.id;
	 	Meteor.call("chargeCard", stripeToken);
})
