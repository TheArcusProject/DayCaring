var isAdmin = new ReactiveVar(false);

Template.message.helpers({
  setAdmin: function() {
    isAdmin.set(this.isAdmin);
  },
  isAdmin: function() {
    return isAdmin.get();
  },
  getMessages: function() {
    return this.messages;
  },
})

Template.message.events({
  "click #respondToMessage": function(e){
    e.preventDefault();
    sessionStorage.setItem('pmReplyid',this._id)
    $('#PMReplyModal').foundation('reveal','open');
  },
  "click #deleteMessage": function(e){
    e.preventDefault();
    Meteor.call('deleteMessage',this._id);
  }
})
