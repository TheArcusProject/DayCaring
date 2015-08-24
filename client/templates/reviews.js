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
  }
})

Template.review.events({
  "click #deleteComment": function(e){
    e.preventDefault();
    Meteor.call('deleteComent',this._id);
  }
})

