  
Template.user_dashboard.helpers({
  isReady: function(sub) {
    if(sub) {
      return FlowRouter.subsReady(sub);
    } else {
      return FlowRouter.subsReady();
    }
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