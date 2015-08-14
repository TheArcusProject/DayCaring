


//Runs on page load
Template.stats.onCreated(function(){
  //Grabs nonCompliance records for current school
});

Template.stats.helpers({

  //this will eventually gather all data to generate our
  //"statistic" bars for each daycare

  widths :[],

  getViolations: function() {
    // console.log(this);
    var categories = {
      "747" : "",
    }
    var violationsArr = this.violations;
    violationsArr.forEach(function(violation){

    });
  },

  records : function() {
    // var operationId = localStorage.getItem('operationId');

  },

});
