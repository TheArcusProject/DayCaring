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
  "submit .form1": function(event){
    event.preventDefault();

    var email = event.target.email.value;
    console.log("email :", email);
    Meteor.call("sendEmail", email, function (err, results){
      if (err) console.log(err);
    });
    $('#repAuthModal').foundation('reveal', 'open');

  },

  "submit .form2": function(event){
    event.preventDefault();
    var phone = event.target.phone.value;
    console.log("phone :", phone);
    Meteor.call("sendSMS", phone, function (err, results){
      if (err) console.log(err);
    });
    $('#repAuthModal').foundation('reveal', 'open');
  },

});
