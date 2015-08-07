Assets.getText('zipCodes.txt',function(err, data){
  zipCodes.push([]);
  var current = '';
  for (var i = 0; i < data.length; i++){
    if (data[i] === ',') {
      zipCodes[zipCodes.length-1].push(current);
      current = '';
    } else if (data[i] === '\n') {
      zipCodes.push([]);
      current = '';
    } else {
      current += data[i];
    }
  };
})