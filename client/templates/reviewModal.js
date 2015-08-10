Template.reviewModal.helpers({
	daycareName: function(){
		if (daycare){
			return daycare[11]
		}
	}
});

Template.reviewModal.onCreated(function(){
	var dayCareID = FlowRouter.getParam('daycareId');
    var daycares = localSchools.find().fetch();
    for (var i = 0; i < daycares.length; i++) {
      if (daycares[i][0] === parseInt(dayCareID)) {
        daycare = daycares[i]
        console.log(daycare)
      }
    }
})