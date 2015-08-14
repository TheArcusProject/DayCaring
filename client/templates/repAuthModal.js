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
          //assign the ID of the daycare to the user
          Meteor.users.update({_id:Meteor.user()._id}, {$set: {'profile.dayCare': [dcID]}})
          //show success notification!
          toastr.success('Successfully authenticated!');
          $('#repAuthModal').foundation('reveal', 'close');

        } else {
          //else, show err message
          toastr.error('Whoops! Incorrect Code.')
        }
      }
      event.target.code.value = '';
    })
  }
});
