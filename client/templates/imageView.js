Template.imageView.helpers({
  images: function () {
    return Images.find(); // Where Images is an FS.Collection instance
  }
});