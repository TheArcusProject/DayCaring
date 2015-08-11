//to include in html add {{> daycareinfo}}

if (Meteor.isClient) {
  

  Template.daycareinfo.helpers({
    address: function() {
      var daycareID = localStorage.getItem('daycareID')
      var daycares = localSchools.find().fetch();
      for (var i = 0; i < daycares.length; i++) {

        if (daycares[i][0] === parseInt(daycareID)) {
          var daycare = daycares[i]
        }
      }
      return daycare[12] + daycare[13]
      
    },
    phoneNumber: function() {
      var daycareID = localStorage.getItem('daycareID')
      var daycares = localSchools.find().fetch();
      for (var i = 0; i < daycares.length; i++) {
        if (daycares[i][0] === parseInt(daycareID)) {
          var daycare = daycares[i]
        }
      }  
      return daycare[16]
    },
    operationHours: function() {
      var daycareID = localStorage.getItem('daycareID')
      var daycares = localSchools.find().fetch();
      for (var i = 0; i < daycares.length; i++) {
        if (daycares[i][0] === parseInt(daycareID)) {
          var daycare = daycares[i]
        }
      }
      return daycare[19]
    },
    website: function() {
      var daycareID = localStorage.getItem('daycareID')
      var daycares = localSchools.find().fetch();
      for (var i = 0; i < daycares.length; i++) {
        if (daycares[i][0] === parseInt(daycareID)) {
          var daycare = daycares[i]
        }
      }  
      return '<a href="http://' + daycare[31] + '">' + daycare[31] + '</a>'
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
