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
      if (err) console.log(err);

      event.target.code.value = '';
    });
    $('#repAuthModal').foundation('reveal', 'close');
  }
});
