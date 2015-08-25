Template.PMReplyModal.events({
  "click .button": function(event, template) {
    event.preventDefault();
    var message = $('textarea#message').val();
    var messageId = sessionStorage.getItem('pmReplyid');
    Meteor.call("replyMessage", messageId, message, function(err, results) {
      if(err) console.log(err);
    })
    setTimeout(function() {
      $('#submittedMessage').foundation('reveal', 'close');
    }, 1500)
  }
})
