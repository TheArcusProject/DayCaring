function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
//to include in html add {{> gmap}}


Template.gmap.helpers({
  GmapOptions: function() {
    // Make sure the maps API has loaded
    var mapCenter = {};
    if (FlowRouter.getParam('lat')){
      mapCenter.lat = FlowRouter.getParam('lat');
      mapCenter.lng = FlowRouter.getParam('lng');
    } else {
      mapCenter.lat = parseFloat(this[0].lat);
      mapCenter.lng = parseFloat(this[0].lng);
    }
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(mapCenter.lat,mapCenter.lng),
        zoom: 15,
        scrollwheel: false,
      };
      // Map initialization options
    }
  }
});

Template.gmap.onCreated(function() {

  // We can use the `ready` callback to interact with the map API once the map is ready.
  var that = this;
  var markers = [];

  GoogleMaps.ready('gmap', function(map) {

    //creates the home marker
    var mapCenter = {};
    try {
      mapCenter.lat = FlowRouter.getParam('lat');
      mapCenter.lng = FlowRouter.getParam('lng');
      var homeMarker = new google.maps.Marker({
        position: new google.maps.LatLng(mapCenter.lat, mapCenter.lng),
        map: map.instance,
      });
    } catch(e) {
      mapCenter.lat = parseFloat(that[0].lat);
      mapCenter.lng = parseFloat(that[0].lng);
    }


    function makeMarkers(markersArr) {
      console.log("looping through markers :", markers);
      for (var i = 0; i < markersArr.length; i++){

        //make a heart shaped marker bounce onto the map
        markers.push( new google.maps.Marker({
          position: new google.maps.LatLng(parseFloat(markersArr[i].lat), parseFloat(markersArr[i].lng)),
          map: map.instance,
          icon: "/heart-light.svg"
        }))
        // to hold basic information about the schools
        markers[i]['infoWin'] = new google.maps.InfoWindow({ maxWidth: 180 });
        markers[i]['daycare'] = markersArr[i];
        // show infoWindow on mouseover

        markers[i].addListener('mouseover', function() {
          closeInfos();
          this.infoWin.setContent("<h5>" + toTitleCase(this.daycare.name) + "</h5>" + "<h6>" + toTitleCase(this.daycare.address) +' TX' + "</h6>" +
            "<button type='button' class='button daycareinfo tiny' onclick=\"FlowRouter.go(" +
            "\'/" + this.daycare.iD + "\')\">Information</button>");
          this.infoWin.open(map.instance, this);

          this.setIcon("/heart-dark.svg");
        })

        markers[i].addListener('mouseout', function(){
          //lighten heart on mouseoff
          this.setIcon("/heart-light.svg");
        })
      };
    };

    function clearMarkers() {
      for (var i=0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers.length = 0;
    };

    Tracker.autorun(function() {
      var watch = Session.get("markers");
      clearMarkers();
      makeMarkers(watch);
    });

    function closeInfos() {
       for (var i = 0; i < markers.length; i++){
        markers[i].infoWin.close();
      }
    }
  });
});

