
var code;

//DayCaring.js : server only
// Contains:
// startup code
// Meteor.methods
// publications

Meteor.startup(function() {
  //Put all code in startup that is not
  //  template events
  //  template helpers
  //  Meteor.methods
  //  Meteor.publish
  //  Meteor.subscribe

  daycareAdmins = new Mongo.Collection('daycareAdmins') 
  //The client should NEVER subscribe to daycareAdmins

  daycares = new Mongo.Collection('daycares');
  zipCodes = new Mongo.Collection('zipCodes');
  reviews = new Mongo.Collection('reviews');


  // daycareData["09701411"] = {"name":"Inaccessable Daycare","address":"The Only Shack On The Island","phone":"479-387-8940","email":"Redford.john.m@gmail.com","website":"http://xkcd.com","accepts":"4 To 12","hours":"N/A","days":"N/A","parttime":"N/A","transportation":"N/A","capacity":"27","lat":"-37.3","lng":"-12.67","violations":[]}
  // //
  // console.log('removing daycares');
  // daycares.remove({});
  // for (key in daycareData){
  //   daycareData[key].iD = key;
  //   if (daycareData.hasOwnProperty(key)){
  //     daycares.insert(daycareData[key])
  //   }
  // }
  // console.log('daycaresData is loaded on server');


});

Meteor.methods({
  sendEmail: function(email, daycareId) {
    // Important server-side check for security and data integrity
    // Build the e-mail text
    //generate a 5 digit random number for the verificatioon code
    var num = Math.floor(Math.random() * 90000) + 10000;
    console.log('auth code for ',daycareId,' is ',num)
    daycares.update({iD:daycareId}, {$set: {authCode: ''+num}});
    var text = 'Hi!\n\nThanks for using DayCaring. To finish verifying that you represent this school, please click the "I recieved a code!" button and enter your 5-digit verification code:' + "\n" + num + "\n\n\n" + "As a Representative for your DayCare, you can upload photos and customize your Daycare's page to further attract visitors."
    this.unblock();
    // Send the e-mail
    Email.send({
      to: email,
      from: "w.zachary.lee@gmail.com",
      subject: "Verify that you represent this school",
      text: text
    });
  },
  sendSMS: function(phoneNumber, daycareId) {
    console.log(phoneNumber);
    var twilio = Twilio('AC528f5b6507742d3b1930a5ef129880d5', '8cb9b6181585aacbaf0e60c54fdef8f3');
    var num = Math.floor(Math.random() * 90000) + 10000;
    daycares.update({iD:daycareId}, {$set: {authCode: num}});
    this.unblock();
    twilio.sendSms({
      to: phoneNumber, // any number Twilio can deliver to
      from: '+18323849792', // must be your Twilio account phone number
      body: 'Your 5-digit verification code:' + "\n" + num
    }, function(err, responseData) { //executed when a response is received from Twilio
      if (!err) {
        // "responseData" is a JavaScript object containing data received from Twilio
      }
    })
  },

  //We still need to solve the problem that code will be redefined upon multiple simultaneous requests
  checkValidation: function(userCode, daycareId, userId){
    var dc = daycares.find({iD:daycareId}).fetch()[0];
    console.log('dc in checkValidation is ',dc)
    console.log('user code ',userCode,' dc.authCode ',dc.authCode)
    if (''+userCode === dc.authCode) {
      console.log('are the same')
      daycareAdmins.insert({daycareId:daycareId, userId:userId});
      return true;
    }
    else {
      return false
    }
  },
  checkAdmin: function(daycareId, userId){
    var dcAdmins = daycareAdmins.find({daycareId:daycareId}).fetch()
    for (var i = 0; i < dcAdmins.length; i++){
      if (dcAdmins[i].userId === userId) return true;
    }
    return false;
  },
  insertComments: function(comment, daycareId, userName) {
    var currentUser = Meteor.user();
    
    if(currentUser) {
      reviews.insert({
        comment: comment,
        user: userName,
        daycare: daycareId,
        createdAt: new Date()
      })
    }
  },
  chargeCard: function(stripeToken) {
    var Stripe = StripeAPI('sk_test_XaXw9eySvHXuJLvVDhIyMkk6');
    Stripe.charges.create({
      amount: 1000,
      currency: 'usd',
      source: stripeToken
    }, function(err, charge) {
      console.log(err, charge);
    });
  }
})


// --------------publications--------------
// there should not ever be a reference to daycareAdmins here

//create new publish for daycare reviews
Meteor.publish("getReviews", function(daycareId) {
  return reviews.find({daycare: ""+daycareId+""});
});

Meteor.publish("localDaycares", function(lat, lng) {
  var lat = parseFloat(lat);
  var lng = parseFloat(lng);
  var self = this;
  var daycaresArr = daycares.find().fetch();
  for (var i = 0; i < daycaresArr.length; i++){
    var dist = Math.sqrt(Math.pow(((lat-daycaresArr[i].lat)*69.2),2)+
      Math.pow(((lng-daycaresArr[i].lng)*69.2),2));
    if (dist < 5){
      self.added('daycares',i,daycaresArr[i]);
    }
  }
  self.ready();
});

Meteor.publish("aDaycare", function(daycareId) {
  return daycares.find({iD:""+daycareId+""});

});

