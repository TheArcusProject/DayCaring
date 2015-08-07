//to include in html add {{> gmap}}
var gzip;
var lat
var lng

if (Meteor.isClient) {

  Meteor.startup(function() {
    GoogleMaps.load();

  });

  Template.gmap.helpers({
    GmapOptions: function() {
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        // Map initialization options
        Meteor.subscribe("zipCodes", gzip, function() {
          // lat = cursor.fetch()[0][5];
          var zipInfo = zipCodes.find({0: '"' + gzip + '"'}).fetch()[0]
          lat = zipInfo[5]
          lng = zipInfo[6]
          // lng = cursor.fetch()[0][6];
          console.log("this is lat:", lat)
          console.log("this is lng:", lng)
          if (!lat || !lng) {
            console.log("error")
            throw {
              name: 'invalid zip',
              value: gzip
            }
          }
          return {
            center: new google.maps.LatLng(lat, lng),
            zoom: 10
          };
        })

      }
    }
  });

  Template.gmap.onCreated(function() {
    var cursor = Meteor.users.find({
      '_id': user._id
    }, {
      'profile.zip': 1
    });
    gzip = cursor.fetch()[0].profile.zip

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
