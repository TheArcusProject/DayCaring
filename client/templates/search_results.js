//to include in html add {{> search_results}}

// https://www.discovermeteor.com/blog/template-level-subscriptions/


// Helper functions for the overarching search_results page

//Subscribe to the localSchools template on load

//for capitalization of names and addresses
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

  
Template.search_results.helpers({

  daycaresArray : function() {
    return Template.instance().daycareArr();
  }
});

Template.search_results.events({

  "click .button" : function(event){
    event.preventDefault();
    FlowRouter.go('/'+ this.iD);
  }
});

Template.search_results.onCreated(function() {
  var instance = this;
  instance.loaded = new ReactiveVar(0);

  instance.autorun(function(){
    instance.subscribe('localDaycares', Session.get('lat'), Session.get('lng'));
  });

  instance.daycareArr = function(){
    return localDaycares.find({});
  }
});
