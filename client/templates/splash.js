//to include in html add {{> splash}}


Template.splash.helpers({

  customMap : function() {
    if (GoogleMaps.loaded()) {
      return {
        zoom: 12,
        disableDefaultUI: true,
        disableDoubleClickZoom: true,
        draggable: false,
        scrollwheel: false,
        center: new google.maps.LatLng(30.267153, -97.74306079999997),
        styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
      };
      // Map initialization options
    }
  }
});

Template.splash.events({
    //if user wants to type and use button, this triggers the geocode event
  "submit form": function(event, template){
    event.preventDefault();
    $("input").trigger("geocode");
  }
});


Template.splash.onRendered(function() {

  //fixes the top bar on search results page.
  $(".map-canvas").addClass("mapMove");

  this.autorun(function () {
    if (GoogleMaps.loaded()) {
      $("input").geocomplete()
      .bind("geocode:result", function(event, result){
        var lat = result.geometry.location.G;
        var lng = result.geometry.location.K;
        FlowRouter.go('/searchresults/'+ lat +'/' + lng);
      });
    }
  });

});
