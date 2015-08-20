Template.represent.helpers({
  isReady: function(sub) {
    if(sub) {
      return FlowRouter.subsReady(sub);
    } else {
      return FlowRouter.subsReady();
    }
  },
  getDaycare: function() {
    var dc = daycares.find().fetch();
    return dc;
  },
  getReviews: function() {
    var revObj
    revObj.reviews = reviews.find({},{sort:{createdAt:-1}}).fetch();
    revObj.isAdmin = true;
    return rev; 
  },
  toTitleCase: function(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })
  },
})

Template.represent.events({
  'change #file': function(e){
    //http://stackoverflow.com/questions/27934141/meteor-uploading-file-from-client-to-mongo-collection-vs-file-system-vs-gridfs
    e.preventDefault();
    
    var reader = new FileReader();

    reader.onload = function(e){
      var buffer = new Uint8Array(reader.result)
      Meteor.call('insertPicture', FlowRouter.getParam('daycareId'), buffer);
    }

    reader.readAsArrayBuffer(e.target.files[0]);
    // file is e.target.files[0]
  },
  
})