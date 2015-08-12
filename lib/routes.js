//Route setup

FlowRouter.route('/', {
    // name: 'main',
  action: function(params) {
    BlazeLayout.render("main", {content: "splash"}); //content here will be the initial search.
  }
});

FlowRouter.route('/about', {
  action: function(){
    BlazeLayout.render("main", {content: "about"});
  }
})

FlowRouter.route('/searchresults', {
  action: function() {
    BlazeLayout.render("main", {content: "search_results"}); //results page template
  }
});

FlowRouter.route('/authrepresent', {
  action: function(){
    BlazeLayout.render("main", {content: 'auth_represent'});
  }
})

FlowRouter.route('/:daycareId', { // daycare id is index 0 of schools collection items
  action: function() {
    BlazeLayout.render("main", {content: "daycareinfo"}); //displays daycare info template
  }
});
