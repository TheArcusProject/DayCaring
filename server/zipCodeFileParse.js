
//zipCodeParse.js
Assets.getText('zipCodes.txt',function(err, data){
  var zipCodesArr = [];
  zipCodesArr.push([]);
  var current = '';
  for (var i = 0; i < data.length; i++){
    if (data[i] === ',') {
      zipCodesArr[zipCodesArr.length-1].push(current);
      current = '';
    } else if (data[i] === '\n') {
      zipCodesArr.push([]);
      current = '';
    } else {
      current += data[i];
    }
  };
  for (var i = 0; i < zipCodesArr.length; i++){
    zipCodes.insert(zipCodesArr[i]);
  };
  console.log('Zip Code collection is ready on server. Size: ',zipCodesArr.length);
})
