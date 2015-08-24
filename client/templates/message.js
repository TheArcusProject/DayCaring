var isAdmin = new ReactiveVar(false);

Template.message.helpers({
  setAdmin: function() {
    isAdmin.set(this.isAdmin);
  },
  isAdmin: function() {
    return isAdmin;
  },
  getMessages: function() {
    return this.messages;
  },
})

Template.message.events({
  "click #respondToMessage": function(e){
    e.preventDefault();
    $('#PMReplyModal').foundation('reveal','open');
  },
  "click #deleteMessage": function(e){
    e.preventDefault();
    Meteor.call('deleteMessage',this._id);
  }
})
