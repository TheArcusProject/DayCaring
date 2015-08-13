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
var code;
Meteor.methods({
  sendEmail: function(email) {
    // Important server-side check for security and data integrity
    // check(doc, Schema.authrep);
    // Build the e-mail text
    //generate a 5 digit random number for the verificatioon code
    console.log(email);
    var num = Math.floor(Math.random() * 90000) + 10000;
    //save it locally on DayCaring.js, so that we may use it to check
    code = num
    var text = 'Hi!\n\nThanks for using DayCaring. To finish verifying that you represent this school, please click the "I recieved a code!" button and enter your 5-digit verification code:' + "\n" + code + "\n\n\n" + "As a Representative for your DayCare, you can upload photos and customize your Daycare's page to further attract visitors."
    this.unblock();
    // Send the e-mail
    Email.send({
      to: email,
      from: "w.zachary.lee@gmail.com",
      subject: "Verify that you represent this school",
      text: text
    });
  },
  sendSMS: function(phoneNumber) {
    console.log(phoneNumber);
    var twilio = Twilio('AC528f5b6507742d3b1930a5ef129880d5', '8cb9b6181585aacbaf0e60c54fdef8f3');
    var num = Math.floor(Math.random() * 90000) + 10000;
    code = num
    this.unblock();
    twilio.sendSms({
      to: phoneNumber, // any number Twilio can deliver to
      from: '+18323849792', // must be your Twilio account phone number
      body: 'Your 5-digit verification code:' + "\n" + code
    }, function(err, responseData) { //executed when a response is received from Twilio
      if (!err) {
        // "responseData" is a JavaScript object containing data received from Twilio.
        console.log(responseData.body); // outputs "here is your confirmaton"
      }
    })
  },

  //We still need to solve the problem that code will be redefined upon multiple simultaneous requests
  checkValidation: function(userCode){
    if (userCode === code.toString()) {
      console.log('checks out!')
      //things to do: add the permission to the User and reroute them to the page of the daycare they were on before
    }
    else {
      console.log("nope")
      console.log("this is code", code)
    }
  }
})
