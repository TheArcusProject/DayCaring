if (Meteor.isServer) {
  Meteor.startup(function () {
    schools.insert(schoolsData.data);
    nonCompliance.insert(nonComplianceData.data);
  });
  Meteor.methods({
  	getZips: function(){
  		return zipCodes
  	}
  })
}
