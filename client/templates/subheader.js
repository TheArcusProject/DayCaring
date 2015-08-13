function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

Template.subheader.helpers({
	daycareName: function(){
    var dayCareID = FlowRouter.getParam('daycareId');

    var daycares = localDaycares.find({iD:dayCareID}).fetch();
    
		return daycares[0].name;

	}
});

Template.subheader.events({
  'click .represent': function(e) {
    e.preventDefault();
    FlowRouter.go('/authrepresent');
  },
  'click .backToResults': function(e){
    console.log('clicked!')
    e.preventDefault();
    FlowRouter.go('/searchresults');
  },
  'click .review': function(e) {
    e.preventDefault();
    $('#reviewModal').foundation('reveal', 'open');
  }
})

Template.subheader.onCreated(function(){
  Meteor.subscribe("localDaycares", Session.get('lat'), Session.get('lng'));	
})
