
//zipCodeParse.js
Assets.getText('zips.txt',function(err, data){
  
  var zipCodesArr = JSON.parse(data);
  
  console.log('removing zip Codes');
  zipCodes.remove({});
  for (var i = 0; i < zipCodesArr.length; i++){
    zipCodes.insert(zipCodesArr[i]);
  };
  console.log('Zip Code collection is ready on server. Size: ',zipCodesArr.length);

})
