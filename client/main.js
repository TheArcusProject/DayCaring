localSchools = new Mongo.Collection('localSchools');

Deps.autorun( function() {    
    user = Meteor.user();    
    if(user){    
        var username = user.username;    
        console.log(user.profile);   
    }    
});    
