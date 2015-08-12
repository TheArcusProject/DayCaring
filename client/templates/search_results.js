//to include in html add {{> search_results}}

// Helper functions for the overarching search_results page
//Subscribe to the localSchools template on load

//for capitalization of names and addresses
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
if (Meteor.isClient) {

  Template.search_results.helpers({

    schoolsArray: function() {
      var localSchoolsArr = localSchools.find().fetch();
      var schoolsArray = [];


      localSchoolsArr.forEach(function(school) {
        var daycarename = school[11] 
        var street = school[12]
        var city = school[13]
        //properly capitalize names and addresses
        daycarename = toTitleCase(daycarename)
        street = toTitleCase(street)
        city = toTitleCase(city)
        //make an obj with releveant info to push into school
        var schoolObj = {
          schoolId: school[0],
          name: daycarename,
          address: street + city + ", Texas " + school[14].slice(0, 5),
          ages: school[18],
          phone: school[16],
          operationId: school[8].slice(1),
        }
        schoolsArray.push(schoolObj);
      });

      return schoolsArray;
    }
  });

  Template.search_results.events({

    "click .button": function(event) {
      event.preventDefault();
      localStorage.setItem("operationId", this.operationId);
      FlowRouter.go('/' + this.schoolId);
    }
  });

  Template.search_results.onCreated(function() {
    Meteor.subscribe("localSchools", localStorage.getItem('lat'), localStorage.getItem('lng'));
  });
}
