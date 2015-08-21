daycares = new Mongo.Collection('daycares');
zipCodes = new Mongo.Collection('zipCodes');
reviews = new Mongo.Collection('reviews');
waitlists = new Mongo.Collection('waitlists');
pictures = new Mongo.Collection('pictures');

Deps.autorun(function() { //turns user into a reactive variable??
  user = Meteor.user();
  if (user) {
    var username = user.username;
  }
});

Meteor.startup(function() {
  GoogleMaps.load({
    libraries: 'places' // also accepts an array if you need more than one
  });

  //need to wait till Meteor has loaded before calling Stripe
  var stripeKey = Meteor.settings.public.stripe.testPublishableKey;
  Stripe.setPublishableKey(stripeKey);
  // waitlists.insert({'daycareID':'9999', 'userID': '1000', 'children': [{"name": "cora", "age": 2}], 'address': '78201 South Street, Austin TX 78709', 'phone': '512555555', 'email': 'johndoe@john.doe', 'startDate': '08/20/2015'})
  //daycares.update({iD: daycareID}, { $push: { waitlist: waitlists._id }})
});

Template.main.helpers({
  isUser: function(){
    if (Meteor.user()) {
      console.log('returning true in main isuser')
      return true
    }
    return false
  }
});

Template.main.events({
  'click #dashboardAnchor': function(){
    console.log('CLICK')
    FlowRouter.go('/user_dashboard/'+Meteor.user()._id)
  }
})

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
//   ],
//	"waitlist": [1234, 15544, 23345]
// }
