//to include in html add {{> gmap}}
if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load();
  });

  Template.gmap.helpers({
    GmapOptions: function() {
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        return {
          //lat and lng are set as global client vars in splash.js
          center: new google.maps.LatLng(localStorage.getItem('lat'), localStorage.getItem('lng')),
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

      localSchoolsArr = localSchools.find().fetch(); //make this variable global so that search_results.js has access

      //all day cares within 5 miles of center of given zip code


      _.forEach(localSchoolsArr, function(school) {
        //make a heart shaped marker bounce onto the map
        var marker = new google.maps.Marker({
          animation: google.maps.Animation.DROP,
          position: new google.maps.LatLng(school[37][1], school[37][2]),
          map: map.instance,
          icon: "/heart-light.svg"
        })

        // to hold basic information about the schools
        var infoWindow = new google.maps.InfoWindow()
        // show infoWindow on mouseover
        google.maps.event.addListener(marker, 'mouseover', function() {

          closeInfos();
          localStorage.setItem('daycareID',school[0]);
          infoWindow.setContent("<h5>" + school[11] + "</h5>" + "<h6>" + school[12]+', '+school[13]+' TX' + "</h6>" + "<button type='button' class='button daycareinfo' onclick=\"FlowRouter.go(" + "\'/" + school[0] + "\')\">Information</button>")
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
