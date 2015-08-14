Schema.validationCode = new SimpleSchema({
  code: {
    type: String,
    label: "5 Digit Validation Code"
  }
});

Template.repAuthModal.helpers({
  codeAuthSchema: function(){
    return Schema.validationCode;
  }
});

Template.repAuthModal.events({

  "submit .authForm": function(event){
    event.preventDefault();
    var code = event.target.code.value;

    Meteor.call("checkValidation", code, function (err, results){
      if (err) {
        console.log(err);
      } else {
        if (results) {
          var dcID = Session.get('dayCareID').toString()
          console.log("this is sessionID", dcID)
          Meteor.users.update({_id:Meteor.user()._id}, {$set: {'profile.dayCare': [dcID]}})
          //if code matches, add permission to user account
        } else {
          //else, show err message
        }
      }
      console.log(Meteor.user())
      event.target.code.value = '';
    })
    $('#repAuthModal').foundation('reveal', 'close');
  }
});
