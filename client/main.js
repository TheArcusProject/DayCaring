localSchools = new Mongo.Collection('localSchools');
schoolStats = new Mongo.Collection('schoolStats');

Deps.autorun( function() {
    user = Meteor.user();
    if(user){
        var username = user.username;
    }
});


// Template.main.onCreated(function() {
//   $("#login-buttons").addClass("button small");
// });