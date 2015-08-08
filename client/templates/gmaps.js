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
    var infos = []; //hacky way to close infowindows
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('gmap', function(map) {
      //some example data, replace with data from database
      Meteor.subscribe("localSchools", map.options.center.lat(), map.options.center.lng(),function (){
        console.log('localSchools subscription callback')
        localSchoolsArr = localSchools.find().fetch(); //make this variable global so that search_results.js has access
        
        _.forEach(localSchoolsArr, function(school) {
          var marker = new google.maps.Marker({
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(school[37][1], school[37][2]),
            map: map.instance,
            icon: "/heart-light-marker.png"
          })
          var infowindow = new google.maps.InfoWindow()
          google.maps.event.addListener(marker, 'mouseover', function() {
            closeInfos()
            infowindow.setContent("<h4>" + school[11] + "</h4>" + "<h5>" + school[12] + school[13]+' TX' + "</h5>")
            infowindow.open(map.instance, marker);
            infos[0] = infowindow;
            marker.setIcon("/heart-dark-marker.png");
          })
          google.maps.event.addListener(marker, 'mouseout', function(){
            closeInfos()
            marker.setIcon("/heart-light-marker.png");
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
}
