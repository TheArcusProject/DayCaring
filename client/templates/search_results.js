//to include in html add {{> search_results}}

// Helper functions for the overarching search_results page

Template.search_results.helpers({


});


Template.search_results.onCreated(function() {
  Meteor.subscribe("localSchools", lat, lng);
});