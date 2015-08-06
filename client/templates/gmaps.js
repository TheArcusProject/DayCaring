//to include in html just add {{> gmap}}

if (Meteor.isClient) {

  Meteor.startup(function() {
    GoogleMaps.load();
  });

  Template.gmap.helpers({
    exampleMapOptions: function() {
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        // Map initialization options
        return {
          center: new google.maps.LatLng(29.728834, -95.389358),
          zoom: 8
        };
      }
    }
  });

  Template.gmap.onCreated(function() {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('exampleMap', function(map) {
      // Add a marker to the map once it's ready
      var marker = new google.maps.Marker({
        position: map.options.center,
        map: map.instance
      });
    });
  });

}
