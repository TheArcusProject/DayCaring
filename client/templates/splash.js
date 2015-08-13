//to include in html add {{> splash}}


Template.splash.helpers({
  
});

Template.splash.events({

  "submit form": function(event, template){
    
    event.preventDefault();
    //fetch the lat and long from the zipcode database on server
    Meteor.subscribe("zipCodes", event.target.zipcode.value, function(){
      var zipInfo = zipCodes.find({0: '"' + event.target.zipcode.value + '"'}).fetch()[0];
      Session.set('lat', zipInfo[5]);
      Session.set('lng', zipInfo[6]);
      Meteor.subscribe("localDaycares", zipInfo[5], zipInfo[6]);

      //and once we have the lat and long set, we can go to the search results
      FlowRouter.go('/searchresults');
    })
  }
});
