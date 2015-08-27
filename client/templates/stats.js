var showBars = new ReactiveVar(true);

getCategory = function(num) {
  if ( 0 <= num && 1500 >= num ){
    return 0;
  } else if ( 1500 < num && 3100 >= num ){
    return 1;
  } else if ( 3100 < num && 4200 >= num ){
    return 2;
  } else if ( 4201 < num && 5627 >= num ){
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
      "Medium Low"  :.95,
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
    if ( 30 > this.widths[num] ) {
      retStr += "alert";
    } else if ( 60 > this.widths[num] ) {
      retStr += "secondary";
    } else if ( 99 > this.widths[num] ) {
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
