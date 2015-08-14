// a sub collection of daycares populated by localDaycares(lat,lng) publication
localDaycares = new Mongo.Collection('localDaycares');
// a single daycare populated by daycare(daycareId) publication
daycare = new Mongo.Collection('daycare');
// a sub collection of reviews populated by schoolReviews(id) publication
getReviews = new Mongo.Collection('getReviews');
// the entire collection zipCodes populated by zipCodes() publication
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
