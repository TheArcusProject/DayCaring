schools = new Mongo.Collection('schools');
nonCompliance = new Mongo.Collection('nonCompliance');
zipCodes = new Mongo.Collection('zipCodes');

if (Meteor.isServer) {
  Meteor.publish("zipCodes", function(zip) {
    return zipCodes.find({
      0: '"' + zip + '"'
    });
  })
}
