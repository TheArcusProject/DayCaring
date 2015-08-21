var showBars = new ReactiveVar(true);

getCategory = function(num) {
  if (num >= 0 && num <= 1500){
    return 0;
  } else if (num > 1500 && num <= 3100){
    return 1;
  } else if (num > 3100 && num <= 4200){
    return 2;
  } else if (num > 4201 && num <= 5627){
    return 3;
  }
};

Template.stats.helpers({
  getShowBars : function() {
    return showBars.get();
  },

  getViolations : function() {
    var categories = {
      0 : "Administration",
      1 : "Basic Care",
      2 : "Health & Safety",
      3 : "Facilities",
    }

    this.violations.forEach(function(violation){
      var num = parseInt(violation.violation.slice(4));
      violation.category = categories[getCategory(num)];
    });

    return this.violations;
  },


  getRatings : function(){
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
      var cat = getCategory(num);
      that.widths[cat] = that.widths[cat]*risks[violation.risk]
    });
  },
  getScore : function(num){
    return "width: "+this.widths[num]+"%;";
  },
  getColor : function(num){
    var retStr = "progress ";
    if (this.widths[num] < 30) {
      retSrt += "alert";
    } else if (this.widths[num] < 60) {
      retStr += "secondary";
    } else if (this.widths[num] < 99) {
      retStr += ""
    } else  {
      retStr += "success";
    }
    return retStr;
  },
});

Template.stats.events({
  "click .violations": function() {
    var current = showBars.get();
    showBars.set(!current);
  }
})

Template.stats.onCreated(function(){


});
