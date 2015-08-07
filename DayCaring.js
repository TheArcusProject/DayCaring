//DayCaring.js
if (Meteor.isServer) {
  Meteor.startup(function () {
    schools.insert(schoolsData.data, function(){
      console.log('Schools collection is ready on server.');
    });
    nonCompliance.insert(nonComplianceData.data, function(){
      console.log('Non-compliance collection is ready on server.');
    });
  });
}

