Template.waitlistModal.events({
	"submit .waitlistForm" : function(event){
		event.preventDefault();
		parentName = event.target.parentName.value;
		childName = event.target.firstChildName.value
		address =  event.target.address1.value;
		age = event.target.firstChildAge.value;
		city = event.target.city.value;
		state = event.target.state.value;
		zippycode = event.target.zippycode.value;
		phoneNumber = event.target.phoneNumber.value;
		startDate = event.target.startDate.value;
		event.target.parentName.value = event.target.firstChildName.value = event.target.address1.value = event.target.firstChildAge.value = event.target.city.value = event.target.state.value = event.target.zippycode.value = event.target.phoneNumber.value = event.target.startDate.value = ""
		$('#paymentModal').foundation('reveal', 'open');
	}
})