// to include in HTML use {{> review}}
if(Meteor.isClient) {

	var getDaycareName = function(){
		var daycares = localDaycares.find().fetch();
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
			var comments = daycareReviews.find({}, {sort: {createdAt: -1}}).fetch();
			var currentDaycare = getDaycareName();
			var currentComments = [];
			for(var i = 0; i < comments.length; i++) {
				if (comments[i].daycare === currentDaycare) {
					currentComments.push(comments[i]);
				}
			}
			return currentComments;
		},
		formattedDate: function(date) {
			if(date) {
				return moment(date).format("MMM Do YYYY");
			}
		}

	})

	Template.review.onCreated(function() {
    Meteor.subscribe("daycareReviews");
    Meteor.subscribe("localDaycares", Session.get('lat'), Session.get('lng'));
  })

}