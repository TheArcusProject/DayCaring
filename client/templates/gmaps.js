//to include in html add {{> gmap}}

if (Meteor.isClient) {

  Meteor.startup(function() {
    GoogleMaps.load();
  });

  Template.gmap.helpers({
    GmapOptions: function() {
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
    console.log('in gmap zip is ',zip);
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('gmap', function(map) {
      // Add a marker to the map once it's ready
      var marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: map.options.center,
        map: map.instance
      });
    });
  });

}
