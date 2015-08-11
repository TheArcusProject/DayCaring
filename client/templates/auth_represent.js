Schema = {};
Schema.emailRep = new SimpleSchema({
	email: {
		type: String,
		regEx: SimpleSchema.RegEx.Email,
		label: "Email Address"
	},
	
})
Schema.phoneRep = new SimpleSchema({
	phoneNumber: {
		type: String,
		label: "Phone Number"
	}
})


Template.auth_represent.helpers({
	emailRepSchema: function() {
    return Schema.emailRep;
  },
  phoneRepSchema: function(){
  	return Schema.phoneRep;
  }
});
