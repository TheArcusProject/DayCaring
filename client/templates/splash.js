//to include in html add {{> splash}}


Template.splash.helpers({

});

Template.splash.events({

    //if user wants to type and use button, this triggers the geocode event
  "submit form": function(event, template){
    event.preventDefault();
    $("input").trigger("geocode");
  }

});


Template.splash.onRendered(function() {

  this.autorun(function () {
    if (GoogleMaps.loaded()) {
      $("input").geocomplete()
      .bind("geocode:result", function(event, result){
        // console.log("lat :", result.geometry.location.G);
        // Session.set('lat', result.geometry.location.G);
        // Session.set('lng', result.geometry.location.K);

        var lat = result.geometry.location.G;
        var lng = result.geometry.location.K;
        FlowRouter.go('/searchresults/'+ lat +'/' + lng);
      });
    }
  });

});
