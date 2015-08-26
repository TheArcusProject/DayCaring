Template.PMModal.events({
  "click .button": function(event, template) {
    event.preventDefault();
    var message = $('textarea#message').val();
    var daycare = this._id;
    var currentUser = Meteor.user()
    Meteor.call("addMessage", currentUser._id, daycare, message, function(err, results) {
      if(err) console.log(err);
    })
    setTimeout(function() {
      $('#submittedMessage').foundation('reveal', 'close');
    }, 1500)
  }
})
