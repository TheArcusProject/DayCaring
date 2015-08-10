//to include in html add {{> splash}}

if (Meteor.isClient) {
  
  Template.splash.helpers({
    
  });

  Template.splash.events({

    "submit form": function(event, template){
      //store user's zip code in their profile in the users collection
      if (user) {
        Meteor.users.update({'_id':user._id},{'$set': {'profile.zip':event.target.zipcode.value}});
      }
      event.preventDefault();
      //fetch the lat and long from the zipcode database on server
      Meteor.subscribe("zipCodes", event.target.zipcode.value, function(){
        var zipInfo = zipCodes.find({0: '"' + event.target.zipcode.value + '"'}).fetch()[0];
        lat = zipInfo[5];
        lng = zipInfo[6];
        //and once we have the lat and long set, we can go to the search results
        FlowRouter.go('/searchresults');
      })
    }
  });
};
