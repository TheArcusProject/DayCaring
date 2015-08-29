// to include in HTML use {{> review}}
var isAdmin, isAuthor;

Template.review.helpers({
  formattedDate: function(date) {
    if(date) {
      return moment(date).format("MMM Do YYYY");
    }
  },
  saveAdmin: function() {
    isAdmin = this.isAdmin;
  },
  saveAuthor: function() {
    isAuthor = this.isAuthor;
  },
  getReviews: function() {
    return this.reviews;
  },
  getIsAdmin: function() {
    return isAdmin;
  },
  getIsAuthor: function(){
    return isAuthor;
  },
  isResponse: function() {
    if (this.response) return true;
    return false;
  }
})

Template.review.events({
  "click #deleteComment": function(e){
    e.preventDefault();
    Meteor.call('deleteComment',this._id);
  },
  "click #respondToComment": function(e){
    e.preventDefault();
    var response = $('textarea#responseText').val();
    var date = new Date ();
    var daycareRep = Meteor.user();
    Meteor.call('addResponse', this._id, response, daycareRep.profile.name, date);
  }
})

