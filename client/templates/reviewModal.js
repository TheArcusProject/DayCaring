Template.reviewModal.helpers({
  getDaycareName: function() {
    return this.name;
  }
})

Template.reviewModal.events({
  "click .button": function(event, template) {
    event.preventDefault();
    var comment = $('textarea#review').val();
    var daycare = this._id;
    var daycareName = this.name;
    var currentUser = Meteor.user()
    Meteor.call("insertComments", comment, daycare, daycareName, currentUser.profile.name, currentUser._id, function(err, results) {
      if(err) console.log(err);
    })
    setTimeout(function() {
      $('#submittedReview').foundation('reveal', 'close');
    }, 1500)
  }
})
