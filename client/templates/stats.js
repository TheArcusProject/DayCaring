


//Runs on page load
Template.stats.onCreated(function(){
  //Grabs nonCompliance records for current school
  Meteor.subscribe("schoolStats", localStorage.getItem('operationId'), function(){
    console.log("successfully subscribed to the schoolStats publish");
  });
});

Template.stats.helpers({

  //this will eventually gather all data to generate our
  //"statistic" bars for each daycare

  widths :[],

  records : function() {
    // console.log(localStorage.getItem('operationId'));
    console.log(nonCompliance.find().fetch());
  },

});
