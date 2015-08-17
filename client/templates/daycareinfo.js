//to include in html add {{> daycareinfo}}
Template.daycareinfo.helpers({
  isLoggedIn : function () {
    if (user) {
      return true;
    } else {
      return false;
    }
  },
  isReady: function(sub) {
    if(sub) {
      return FlowRouter.subsReady(sub);
    } else {
      return FlowRouter.subsReady();
    }
  },
  getDaycare: function() {
    var dc = daycares.find().fetch();
    return dc;
  },
  getReviews: function() {
    var revObj;
    revObj.reviews =  reviews.find({},{sort:{createdAt:-1}}).fetch();
    revObj.isAdmin = false;
    return revObj;
  },
  toTitleCase: function(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })
  },
  convertBoolean: function(str) {
    if(str === "N") {
      return "No";
    } else if(str === "Y") {
      return "Yes";
    } else {
      return "N/A"
    }
  }

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
