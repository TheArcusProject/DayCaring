// to include in HTML use {{> review}}
Template.review.helpers({

	isReady: function(sub) {
    if(sub) {
      return FlowRouter.subsReady(sub);
    } else {
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
		return comments;
	}

})

	

