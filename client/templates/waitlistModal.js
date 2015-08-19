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
		console.log("this is parent name", parentName)
		console.log("this is childName", childName)
		console.log("this is address", address)
		console.log('this is age', age)
		console.log('this is city', city)
		console.log('this is state', state)
		console.log('this is zippycode', zippycode)
		console.log('this is phoneNumber', phoneNumber)
		console.log('this is startDate', startDate)
		$('#paymentModal').foundation('reveal', 'open');
	}
})