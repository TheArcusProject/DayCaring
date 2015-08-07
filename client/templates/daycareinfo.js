//to include in html add {{> daycareinfo}}

if(Meteor.isClient) {

	Template.daycareinfo.helpers ({
		school: function() {
			return schools.find();
		},
		reviews: function() {
			return reviews.find();
		}
	})

	Template.daycareinfo.events ({
		//submit daycare review
		reviewSubmit: function() {

		},
		//check compliance on a daycare
		checkCompliance: function() {

		}
	})
}