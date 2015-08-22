//to include in html add {{> search_results}}

// https://www.discovermeteor.com/blog/template-level-subscriptions/

 var showMap = new ReactiveVar(true);
 //new reactive variable daycares array

// Helper functions for the overarching search_results page

//Subscribe to the localSchools template on load

Template.search_results.helpers({

  // daycaresArray : function() {
  //   return Template.instance().daycareArr();
  // },

  showMapBool : function() {
    return showMap.get();
  },

  isReady: function(sub) {
    if(sub) {
      return FlowRouter.subsReady(sub);
    } else {
      return FlowRouter.subsReady();
    }
  },
  getDaycares : function() {
    //loop through daycares, add property active to each daycare.
    return daycares.find().fetch();
  },
  //for capitalization of names and addresses
  toTitleCase: function(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })
  }

});

Template.search_results.events({

  "click .card" : function(event){
    event.preventDefault();
    FlowRouter.go('/'+ this.iD);
  },

  "click #toggleMap" : function(event) {
    event.preventDefault();
    var self = this;
    var mapState = showMap.get();
    if (!mapState) {
      $('#toggleCards').removeClass("active");
      $('#toggleMap').addClass("active");
      showMap.set(true)
    } else {
      //do nothing
    }
  },
  "click #toggleCards" : function(event) {
    event.preventDefault();
    var mapState = showMap.get();
    if (mapState) {
      $('#toggleMap').removeClass("active");
      $('#toggleCards').addClass("active");
      showMap.set(false);
    } else {
      //do nothing
    }
  },


});

Template.search_results.onCreated(function() {

});
