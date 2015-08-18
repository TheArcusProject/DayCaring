// to include in HTML use {{> review}}
Template.review.helpers({
  formattedDate: function(date) {
    if(date) {
      return moment(date).format("MMM Do YYYY");
    }
  },
  getReviews: function() {
    return this.reviews;
  },
  getIsRep: function() {
    return this.isAdmin;
  }
})

