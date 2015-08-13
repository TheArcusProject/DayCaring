if (Meteor.isClient){


  Template.reviewModal.helpers({
  	daycareName: function(){
  		var daycares = localdaycares.find({iD:FlowRouter.getParam('daycareId')}).fetch();
  		return daycares[0].name;
  	}
  });


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
    Meteor.subscribe("localDaycares", Session.get('lat'), Session.get('lng')); 
  })
}