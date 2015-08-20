//http://stackoverflow.com/questions/12710001/how-to-convert-uint8-array-to-base64-encoded-string
function Uint8ToString(u8a){
  var CHUNK_SZ = 0x8000;
  var c = [];
  for (var i=0; i < u8a.length; i+=CHUNK_SZ) {
    c.push(String.fromCharCode.apply(null, u8a.subarray(i, i+CHUNK_SZ)));
  }
  return c.join("");
}

Template.pictureRow.helpers({
 
  getData: function(){
    //this.file is uint8array
    console.log('this.file.length is : ',this.file.length);
    var str64 = btoa(Uint8ToString(this.file));

    var theString = 'data:image/jpeg;base64,'+str64;
    return theString;
  },
  
})
