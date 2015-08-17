function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

Template.subheader.helpers({
  isLoggedIn : function () {
    if (user) {
      return true;
    } else {
      return false;
    }
  },
	daycareName: function(){
    return this.name;
	}
});

Template.subheader.events({
  'click .represent': function(e) {
    e.preventDefault();
    FlowRouter.go('/authrepresent');
  },
  'click .backToResults': function(e){
    e.preventDefault();
    FlowRouter.go('/searchresults/'+this.lat+'/'+this.lng);
  },
  'click .review': function(e) {
    e.preventDefault();
    $('#reviewModal').foundation('reveal', 'open');
  },
  'click .waitlist': function(e){
    e.preventDefault();
    $('#waitlistModal').foundation('reveal', 'open');
  }
})

