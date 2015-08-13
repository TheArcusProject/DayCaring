//to include in html add {{> daycareinfo}}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// this template sets lat and lng on Session

Template.daycareinfo.helpers({
  getDaycare: function() {
    return Template.instance().daycare();
  },
  daycaresArray : function() {
    return Template.instance().daycareArr();
  }
});

  
Template.daycareinfo.events({
  //submit daycare review
  reviewSubmit: function() {

  },
  //check compliance on a daycare
  checkCompliance: function() {

  }
});

Template.daycareinfo.onCreated(function() {
  // https://www.discovermeteor.com/blog/template-level-subscriptions/
  var instance = this;
  instance.loaded = new ReactiveVar(0);

  instance.autorun(function(){
    instance.subscribe('daycare', FlowRouter.getParam('daycareId'), function(){
      console.log(daycare);
      var daycareObj = daycare.find().fetch();
      Session.set('lat',daycareObj.lat);
      Session.set('lng',daycareObj.lng);
    });
    var localSubscription = instance.subscribe('localDaycares',
        Session.get('lat'),Session.get('lng'));
  });

  instance.daycare = function(){
    return daycare.find({}); 
  }

  instance.daycareArr = function(){
    return localDaycares.find({});
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
