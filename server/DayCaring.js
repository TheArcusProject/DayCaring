//DayCaring.js
if (Meteor.isServer) {
  Meteor.startup(function() {

    // console.log('removing schools');
    // schools.remove({});
    // for (var i = 0; i < schoolsData.data.length; i++){
    //   schools.insert(schoolsData.data[i]);
    // }
    // console.log('schoolsData is loaded on server');

    //   console.log('removing non-compliance data');
    //   nonCompliance.remove({});

    //   for (var i = 0; i < nonComplianceData.data.length; i++){
    //     nonCompliance.insert(nonComplianceData.data[i]);
    //   }
    //   console.log('nonComplianceData is loaded on server');
  });
}
var returnAuth = function(num){
      return num
    }
Meteor.methods({
  sendEmail: function(doc) {
    // Important server-side check for security and data integrity
    // check(doc, Schema.authrep);

    // Build the e-mail text
    var num = Math.floor(Math.random() * 90000) + 10000;
    var text = "Email: " + doc.email + "\n\n" + "Here's your validation code: " + num
    this.unblock();
    // Send the e-mail
    Email.send({
      to: doc.email,
      from: doc.email,
      subject: "Website Contact Form: keep slayin boi",
      text: text
    });
  },
  sendSMS: function(doc) {
    var twilio = Twilio('AC528f5b6507742d3b1930a5ef129880d5', '8cb9b6181585aacbaf0e60c54fdef8f3');
    var num = Math.floor(Math.random() * 90000) + 10000;
    var auth = returnAuth(num)
    this.unblock();
    twilio.sendSms({
      to: doc.phoneNumber, // any number Twilio can deliver to
      from: '+18323849792', // must be your Twilio account phone number
      body: "Here's your verification code: " + num
    }, function(err, responseData) { //executed when a response is received from Twilio
      if (!err) {
        // "responseData" is a JavaScript object containing data received from Twilio.
        console.log(responseData.body); // outputs "here is your confirmaton"
      }
    })
  },
  authToken: function(){
    return auth
  }
})
