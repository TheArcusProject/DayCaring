
Template.user_dashboard.helpers({
  isReady: function(sub) {
    if(sub) {
      return FlowRouter.subsReady(sub);
    } else {
      return FlowRouter.subsReady();
    }
  },
  getReviews: function() {
    var revObj = {};
    revObj.reviews = reviews.find({},{sort:{createdAt:-1}}).fetch();
    revObj.isAdmin = false;
    revObj.isAuthor = true;
    return revObj; 
  },
  getWaitlistData: function() {
    var waitListArr = waitlists.find().fetch();
    var retObj = {
      list: waitListArr,
      isAdmin: false
    }
    return retObj;
  },
})