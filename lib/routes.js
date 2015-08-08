//Route setup

FlowRouter.route('/', {
    // name: 'main',
  action: function(params) {
    console.log("Inside the main route action");
    BlazeLayout.render("main", {content: "splash"}); //content here will be the initial search.
  }
});

FlowRouter.route('/searchresults', {
  action: function() {
    BlazeLayout.render("main", {content: "search_results"}); //results page template
  }
});

FlowRouter.route('/:daycareId', { // daycare id is index 0 of schools collection items
	action: function() {
		BlazeLayout.render("main", {content: "daycareinfo"}); //displays daycare info template
	}
});

FlowRouter.router('/submitreview', {
  action: function() {
    BlazeLayout.render("main", {content: "reviewsubmit"});
  }
});
