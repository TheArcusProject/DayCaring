//regex for validating email
function validateEmail(email) {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}

Template.auth_represent.events({
  "submit .form1": function(event) {
    event.preventDefault();
    var email = event.target.email.value;
    var officialEmail = daycares.find({}).fetch()[0].email;
    if (validateEmail(email) && email === officialEmail) {
      Meteor.call("sendEmail", email, FlowRouter.getParam('daycareId'), function(err, results) {
        if (err) {
          toastr.warning("Failed to send!");
        } else {
          event.target.email.value = '';
          $('#repAuthModal').foundation('reveal', 'open');
        }
      });
    } else {
      toastr.warning('Not a valid email!');
    }
  },

  "submit .form2": function(event) {
    event.preventDefault();
    var phone = event.target.phone.value;
    var officialPhone = daycares.find({}).fetch()[0].phone;
    console.log("phone :", phone);
    Meteor.call("sendSMS", phone, function(err, results) {
      if (err) {
        toastr.warning("Failed to send!")
      } else {
        event.target.phone.value = '';
        $('#repAuthModal').foundation('reveal', 'open');
      }
    });
  },

});

Template.auth_represent.helpers({
  isLoggedIn : function () {
    if (user) {
      return true;
    } else {
      return false;
    }
  },
  getUIDandDCID : function(){
    var thing = {};
    thing.userId = user._id
    thing.daycareId = FlowRouter.getParam('daycareId');
    return thing;
  },
  isReady: function(sub) {
    if(sub) {
      return FlowRouter.subsReady(sub);
    } else {
      return FlowRouter.subsReady();
    }
  }
})
