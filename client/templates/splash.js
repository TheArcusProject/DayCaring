// Controller for splash.js


// if (Meteor.isClient){} use this?

Template.splash.helpers({
  //make sure zipcode is valid.
});

Template.splash.events({

  "submit form": function(event, template){

    console.log(event.target.zipcode.value);
    zip = event.target.zipcode.value
    event.preventDefault();

  }

});
