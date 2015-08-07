//to include in html add {{> gmap}}
var gzip = ""
var lat
var lng
if (Meteor.isClient) {

  Meteor.startup(function() {
    GoogleMaps.load();
    Meteor.call('getZips', function(err, results){
      zips = results
    })
  });

  Template.gmap.helpers({
    GmapOptions: function() {
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        // Map initialization options
        console.log("this is gzip:", gzip)

        //change gzip to lat lng
        for (var i = 0; i < zips.length; i++) {

          if (zips[i][0] === '"' + gzip + '"') {
            lat = parseInt(zips[i][5])
            lng = parseInt(zips[i][6])
            break
          }
        }
        console.log("this is lat:", lat)
        console.log("this is lng:", lng)


        if (!lat || !lng) {
          console.log("error")
          throw {name: 'invalid zip', value: gzip}
        }
        

        return {
          center: new google.maps.LatLng(lat, lng),
          zoom: 8
        };
      }
    }
  });

  Template.gmap.onCreated(function() {
    console.log('in gmap zip is ', zip);
    gzip = zip
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
