daycares = new Mongo.Collection('daycares');
zipCodes = new Mongo.Collection('zipCodes');
reviews = new Mongo.Collection('reviews');

Deps.autorun( function() {  //turns user into a reactive variable??
  user = Meteor.user();
  if(user){
      var username = user.username;
  }
});

Meteor.startup(function() {
  GoogleMaps.load({
    libraries: 'places'  // also accepts an array if you need more than one
  });

  //need to wait till Meteor has loaded before calling Stripe
  var stripeKey = Meteor.settings.public.stripe.testPublishableKey;
	Stripe.setPublishableKey(stripeKey);

	STRIPE = {
		getToken: function (domElement, card, cb) {
			Stripe.card.createToken(card, function(status, response) {
				if(response.error) {
					alert(response.error.message, "danger");
				} else {
					STRIPE.setToken(response.id, domElement, cb);
				}
			});
		},
		setToken: function (token, domElement, cb) {
			$(domElement).append($("<input type='hidden' name='stripeToken' />").val(token));
			cb();
		}
	};
});

// example daycare
// {
//   "iD": "97147",
//   "name":"Camille McCain",
//   "address":"3975 NW COUNTY ROAD 0010, CORSICANA",
//   "phone":"903-872-5283",
//   "email":"c-mccain@msn.com",
//   "website":null,
//   "accepts":"Toddler, Pre-Kindergarten, School",
//   "hours":"07:00 AM-05:30 PM",
//   "days":"MonTueWedThuFri",
//   "parttime":"N",
//   "transportation":"N",
//   "capacity":"12",
//   "lat":"32.149995267391198",
//   "lng":"-96.5019173920155",
//   "violations": [{
//       "violation":"747.13",
//       "risk":"Low"
//     },
//     {
//       "violation":"747.5",
//       "risk":"Medium"
//     },
//     {
//       "violation":"747.6",
//       "risk":"Medium"
//     },
//     {
//       "violation":"747.35",
//       "risk":"High"
//     }
//   ]
// }
