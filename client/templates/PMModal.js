Template.PMModal.events({
  "click .button": function(event, template) {
    event.preventDefault();
    var message = $('textarea#message').val();
    console.log('message is : ',message);
    var daycare = this.iD;
    var currentUser = Meteor.user()
    Meteor.call("addMessage", currentUser._id, daycare, message, function(err, results) {
      if(err) console.log(err);
      console.log('in meteor.call addMessage callback')
    })
    setTimeout(function() {
      $('#submittedMessage').foundation('reveal', 'close');
    }, 1500)
  }
})
