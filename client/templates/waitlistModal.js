Template.waitlistModal.events({
	"click .next" : function(event){
		event.preventDefault();
		parentName = event.target.parentName.value;
		console.log(parentName)
	}
})