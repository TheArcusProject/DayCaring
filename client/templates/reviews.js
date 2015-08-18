// to include in HTML use {{> review}}
Template.review.helpers({
  formattedDate: function(date) {
    if(date) {
      return moment(date).format("MMM Do YYYY");
    }
  },
  getReviews: function() {
    console.log("in reviews getReviews, this is ",this)
    return this.reviews;
  },
  getIsRep: function() {
    return this.isAdmin;
  }
})

