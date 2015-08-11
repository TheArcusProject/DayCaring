schools = new Mongo.Collection('schools');
nonCompliance = new Mongo.Collection('nonCompliance');
zipCodes = new Mongo.Collection('zipCodes');
reviews = new Mongo.Collection('reviews');


if (Meteor.isServer) {
  Meteor.publish("zipCodes", function(zip) {
    return zipCodes.find({
      0: '"' + zip + '"'
    });
  })

  //create new publish for the noncompliance
   //get all noncompliance records for a daycare Id

  //create new publish for daycare reviews
  Meteor.publish("reviews", function() {
    return reviews.find({});
  })


  Meteor.publish("localSchools", function(lat, lng) {
    var self = this;
    var schoolsArr = schools.find().fetch();
    var placeholderId = 0;
    for (var i = 0; i < schoolsArr.length; i++){
      var dist = Math.sqrt(Math.pow(((lat-parseFloat(schoolsArr[i][37][1]))*69.2),2)+Math.pow(((lng-parseFloat(schoolsArr[i][37][2]))*69.2),2));
      if (dist < 5){
        self.added('localSchools',i,schoolsArr[i]);
      }
    }
    self.ready();

  });
}
