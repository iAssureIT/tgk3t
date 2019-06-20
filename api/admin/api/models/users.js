const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	_id			: mongoose.Schema.Types.ObjectId,
	createdAt	: {type:Date},
	services	: {
		password:{
					bcrypt:String
				  },
		resume: {
			loginTokens:[
				{
					when: Date,
					hashedToken : String
				}
			]
		}
	},
	username	: {type:String},
	emails		: [
			{
				address:{type:String},
				verified: Boolean
			}
	],
	profile :{
		// firstname 		: String,
		// lastname  		: String,
		name	  		: String,
		emailId   		: String,
		mobNumber 		: String,
		profilepic		: String,
		pwd 			: String,
		status			: String,
		// otpMobile		: Number,
		// optEmail		: Number
	},
	roles : [String],
	heartbeat : Date
});

module.exports = mongoose.model('users',userSchema);
