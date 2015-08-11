Schema = {};
Schema.authrep = new SimpleSchema({
	email: {
		type: String,
		regEx: SimpleSchema.RegEx.Email,
		label: "Email Address"
	},
	phoneNumber: {
		type: String,
		label: "Phone Number"
	}
})

Template.auth_represent.helpers({
	authrepSchema: function() {
    return Schema.authrep;
  }
});
