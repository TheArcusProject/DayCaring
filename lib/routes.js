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

FlowRouter.route('/searchresults/:lat/:lng', {

  subscriptions: function(params) {
    this.register("daycares", Meteor.subscribe("localDaycares", params.lat, params.lng));
  },

  action: function() {
    BlazeLayout.render("main", {content: "search_results"}); //results page template
  }
});

FlowRouter.route('/authrepresent/:daycareId', {
  subscriptions: function(params) {
    this.register("daycares", Meteor.subscribe("aDaycare", params.daycareId));
  },
  action: function(){
    BlazeLayout.render("main", {content: 'auth_represent'});
  }
});

FlowRouter.route('/represent/:daycareId', {
  subscriptions: function(params) {
    this.register("daycares", Meteor.subscribe("aDaycare", params.daycareId));
    this.register("reviews", Meteor.subscribe("getReviews", params.daycareId));
    this.register("waitlists", Meteor.subscribe("getWaitlist", params.daycareId));
    this.register("pictures", Meteor.subscribe("daycarePhotos", params.daycareId));
    this.register("messages", Meteor.subscribe("getDaycareMessages", params.daycareId));
  },
  action: function(){
    BlazeLayout.render("main", {content: 'represent'});
  }
})

FlowRouter.route('/:daycareId', { 
  //subscribes to a collection in routing as opposed to in the js template file.
  subscriptions: function(params) {
    this.register("reviews", Meteor.subscribe("getReviews", params.daycareId));
    this.register("daycares", Meteor.subscribe("aDaycare", params.daycareId));
    this.register("pictures", Meteor.subscribe("daycarePhotos", params.daycareId));
    this.register("waitlists", Meteor.subscribe("getWaitlist", params.daycareId));
  },
  action: function() {
    BlazeLayout.render("main", {content: "daycareinfo"}); //displays daycare info template
  }
});

FlowRouter.route('/user_dashboard/:userId', {
  subscriptions: function(params) {
    this.register('waitlists', Meteor.subscribe('getUserWaitlist', params.userId));
    this.register('reviews', Meteor.subscribe('getUserReviews', params.userId));
    this.register('messages', Meteor.subscribe('getUserMessages', params.userId));
  },
  action: function() {
    BlazeLayout.render("main", {content: 'user_dashboard'})
  }
})
