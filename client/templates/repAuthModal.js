Schema.validationCode = new SimpleSchema({
	code: {
		type: String,
		label: "Validation Code"
	}
})

Template.repAuthModal.helpers({
	codeAuthSchema: function(){
		return Schema.validationCode;
	}
})