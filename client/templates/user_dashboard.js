
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
  userReviews: function() {
    return this.reviews;
  },
  formattedDate: function(date) {
    if(date) {
      return moment(date).format("MMM Do YYYY");
    }
  },
  getMessages: function() {
    var msgs = messages.find().fetch();
    retObj = {
      isAdmin : false,
      messages: msgs
    }
    return retObj;
  }
})

Template.user_dashboard.events({
  "click #deleteComment": function(e){
    e.preventDefault();
    Meteor.call('deleteComment',this._id);
  }
})