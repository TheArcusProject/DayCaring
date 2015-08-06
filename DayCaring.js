

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
  }); 

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    schools.insert(schoolsData.data);
    nonCompliance.insert(nonComplianceData.data);
  });
}
