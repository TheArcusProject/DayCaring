Template.subheader.helpers({
	daycareName: function(){
    var dayCareID = FlowRouter.getParam('daycareId');
    var daycares = localSchools.find().fetch();
    for (var i = 0; i < daycares.length; i++) {
      if (daycares[i][0] === parseInt(dayCareID)) {
        daycare = daycares[i];
      }
    }
		return daycare[11];
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
