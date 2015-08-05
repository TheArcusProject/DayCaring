if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
    
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.http.get( 'https://data.texas.gov/api/views/csm8-69qj/rows.json',
      function(err, result) {
        console.log('in the meteor get callback')
        console.log(result.data);
      });
  });
}
