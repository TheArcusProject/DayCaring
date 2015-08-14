if (Meteor.isClient){

  var daycareName = function(){
  		var daycares = localDaycares.find({iD:FlowRouter.getParam('daycareId')}).fetch();
  		return daycares[0].name;
  	}

  Template.reviewModal.helpers({
    getDaycareName: function() {
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
          daycare: daycare.iD,
          createdAt: new Date()
        })
      })
    }
  })

  Template.reviewModal.onCreated(function(){
    Meteor.subscribe("localDaycares", Session.get('lat'), Session.get('lng')); 
  })
}