//to include in html add {{> daycareinfo}}

if (Meteor.isClient) {
  var daycare;

  Template.daycareinfo.helpers({
    address: function() {
      if (daycare) {
        return daycare[12] + daycare[13]
      }
    },
    phoneNumber: function() {
      if (daycare) {
        return daycare[16]
      }
    },
    operationHours: function() {
      if (daycare) {
        return daycare[19]
      }
    },
    website: function() {
      if (daycare) {
        return daycare[31]
      }
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
    var dayCareID = FlowRouter.getParam('daycareId');
    var daycares = localSchools.find().fetch();
    for (var i = 0; i < daycares.length; i++) {
      if (daycares[i][0] === parseInt(dayCareID)) {
        daycare = daycares[i]
        console.log(daycare)
      }
    }

  })
}
