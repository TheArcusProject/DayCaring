//Route setup

FlowRouter.route('/', {
    // name: 'main',
  action: function(params) {
    BlazeLayout.render("main", {content: "splash"}); //content here will be the initial search.
  }
});

FlowRouter.route('/searchresults', {
  action: function() {
    BlazeLayout.render("main", {content: "search_results"}); //results page template
  }
});

FlowRouter.route('/authrepresent', {
  action: function(){
    console.log("inside the auth represent page")
    BlazeLayout.render("main", {content: 'auth_represent'});
  }
})

FlowRouter.route('/:daycareId', { // daycare id is index 0 of schools collection items
  action: function() {
    console.log("Inside the daycare page")
    BlazeLayout.render("main", {content: "daycareinfo"}); //displays daycare info template
  }
});
