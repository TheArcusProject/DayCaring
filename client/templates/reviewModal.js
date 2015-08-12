if (Meteor.isClient){

	var daycareName = function(){
		var daycares = localSchools.find().fetch();
    for (var i = 0; i < daycares.length; i++) {
      if (daycares[i][0] === parseInt(FlowRouter.getParam('daycareId'))) {
        var daycare = daycares[i]
      }
    }
		return daycare[11];
	}

  Template.reviewModal.helpers({
    name: function() {
      return daycareName();
    }
  })

  Template.reviewModal.events({
    "click .button": function(event, template) {
      event.preventDefault();
      Meteor.subscribe("reviews", function() {
        var comment = $('textarea#review').val();
        var currentUser = Meteor.user();
        var daycare = daycareName();
        reviews.insert({
          comment: comment,
          user: currentUser,
          daycare: daycare,
          createdAt: new Date().toDateString()
        })
      })
    }
  })

  Template.reviewModal.onCreated(function(){
    Meteor.subscribe("localSchools", localStorage.getItem('lat'), localStorage.getItem('lng')); 
  })

}