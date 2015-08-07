//to include in html add {{> splash}}

if (Meteor.isClient) {
  
  Template.splash.helpers({
    
  });

  Template.splash.events({

    "submit form": function(event, template){
      // client side global variable to store user's zip code
      console.log('user is ', user)
      Meteor.users.update({'_id':user._id},{'$set': {'profile.zip':event.target.zipcode.value}});
      event.preventDefault();
      Meteor.subscribe("zipCodes", event.target.zipcode.value, function(){
        var zipInfo = zipCodes.find({0: '"' + event.target.zipcode.value + '"'}).fetch()[0]
        lat = zipInfo[5]
        lng = zipInfo[6]
        FlowRouter.go('/searchresults');
      })
    }
  });
};
