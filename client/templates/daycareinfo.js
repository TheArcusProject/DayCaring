//to include in html add {{> daycareinfo}}

if(Meteor.isClient) {

	Template.daycareinfo.helpers ({
		//pull info for a daycare
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