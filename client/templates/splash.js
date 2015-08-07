//to include in html add {{> splash}}

if (Meteor.isClient) {

  console.log('user is ', user)
  
  Template.splash.helpers({
    
  });

  Template.splash.events({

    "submit form": function(event, template){
      // client side global variable to store user's zip code
      console.log('user is ', user)
      Meteor.users.update({'_id':user._id},{'$set': {'profile.zip':event.target.zipcode.value}});
      event.preventDefault();
      FlowRouter.go('/searchresults');
    }
  });
};
