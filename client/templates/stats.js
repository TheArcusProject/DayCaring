
Template.stats.helpers({
  grossHack : function(){
    console.log('in oncreated, this is: ', this)
    var violsArr = this.violations;
    this.widths = [100,100,100,100];
    risks = {
      "Low"         :.97,
      "Medium"      :.92,
      "Medium High" :.85,
      "High"        :.75,
    };
    var that = this;
    violsArr.forEach(function(violation){
      var num = parseInt(violation.violation.slice(4));
      console.log(num)
      if (num >= 0 && num <= 1500){
        that.widths[0] = that.widths[0]*risks[violation.risk];
      } else if (num > 1500 && num <= 3100){
        that.widths[1] = that.widths[1]*risks[violation.risk];
      } else if (num > 3100 && num <= 4200){
        that.widths[2] = that.widths[2]*risks[violation.risk];
      } else if (num > 4201 && num <= 5627){
        that.widths[3] = that.widths[3]*risks[violation.risk];
      }
    })
  },
  getScore : function(num){
    console.log('in helpers, this is ',this)
    return "width: "+this.widths[num]+"%;";
  },
  getColor : function(num){
    var retStr = "progress ";
    if (this.widths[num] < 30) {
      retSrt += "alert";
    } else if (this.widths[num] < 60) {
      retStr += "";
    } else  {
      retStr += "success";
    }
    return retStr;
  }
});

Template.stats.onCreated(function(){
  

});
