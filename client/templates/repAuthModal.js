Template.repAuthModal.events({

  "submit .authForm": function(event){
    event.preventDefault();
    var code = event.target.code.value;
    var that = this
    Meteor.call("checkValidation", ''+code, this.daycareId, this.userId, function (err, results){
      if (err) {
        console.log(err);
      } else {
        if (results) {
          toastr.success('Successfully authenticated!');
          $('#repAuthModal').foundation('reveal', 'close');
          FlowRouter.go('/represent/'+ that.daycareId)
        } else {
          //else, show err message
          toastr.error('Whoops! Incorrect Code.')
        }
      }
      event.target.code.value = '';
    })
  }
});
