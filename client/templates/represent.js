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
    var revObj = {};
    revObj.reviews = reviews.find({},{sort:{createdAt:-1}}).fetch();
    revObj.isAdmin = true;
    revObj.isAuthor = false;
    return revObj; 
  },
  getPictures: function() {
    var picturesArr = pictures.find().fetch();
    return picturesArr;
  },
  getWaitlistData: function() {
    var waitListArr = waitlists.find().fetch();
    var retObj = {
      list: waitListArr,
      isAdmin: true
    }
    return retObj;
  },
  toTitleCase: function(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })
  },
  getMessages: function() {
    var msgs = messages.find().fetch();
    return msgs;
  }
})

Template.represent.events({
  'click .backToDaycare': function(e){
    e.preventDefault();
    FlowRouter.go('/' + FlowRouter.getParam('daycareId'));
  },
  'change #file': function(e){
    //http://stackoverflow.com/questions/27934141/meteor-uploading-file-from-client-to-mongo-collection-vs-file-system-vs-gridfs
    e.preventDefault();
    
    var reader = new FileReader();

    reader.onload = function(e){
      var buffer = new Uint8Array(reader.result)
      Meteor.call('insertPicture', FlowRouter.getParam('daycareId'), buffer);
    }

    reader.readAsArrayBuffer(e.target.files[0]);
    toastr.success('Image Uploaded!')
    // file is e.target.files[0]
  },

  "submit #description" : function(e){
    console.log(e.currentTarget[0].value)
    e.preventDefault();
    if (e.currentTarget[0].value){
      Meteor.call('addDescription', FlowRouter.getParam('daycareId'), e.currentTarget[0].value)
    }
  },
});
