Template.PMReplyModal.events({
  "click .button": function(event, template) {
    event.preventDefault();
    var message = $('textarea#message').val();
    var messageId = this;
    console.log('in pmreplymodal this is : ', this)
    Meteor.call("replyMessage", messageId, message, function(err, results) {
      if(err) console.log(err);
    })
    setTimeout(function() {
      $('#submittedMessage').foundation('reveal', 'close');
    }, 1500)
  }
})
