function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

Template.subheader.helpers({
	daycareName: function(){
    var dayCareID = FlowRouter.getParam('daycareId');
    var daycares = localSchools.find().fetch();
    for (var i = 0; i < daycares.length; i++) {
      if (daycares[i][0] === parseInt(dayCareID)) {
        daycare = daycares[i];
      }
    }
    var daycarename = daycare[11]
    daycarename = toTitleCase(daycarename)
		return daycarename;
	}
});

Template.subheader.events({
  'click .represent': function(e) {
    e.preventDefault();
    FlowRouter.go('/authrepresent');
  }
})

Template.subheader.onCreated(function(){
  Meteor.subscribe("localSchools", localStorage.getItem('lat'), localStorage.getItem('lng'));	
})
