//DayCaring.js
if (Meteor.isServer) {
  Meteor.startup(function () {
    
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

Meteor.methods({
  sendEmail: function(doc) {
    // Important server-side check for security and data integrity
    // check(doc, Schema.authrep);

    // Build the e-mail text
    var text = "Phone number: " + doc.phoneNumber + "\n\n"
            + "Email: " + doc.email

    this.unblock();

    // Send the e-mail
    Email.send({
        to: doc.email,
        from: doc.email,
        subject: "Website Contact Form: keep slayin boi",
        text: text
    });
  }
});

