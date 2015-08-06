//to include in html add {{> login}}

if (Meteor.isClient) {

  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
  });
};
