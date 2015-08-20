//to include in html add {{> daycareinfo}}
var isUserAdminReact = new ReactiveVar(false);

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
  isUserAdmin: function() {
    Meteor.call('checkAdmin',FlowRouter.getParam('daycareId'),user._id, function(err,result){
      isUserAdminReact.set(result);
    })
    return isUserAdminReact.get();
  },
  getDaycare: function() {
    var dc = daycares.find().fetch();
    return dc;
  },
  getReviews: function() {
    var revObj = {};
    var cursor = reviews.find({},{sort:{createdAt:-1}});
    revObj.reviews =  cursor.fetch();
    revObj.isAdmin = false;
    return revObj;
  },
  getPictures: function() {
    var picturesArr = pictures.find().fetch();
    return picturesArr;
  },
  hasReviews: function() {
    return this.reviews.length > 0;
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
  },

  checkBool: function(str){
    if(str === "Y") {
      return true;
    } else {
      return false
    }
  },
});

Template.daycareinfo.events({
  'click .represent': function(e) {
    e.preventDefault();
    FlowRouter.go('/authrepresent/'+ FlowRouter.getParam('daycareId'));
  },
  'click .backToResults': function(e){
    e.preventDefault();
    FlowRouter.go('/searchresults/'+this.lat+'/'+this.lng);
  },
  'click .review': function(e) {
    e.preventDefault();
    $('#reviewModal').foundation('reveal', 'open');
  },
  'click .admin': function(e) {
    e.preventDefault();
    FlowRouter.go('/represent/'+ FlowRouter.getParam('daycareId'));
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
