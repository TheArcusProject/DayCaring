// to include in HTML use {{> review}}

	Template.review.helpers({

		formattedDate: function(date) {
			if(date) {
				return moment(date).format("MMM Do YYYY");
			}
		},
		getComments: function() {
			return this;
		}
	})

