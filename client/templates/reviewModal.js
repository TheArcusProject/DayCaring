if (Meteor.isClient){

  Template.reviewModal.helpers({
  	daycareName: function(){
  		var daycares = localSchools.find().fetch();
      for (var i = 0; i < daycares.length; i++) {
        if (daycares[i][0] === parseInt(FlowRouter.getParam('daycareId'))) {
          daycare = daycares[i]
        }
      }
  		return daycare[11];
  	}
  });

  Template.reviewModal.onCreated(function(){
    Meteor.subscribe("localSchools", localStorage.getItem('lat'), localStorage.getItem('lng')); 
  })
}