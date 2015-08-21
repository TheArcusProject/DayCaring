Template.waitlist.helpers({
  isAdmin : function(){
    return adminBool;
  },
  getArr : function(){
    return this.list;
  },
  grossHack : function() {
    adminBool = this.isAdmin;
  },
})

Template.waitlist.events({
  'click #acceptButton': function(e){
    Meteor.call('waitlistAccept',this._id);
  }
})