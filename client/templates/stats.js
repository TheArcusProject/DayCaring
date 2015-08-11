


//Runs on page load
Template.stats.onCreated(function(){
  //Grabs nonCompliance records for current school
  Meteor.subscribe("schoolStats", localStorage.getItem('operationId'), function(){
    console.log("successfully subscribed to the schoolStats publish");
    var nonComplianceRecords = schoolStats.find().fetch();
    console.log("nonCompliance records method1 : ", nonComplianceRecords);
  });
});

Template.stats.helpers({

  //this will eventually gather all data to generate our
  //"statistic" bars for each daycare

  widths :[],

  records : function() {
    // var operationId = localStorage.getItem('operationId');

  },

});
