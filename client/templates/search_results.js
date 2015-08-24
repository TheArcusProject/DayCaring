//to include in html add {{> search_results}}

// https://www.discovermeteor.com/blog/template-level-subscriptions/

 var showMap = new ReactiveVar(true);

 var transportationBool = new ReactiveVar(false);
 var partTimeBool = new ReactiveVar(false);
 var saturdayBool = new ReactiveVar(false);
 var distanceMiles = new ReactiveVar(5);

 //new reactive variable daycares array

// Helper functions for the overarching search_results page

//Subscribe to the localSchools template on load

Template.search_results.rendered = function(){
  var showingMap = showMap.get();
  if (!showingMap) {
    $('#toggleMap').removeClass("active");
    $('#toggleCards').addClass("active");
  }
}

Template.search_results.helpers({

  // daycaresArray : function() {
  //   return Template.instance().daycareArr();
  // },

  showMapBool : function() {
    return showMap.get();
  },

  isReady: function(sub) {
    if(sub) {
      return FlowRouter.subsReady(sub);
    } else {
      return FlowRouter.subsReady();
    }
  },
  getGmapDaycares : function() {
    //loop through daycares, add property active to each daycare.
    return daycares.find().fetch();
  },
  getCardDaycares: function(){
    var range = distanceMiles.get();
    var lat = FlowRouter.getParam('lat');
    var lng = FlowRouter.getParam('lng');

    function calcDist() {
      var dist = Math.sqrt(Math.pow(((lat-daycaresArr[i].lat)*69.2),2)+
        Math.pow(((lng-daycaresArr[i].lng)*69.2),2));
    }

    var transportationStatus, partTimeStatus, daysOfWeek;
    if (transportationBool.get() === true) {
      transportationStatus = "Y"
    } else {
      transportationStatus = {$ne: "asdf"}
    }
    if (partTimeBool.get() === true) {
      partTimeStatus = "Y"
    } else {
      //hacky way to select all other items... will be refactored.
      //empty document {} currently breaks things.
       partTimeStatus = {$ne: "asdf"} //to handle cases where transportation isnt Y
    }
    if (saturdayBool.get() === true) {
      daysOfWeek = {$regex: ".*Sat.*"}
    } else {
      daysOfWeek = {$ne: "asdf"}
    }
    return daycares.find({
      "transportation": transportationStatus,
      "parttime": partTimeStatus,
      'days': daysOfWeek
    }).fetch();
  },
  //for capitalization of names and addresses
  toTitleCase: function(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })
  }

});

Template.search_results.events({
  "click #transportation": function(event){
    var state = transportationBool.get()
    if (!state) {
      transportationBool.set(true)
    } else {
      transportationBool.set(false)
    }
  },
  "click #partTimeCare": function(event){
    var partTimeState = partTimeBool.get()
    if (!partTimeState) {
      partTimeBool.set(true)
    } else {
      partTimeBool.set(false)
    }
  },
  "click #openSaturday": function(event){
    var saturdayState = saturdayBool.get()
    if (!saturdayState) {
      saturdayBool.set(true)
    } else {
      saturdayBool.set(false)
    }
  },
  "click .card" : function(event){
    event.preventDefault();
    transportationBool.set(false);
    partTimeBool.set(false);
    FlowRouter.go('/'+ this.iD);
  },

  "click #toggleMap" : function(event) {
    event.preventDefault();
    var self = this;
    var mapState = showMap.get();
    if (!mapState) {
      $('#toggleCards').removeClass("active");
      $('#toggleMap').addClass("active");
      showMap.set(true)
    } else {
      //do nothing
    }
  },
  "click #toggleCards" : function(event) {
    event.preventDefault();
    var mapState = showMap.get();
    if (mapState) {
      $('#toggleMap').removeClass("active");
      $('#toggleCards').addClass("active");
      showMap.set(false);
    } else {
      //do nothing
    }
  }
});

Template.search_results.onCreated(function() {

});
