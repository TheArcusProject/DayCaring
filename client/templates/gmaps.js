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
    var infos = [];
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('gmap', function(map) {
      
      exArray = [
        ["happy care", "701 brazos st", "this place makes me sad", 30.268889, -97.740445],
        ["sad care", "321 brazos st", "this place makes me happy!", 30.271219, -97.740096]
      ]
      _.forEach(exArray, function(location) {
        var marker = new google.maps.Marker({
          animation: google.maps.Animation.DROP,
          position: new google.maps.LatLng(location[3], location[4]),
          map: map.instance
        })
        var infowindow = new google.maps.InfoWindow()
        google.maps.event.addListener(marker, 'click', function() {
          closeInfos()
          infowindow.setContent("<h1>" + location[0] + "</h1>" + "<h3>" + location[1] + "</h3>" + "<h4>" + location[2] + "</h4>")
          infowindow.open(map.instance, marker);
          infos[0] = infowindow;
        })
        
        
      })

      function closeInfos() {
        if (infos.length > 0) {
          /* detach the info-window from the marker ... undocumented in the API docs */
          infos[0].set("marker", null);
          /* and close it */
          infos[0].close();
          /* blank the array */
          infos.length = 0;
        }
      }

    });
  });

}
