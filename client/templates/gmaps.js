//to include in html add {{> gmap}}


if (Meteor.isClient) {

  Meteor.startup(function() {
    GoogleMaps.load();

  });

  Template.gmap.helpers({
    GmapOptions: function() {
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        console.log("this is lat:", lat)
        console.log("this is lng:", lng)
        return {
          center: new google.maps.LatLng(lat, lng),
          zoom: 13
        };
        // Map initialization options
      }
    }
  });

  Template.gmap.onCreated(function() {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('gmap', function(map) {

      // Add a marker to the map once it's ready

      var marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: map.options.center,
        map: map.instance
      });
      var infowindow = new google.maps.InfoWindow()
      google.maps.event.addListener(marker, 'click', function() {

        infowindow.setContent('hi')
        infowindow.open(map.instance, marker);

      })
    });
  });

}
