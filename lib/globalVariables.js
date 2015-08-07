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
}
