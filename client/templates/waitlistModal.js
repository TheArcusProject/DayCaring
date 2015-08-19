Template.waitlistModal.events({
	"submit .waitlistForm" : function(event){
		event.preventDefault();
		parentName = event.target.parentName.value;
		console.log("this is parent name", parentName)
	}
})