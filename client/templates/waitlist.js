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
  },
  'click #removeWaitlist': function(e){
    console.log('in removeWaitlist click this is, ',this)
    Meteor.call('waitlistRemove',this._id);
  },
  'click #payRegistrationFee': function(e){
    console.log('in payRegistrationFee click')
    $('#paymentModal').foundation('reveal', 'open');
  }
})