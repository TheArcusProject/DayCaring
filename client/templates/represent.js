Template.represent.helpers({
  isReady: function(sub) {
    if(sub) {
      return FlowRouter.subsReady(sub);
    } else {
      return FlowRouter.subsReady();
    }
  },
  getDaycare: function() {
    var dc = daycares.find().fetch();
    return dc;
  },
  getReviews: function() {
    var revObj
    revObj.reviews = reviews.find({},{sort:{createdAt:-1}}).fetch();
    revObj.isAdmin = true;
    return rev; 
  },
  toTitleCase: function(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })
  },
})