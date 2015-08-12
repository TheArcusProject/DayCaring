Schema.validationCode = new SimpleSchema({
	code: {
		type: String,
		label: "5 Digit Validation Code"
	}
});

Template.repAuthModal.helpers({
	codeAuthSchema: function(){
		return Schema.validationCode;
	}
});
