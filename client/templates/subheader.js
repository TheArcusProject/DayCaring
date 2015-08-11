Template.subheader.helpers({
	daycareName: function(){
    var dayCareID = FlowRouter.getParam('daycareId');
    var daycares = localSchools.find().fetch();
    for (var i = 0; i < daycares.length; i++) {
      if (daycares[i][0] === parseInt(dayCareID)) {
        daycare = daycares[i]
        console.log(daycare)
      }
    }
		return daycare[11]
	}

  //this will snag the daycare name based on the id.
  // daycareName : function () {
  //   return Meteor.db.schools.find({'_id':id});
  // }

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