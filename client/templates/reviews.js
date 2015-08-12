// to include in HTML use {{> review}}
if(Meteor.isClient) {

	var getDaycareName = function(){
		var daycares = localSchools.find().fetch();
    for (var i = 0; i < daycares.length; i++) {
      if (daycares[i][0] === parseInt(FlowRouter.getParam('daycareId'))) {
        var daycare = daycares[i]
      }
    }
		return daycare[11];
	}


	Template.review.helpers({

		isReady: function(sub) {
			if(sub) {
				return FlowRouter.subsReady(sub);
			} else {
				return FlowRouter.subsReady();
			}
		},
		getComments: function() {
			var comments = reviews.find({}, {sort: {createdAt: -1}}).fetch();
			var currentDaycare = getDaycareName();
			var currentComments = [];
			for(var i = 0; i < comments.length; i++) {
				if (comments[i].daycare === currentDaycare) {
					currentComments.push(comments[i]);
				}
			}
			return currentComments;
		}

	})

	Template.review.onCreated(function() {
    Meteor.subscribe("reviews");
    Meteor.subscribe("localSchools", localStorage.getItem('lat'), localStorage.getItem('lng'));
  })

}