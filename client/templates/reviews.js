// to include in HTML use {{> review}}
	var daycareName = function(){
    var dayCareID = FlowRouter.getParam('daycareId');

    var daycares = localDaycares.find({iD:dayCareID}).fetch();
		return daycares[0].name;
	}

	Template.review.helpers({

		isReady: function(sub) {
	    if(sub) {
	    	console.log("sub is ready")
	      return FlowRouter.subsReady(sub);
	    } else {
	    	console.log("not ready")
	      return FlowRouter.subsReady();
	    }
	  },
		formattedDate: function(date) {
			if(date) {
				return moment(date).format("MMM Do YYYY");
			}
		},
		getComments: function() {
			var comments = reviews.find({}, {sort: {createdAt: -1}}).fetch();
			console.log(comments);
			return comments;
		}

	})

	

