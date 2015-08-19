Template.waitlistModal.events({
  "submit .waitlistForm": function(event) {
    event.preventDefault();
    parentName = event.target.parentName.value;
    childName = event.target.firstChildName.value
    address = event.target.address1.value;
    age = event.target.firstChildAge.value;
    city = event.target.city.value;
    state = event.target.state.value;
    zippycode = event.target.zippycode.value;
    phoneNumber = event.target.phoneNumber.value;
    startDate = event.target.startDate.value;
    if (!parentName) {
      toastr.warning('Please enter your name.')
    }
    if (!childName) {
      toastr.warning("Please enter your child's name")
    }
    if (!address) {
      toastr.warning('Please enter your address')
    }
    if (!age) {
      toastr.warning("Please enter your child's age")
    }
    if (!city) {
      toastr.warning('Please enter your city')
    }
    if (!state) {
      toastr.warning('Please enter your state')
    }
    if (!zippycode) {
      toastr.warning('Please enter your zip code')
    }
    if (!phoneNumber) {
      toastr.warning('Please enter your phoneNumber')
    }
    if (!startDate) {
      toastr.warning('Please enter a valid start date')
    }
    if (parentName && childName && address && age && city && state && zippycode && phoneNumber && startDate) {
      event.target.parentName.value = event.target.firstChildName.value = event.target.address1.value = event.target.firstChildAge.value = event.target.city.value = event.target.state.value = event.target.zippycode.value = event.target.phoneNumber.value = event.target.startDate.value = ""
      $('#paymentModal').foundation('reveal', 'open');
    }
  }
})
