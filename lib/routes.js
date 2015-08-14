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

  //subscribes to a collection in routing as opposed to in the js template file.
  subscriptions: function(params) {
    console.log(params.daycareId)
    this.register("getReviews", Meteor.subscribe("getReviews", params.daycareId));
    this.register("daycares", Meteor.subscribe("aDaycare", params.daycareId));

  },
  action: function() {
    BlazeLayout.render("main", {content: "daycareinfo"}); //displays daycare info template
  }
});
