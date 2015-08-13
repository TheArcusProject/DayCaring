function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
//to include in html add {{> gmap}}

Meteor.startup(function() {
  GoogleMaps.load();
});

Template.gmap.helpers({
  GmapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      return {
        //lat and lng are set as global client vars in splash.js
        center: new google.maps.LatLng(Session.get('lat'), Session.get('lng')),
        zoom: 13
      };
      // Map initialization options
    }
  }
});

Template.gmap.onCreated(function() {
  var daycareArr = this.data.fetch();
  var infos = []; //hacky way to close infowindows

  // We can use the `ready` callback to interact with the map API once the map is ready.

  GoogleMaps.ready('gmap', function(map) {

    Meteor.subscribe("localDaycares", Session.get('lat'), Session.get('lng'), function(){
      
      _.forEach(daycareArr, function(daycare) {
        //make a heart shaped marker bounce onto the map
        var marker = new google.maps.Marker({
          animation: google.maps.Animation.DROP,
          position: new google.maps.LatLng(daycare.lat, daycare.lng),
          map: map.instance,
          icon: "/heart-light.svg"
        })

        // to hold basic information about the schools
        var infoWindow = new google.maps.InfoWindow()
        // show infoWindow on mouseover
        google.maps.event.addListener(marker, 'mouseover', function() {

          closeInfos();
          
          infoWindow.setContent("<h5>" + toTitleCase(daycare.name) + "</h5>" + "<h6>" + toTitleCase(daycare.address) +' TX' + "</h6>" + 
            "<button type='button' class='button daycareinfo' onclick=\"FlowRouter.go(" +
            "\'/" + daycare.iD + "\')\">Information</button>")
          infoWindow.open(map.instance, marker);
          infos[0] = infoWindow;
          //darken heart on mouseover

          marker.setIcon("/heart-dark.svg");
        })

        google.maps.event.addListener(marker, 'mouseout', function(){
          //lighten heart on mouseoff
          marker.setIcon("/heart-light.svg");
        })
      }) //end of forEach loop
    });

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

