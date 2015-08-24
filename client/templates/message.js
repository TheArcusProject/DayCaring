Template.message.helpers({
  formattedDate: function(date) {
    if(date) {
      return moment(date).format("MMM Do YYYY");
    }
  },
  
  getMessages: function() {
    console.log('in message.js helpers this is : ',this)
    return this;
  },
})