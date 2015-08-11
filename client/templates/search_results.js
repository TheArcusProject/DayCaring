//to include in html add {{> search_results}}

// Helper functions for the overarching search_results page

Template.search_results.helpers({


  schoolsArray : function() {
    var localSchoolsArr = localSchools.find().fetch();
    var schoolsArray = [];

    localSchoolsArr.forEach(function(school){
      //make an obj with releveant info to push into school
      var schoolObj = {
        name : school[11],
        address : school[12] + school[13] + ", Texas " + school[14].slice(0, 5),
        ages : school[18],
        phone : school[16],
      }

      schoolsArray.push(schoolObj);
    });

    return schoolsArray;
  },

});

//Subscribe to the localSchools template on load
Template.search_results.onCreated(function() {
  Meteor.subscribe("localSchools", localStorage.getItem('lat'), localStorage.getItem('lng'), function(){
    console.log("successfully subscribed to the localSchools cursor.");
  });
});