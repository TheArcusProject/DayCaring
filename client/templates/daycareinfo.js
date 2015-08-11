//to include in html add {{> daycareinfo}}

if (Meteor.isClient) {
  var getDaycare = function(){
    var daycareID = FlowRouter.getParam('daycareId')
    var daycares = localSchools.find().fetch();
    for (var i = 0; i < daycares.length; i++) {
      if (daycares[i][0] === parseInt(daycareID)) {
        return daycares[i]
      }
    }    
  }

  Template.daycareinfo.helpers({
    address: function() {
      var daycare = getDaycare();
      return daycare[12] + daycare[13]
      
    },
    phoneNumber: function() {
      var daycare = getDaycare();
      return daycare[16]
    },
    operationHours: function() {
      var daycare = getDaycare();
      return daycare[19]
    },
    website: function() {
      var daycare = getDaycare();  
      return '<a href="http://' + daycare[31] + '">' + daycare[31] + '</a>'
    },
    partTimeCare: function(){
      var daycare = getDaycare();
      return daycare[27];
    },
    transportationProvided: function(){
      var daycare = getDaycare();
      return daycare[28];
    }
  })

  Template.daycareinfo.events({
    //submit daycare review
    reviewSubmit: function() {

    },
    //check compliance on a daycare
    checkCompliance: function() {

    }
  })

  Template.daycareinfo.onCreated(function() {
    Meteor.subscribe("localSchools", localStorage.getItem('lat'), localStorage.getItem('lng'));
  })
}
