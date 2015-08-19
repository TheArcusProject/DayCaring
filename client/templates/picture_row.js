Template.pictureRow.helpers({
  getPictures: function(){
    //https://jsfiddle.net/Jan_Miksovsky/yy7Zs/
    console.log(this)
    for (var i = 0; i < this.length; i++){
      var blob = new Blob( [ this[i].file ] , { type: "image/jpg" } );
      var urlCreator = window.URL || window.webkitURL;
      var imageUrl = urlCreator.createObjectURL( blob );
      this[i].url = imageUrl;
    }
    return this;
  }
})