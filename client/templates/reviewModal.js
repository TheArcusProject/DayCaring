if (Meteor.isClient){

  var daycareName = function(){
  		var currentDaycare = daycares.find({iD:FlowRouter.getParam('daycareId')}).fetch();
  		return currentDaycare[0].name;
  }

  Template.reviewModal.helpers({
    getDaycareName: function() {
      return daycareName();
    }
  })

  Template.reviewModal.events({
    "click .button": function(event, template) {
      event.preventDefault();
      var comment = $('textarea#review').val();
      var daycare = daycareName();
      var currentUser = Meteor.user()
      Meteor.call("insertComments", comment, daycare, function(err, results) {
        if(err) console.log(err);
      })
    }
  })
}

