

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

  Schools = new Mongo.Collection('schools');
  Compliance = new Mongo.Collection('compliance');

}

if (Meteor.isServer) {

  Schools = new Mongo.Collection('schools');
  Compliance = new Mongo.Collection('compliance');
  
  Meteor.startup(function () {
    
  });
}
