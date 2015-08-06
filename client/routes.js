//Route Setup
//Main is our view that carries accross the site

FlowRouter.route('/', {
    name: 'main',
    action: function(params) {
        BlazeLayout.render("main", {content: "splash"}); //content here will be the initial search.
    },
});

FlowRouter.route('/search_results', {
  action: function() {
    BlazeLayout.render("main", {content: "search_results"}); //results page template
  }
});