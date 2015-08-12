//to include in html add {{> daycareinfo}}
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}


if (Meteor.isClient) {
  var getDaycare = function() {
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
      var street = daycare[12]
      var city = daycare[13]
      street = toTitleCase(street)
      city = toTitleCase(city)
      return street + city + ' TX ' + daycare[14].slice(0, 5)

    },
    phoneNumber: function() {
      var daycare = getDaycare();
      return daycare[16]
    },
    daysOpen: function() {
      var daycare = getDaycare();
      return daycare[30];
    },
    operationHours: function() {
      var daycare = getDaycare();
      return daycare[19];
    },
    website: function() {
      var daycare = getDaycare();
      return '<a href="http://' + daycare[31] + '">' + daycare[31] + '</a>'
    },
    partTimeCare: function() {
      var daycare = getDaycare();
      if (daycare[27] === "N") {
        return "No";
      } else {
        return "Yes";
      }
    },
    transportationProvided: function() {
      var daycare = getDaycare();
      if (daycare[28] === "N") {
        return "No";
      } else {
        return "Yes";
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
    Meteor.subscribe("localSchools", localStorage.getItem('lat'), localStorage.getItem('lng'));
  })
}
