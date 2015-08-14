//regex for validating email
function validateEmail(email) {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}
Schema = {};
Schema.emailRep = new SimpleSchema({
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    label: "Email Address"
  },
})
Schema.phoneRep = new SimpleSchema({
  phoneNumber: {
    type: String,
    label: "Phone Number"
  }
})
Template.auth_represent.helpers({
  emailRepSchema: function() {
    return Schema.emailRep;
  },
  phoneRepSchema: function() {
    return Schema.phoneRep;
  }
});

Template.auth_represent.events({
  "submit .form1": function(event) {
    event.preventDefault();

    var email = event.target.email.value;
    if (validateEmail(email)) {
      Meteor.call("sendEmail", email, function(err, results) {
        if (err) console.log(err);

        event.target.email.value = '';
      });
      $('#repAuthModal').foundation('reveal', 'open');
    } else {
      toastr.warning('Not a valid email!');
    }

  },

  "submit .form2": function(event) {
    event.preventDefault();
    var phone = event.target.phone.value;
    console.log("phone :", phone);
    Meteor.call("sendSMS", phone, function(err, results) {
      if (err) console.log(err);

      event.target.phone.value = '';
    });
    $('#repAuthModal').foundation('reveal', 'open');
  },

});
