var secret = Meteor.settings.private.stripe.testSecretKey;
var Stripe = StripeAPI(secret);

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
  reviews = new Mongo.Collection('reviews');
  waitlists = new Mongo.Collection('waitlists');
  pictures = new Mongo.Collection('pictures');
  messages = new Mongo.Collection('messages');

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

var hash = function(str) {

  var arr = str.split(""),
      retVal = 1;

  for (var i=0; i < arr.length; i++) {
    retVal *= (parseInt(arr[i]) + 4);
    console.log("retVal inside for loop : ", retVal);
  }

  retVal *= ((parseInt(arr[2]) + 2) % 10) + 1;
  retVal *= ((parseInt(arr[4]) + 2) % 10) + 1;
  console.log("retVal inside hash func :", retVal)

  return retVal
};

Meteor.methods({

  sendEmail: function(email, daycareId) {
    // Important server-side check for security and data integrity
    // Build the e-mail text
    //generate a 5 digit random number for the verificatioon code
    var num = Math.floor(Math.random() * 90000) + 10000;
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
    daycares.update({iD:daycareId}, {$set: {authCode: ''+num}});
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

    if (''+userCode === dc.authCode) {
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
      if (dcAdmins[i].userId === userId) {
        return true;
      }
    }
    return false;
  },
  hasAdmin: function(daycareId){
    var dcAdmins = daycareAdmins.find({daycareId:daycareId}).fetch()
    if (dcAdmins.length > 0) return true;
    return false;
  },
  insertComments: function(comment, daycareId, daycareName, userName, userId) {
    reviews.insert({
      comment: comment,
      user: userName,
      userId: userId,
      daycare: daycareId,
      daycareName: daycareName,
      createdAt: new Date()
    })
  },
  deleteComment: function(commentId) {
    reviews.remove({_id:commentId});
  },
  replyComment: function(commentId, response) {
    reviews.update({_id:commentId},{$set:{response:response}});
  },
  chargeCard: function(stripeToken) {
    var Stripe = StripeAPI('sk_test_XaXw9eySvHXuJLvVDhIyMkk6');//move to live key once app is in production
    Stripe.charges.create({
      amount: 50,
      currency: 'usd',
      source: stripeToken
    }, function(err, charge) {
      console.log("this is err", err)
      console.log("this is charge", charge)
    });
  },
  insertPicture: function(daycareId, file){
    pictures.insert({
      file:file,
      daycareId:daycareId
    });
  },
  addDescription: function(daycareId, description){
    daycares.update({
      iD: daycareId
    }, { $set: {description:description}})
  },
  addToWaitList: function(daycareId, daycareName, userId, userName, parentName, childName, age, address, city, zippycode, phoneNumber, startDate) {
    // var currentUser = Meteor.user();
    waitlists.insert({
      daycareId: daycareId,
      daycareName: daycareName,
      userId: userId,
      user: userName,
      parent: parentName,
      children: [
        { childName: childName,
         age: age }
        ],
      address: address,
      city: city,
      zipcode: zippycode,
      phone: phoneNumber,
      startDate: startDate,
      createdAt: new Date(),
      accepted: false,
      registrationFeePaid: false
    }, function(err, doc){
      daycares.update({
        iD: daycareId
      }, {
        $push: {waitlist: doc._id}
      })
    });
  },
  waitlistAccept: function(waitlistId) {
    waitlists.update({_id:waitlistId},{$set:{accepted:true}});
  },
  waitlistRemove: function(waitlistId) {
    var waitlistEntry = waitlists.find({_id:waitlistId}).fetch()[0]
    var associatedDaycare = daycares.find({iD:waitlistEntry.daycareId}).fetch()[0]
    associatedDaycare.waitlist.splice(associatedDaycare.waitlist.indexOf(waitlistEntry._id),1);
    daycares.update({iD:waitlistEntry.daycareId},{$set:{waitlist:associatedDaycare.waitlist}});
    waitlists.remove({_id:waitlistId});
  },
  feePaid: function(waitlistId) {
    waitlists.update({_id:waitlistId},{$set:{registrationFeePaid:true}})
  },
  addMessage: function(userId,daycareId,text){
    messages.insert({
      userId:userId,
      daycareId:daycareId,
      text:text
    });
  },
  replyMessage: function(messageId, reply){
    messages.update({
      _id:messageId
    }, {
      $set: {
        response : reply
      }
    })
  },
  deleteMessage: function(messageId){
    messages.remove({_id:messageId});
  },
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
    if (dist < 15){
      self.added('daycares',i,daycaresArr[i]);
    }
  }
  self.ready();
});

Meteor.publish("aDaycare", function(daycareId) {
  return daycares.find({iD:""+daycareId+""});
});

Meteor.publish("daycarePhotos", function(daycareId) {
  return pictures.find({daycareId:""+daycareId+""});
});

Meteor.publish("getWaitlist", function(daycareId) {
  return waitlists.find({daycareId: ""+daycareId+""});
});

Meteor.publish("getUserWaitlist", function(userId) {
  return waitlists.find({userId: userId});
  // var waitlistsArr = waitlists.find().fetch();
  // var self = this;
  // for (var i = 0; i < waitlistsArr.length; i++){
  //   if (waitlistsArr[i].user._id === userId) {
  //     self.added('waitlists',waitlistsArr[i]._id,waitlistsArr[i]);
  //   }
  // }
  // self.ready();
});

Meteor.publish("getUserReviews", function(userId){
  return reviews.find({userId:userId});
});

Meteor.publish("getUserMessages", function(userId){
  return messages.find({userId:userId});
});

Meteor.publish("getDaycareMessages", function(daycareId){
  return messages.find({daycareId:""+daycareId});
});

