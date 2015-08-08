//to include in html add {{> gmap}}
Meteor.startup(function() {
  GoogleMaps.load()

});

Template.gmap.helpers({
  GmapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      console.log("this is lat:", lat)
      console.log("this is lng:", lng)
      return {
        center: new google.maps.LatLng(lat, lng),
        zoom: 14
      };
      // Map initialization options
    }
  }
});

Template.gmap.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('gmap', function(map) {
    // Add a marker to the map once it's ready
    var infos = []
    var locations = [
      ['happy land', '700 san jacinto st', 30.268981, -97.740316],
      ['sad land', '704 Rio grande st', 30.271372, -97.749005]
    ]
    setMarkers(map, locations, infos)
    function setMarkers(map, locations, infos) {

      var marker, i

      for (i = 0; i < locations.length; i++) {
        var name = locations[i][0]
        var add = locations[i][1]
        var latty = locations[i][2]
        var longy = locations[i][3]

        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(latty, longy),
          map: map.instance
        });

        var content = "<h1> Name: " + name + "</h1>" + "Address: " + add

        attachInfoWindow(marker, content, infos)
      }
    }
  })
});


function attachInfoWindow(marker, cont, infos) {
  var infowindow = new google.maps.InfoWindow({
    content: cont
  });
  google.maps.event.addListener(marker, 'click', function() {
    closeInfos(infos);
    infowindow.open(map, marker);
    infos[0].infowindow
  });

}

function closeInfos(infos) {

  if (infos.length > 0) {

    /* detach the info-window from the marker ... undocumented in the API docs */
    infos[0].set("marker", null);

    /* and close it */
    infos[0].close();

    /* blank the array */
    infos.length = 0;
  }
}
