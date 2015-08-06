//Route setup

FlowRouter.route('/', {
    name: 'main',
    action: function(params) {
        console.log("Inside the main route action");
        BlazeLayout.render("main", {content: "splash"}); //content here will be the initial search.
    },
});

FlowRouter.route('/searchresults', {
  action: function() {
    BlazeLayout.render("main", {content: "searchresults"}); //results page template
  }
});

FlowRouter.route('/:daycareId', {
	action: function() {
		BlazeLayout.render("main", {content: "daycareinfo"}); //displays daycare info template
	}
});