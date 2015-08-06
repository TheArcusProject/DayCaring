//to include in html add {{> splash}}

if (Meteor.isClient) {

  Template.splash.helpers({
    //make sure zipcode is valid.
  });

  Template.splash.events({

    "submit form": function(event, template){
      // client side global variable to store user's zip code
      zip = event.target.zipcode.value
      event.preventDefault();
      FlowRouter.go('/searchresults');
    }
  });
};
