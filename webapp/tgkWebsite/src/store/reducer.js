const initialState = {
	LoginMobNum 	: false,
	LoginOtp 		: false,
	WebSignupForm 	: false,
	BasicInfo		: false,
	PropertyDetails	: false,
	Financials		: false,
	Amenities		: false,
	Availability	: false,
	Location		: false,
	CongratsPage	: false,
	ImageUpload 	: false,
	uid 			: "",
	tempuid 		: "",
	mobile 			: "",
	OTP 			: "",
	mobFoundMsg 	: "",
	propertyCode    : "",
	property_id     : "",
	formTitle 		: "",
	token 			: "",
	originPage      : "",
	transactionType : "",
	propertyType    : "",
	availableMobile : "",
	prop_id 		: "",
	fullName 		: 	"",
	updateStatus 	: false,
	showMeter 		: false,
}

const reducer = (state = initialState,action) => {
	const newState = {...state};

	if(action.type === "MOBILE_ENTERED"){
		newState.LoginMobNum 	= false;
		newState.LoginOtp 		= true;
		newState.WebSignupForm 	= false;
		newState.tempuid 		= action.uid;
		newState.mobile 		= action.mobile;
		newState.OTP 			= action.OTP;
		newState.mobFoundMsg 	= action.mobFoundMsg;
		newState.fullName 		= action.fullName;
	}

	if(action.type === "REDIRECT_TO_SIGN_UP"){
		newState.LoginMobNum 	= false;
		newState.LoginOtp 		= false;
		newState.WebSignupForm 	= true;
		newState.tempuid 		= "";
		newState.uid 			= action.uid;
	}

	if(action.type === "SIGN_UP"){
		newState.WebSignupForm 	= false;
		newState.LoginOtp 		= false;
		newState.BasicInfo 		= true;
		newState.uid 			= action.uid;
		newState.mobile 		= action.mobile;
		newState.OTP 			= action.OTP;
		newState.mobFoundMsg 	= action.newUsermessage;				
	}

	if(action.type === "REDIRECT_TO_BASIC_INFO"){
		newState.WebSignupForm 		= false;
		newState.LoginOtp 	    	= false;
		newState.BasicInfo 	    	= true;
		newState.PropertyDetails   	= false;
		newState.Financials   	    = false;
		newState.Amenities   	    = false;
		newState.Availability   	= false;
		newState.Location           = false;
		newState.CongratsPage       = false;
		newState.ImageUpload        = false;
		newState.uid 		    	= action.uid;

	}

	if(action.type === "REDIRECT_TO_LOCATION"){
		newState.BasicInfo 	        = false;
		newState.PropertyDetails   	= false;
		newState.Financials   	    = false;
		newState.Amenities   	    = false;
		newState.Availability   	= false;
		newState.Location           = true;
		newState.CongratsPage       = false;
		newState.ImageUpload        = false;
		newState.propertyCode   	= action.propertyCode;
		newState.property_id    	= action.property_id;
		newState.uid 				= action.uid;
		newState.updateStatus 		= true;


	}
	if(action.type === "REDIRECT_TO_PROPERTY"){
		newState.BasicInfo 	        = false;
		newState.PropertyDetails   	= true;
		newState.Financials   	    = false;
		newState.Amenities   	    = false;
		newState.Availability   	= false;
		newState.Location           = false;
		newState.CongratsPage       = false;
		newState.ImageUpload        = false;
		newState.property_id 	    = action.property_id;
		newState.uid 				= action.uid;
		newState.updateStatus 		= true;

	}
	if(action.type === "REDIRECT_TO_AMENITIES"){
		newState.BasicInfo 	        = false;
		newState.PropertyDetails   	= false;
		newState.Financials   	    = false;
		newState.Amenities   	    = true;
		newState.Availability   	= false;
		newState.Location           = false;
		newState.CongratsPage       = false;
		newState.ImageUpload        = false;
		newState.property_id 	 	= action.property_id;
		newState.uid 			 	= action.uid;
		newState.updateStatus 		= true;


	}
	if(action.type === "REDIRECT_TO_FINANCIAL"){
		newState.BasicInfo 	        = false;
		newState.PropertyDetails   	= false;
		newState.Financials   	    = true;
		newState.Amenities   	    = false;
		newState.Availability   	= false;
		newState.Location           = false;
		newState.CongratsPage       = false;
		newState.ImageUpload        = false;
		newState.property_id    = action.property_id;
		newState.uid 			= action.uid;
		newState.updateStatus 		= true;


	}
	if(action.type === "REDIRECT_TO_AVAILABILITY"){
		newState.BasicInfo 	        = false;
		newState.PropertyDetails   	= false;
		newState.Financials   	    = false;
		newState.Amenities   	    = false;
		newState.Availability   	= true;
		newState.Location           = false;
		newState.CongratsPage       = false;
		newState.ImageUpload        = false;
		newState.property_id        = action.property_id;
		newState.uid 				= action.uid;
		newState.updateStatus 		= true;


	}
	if(action.type === "REDIRECT_TO_IMG_UPLOAD"){
		newState.BasicInfo 	        = false;
		newState.PropertyDetails   	= false;
		newState.Financials   	    = false;
		newState.Amenities   	    = false;
		newState.Availability   	= false;
		newState.Location           = false;
		newState.CongratsPage       = false;
		newState.ImageUpload        = true;
		newState.property_id       = action.property_id;
		newState.uid 			   = action.uid;
		newState.updateStatus 		= true;


	}
	if(action.type === "REDIRECT_TO_CONGRATS_PAGE"){
		newState.BasicInfo 	        = false;
		newState.PropertyDetails   	= false;
		newState.Financials   	    = false;
		newState.Amenities   	    = false;
		newState.Availability   	= false;
		newState.Location           = false;
		newState.CongratsPage       = true;
		newState.ImageUpload        = false;
		newState.property_id       = action.property_id;
		newState.uid 			   = action.uid;
	}
	// if(action.type === "SHOW_FIRST_FORM"){

	// 	newState.BasicInfo 	        = false;
	// 	newState.PropertyDetails   	= false;
	// 	newState.Financials   	    = false;
	// 	newState.Amenities   	    = false;
	// 	newState.Availability   	= false;
	// 	newState.Location           = false;
	// 	newState.CongratsPage       = true;
	// 	newState.ImageUpload        = false;
	// 	newState.uid 		        = action.uid;
	// }
	if(action.type === "BACK_TO_BASIC_INFO"){
		newState.BasicInfo 	      = true;
		newState.PropertyDetails  = false;
		newState.Financials   	  = false;
		newState.Amenities   	  = false;
		newState.Availability     = false;
		newState.Location         = false;
		newState.ImageUpload 	  = false;
		newState.property_id 	  = action.property_id;
		newState.uid 			  = action.uid;
		newState.updateStatus 	  = true;

	}
	if(action.type === "BACK_TO_LOCATION"){
		newState.BasicInfo 	    	= false;
		newState.PropertyDetails   	= false;
		newState.Financials   		= false;
		newState.Amenities   		= false;
		newState.Availability   	= false;
		newState.Location   		= true;
		newState.ImageUpload 	    = false;
		newState.property_id 	  	= action.property_id;
		newState.uid 			  	= action.uid;
		newState.updateStatus 	  	= true;
	}
	if(action.type === "BACK_TO_PROPERTY_DETAILS"){
		newState.BasicInfo 	    	= false;
		newState.PropertyDetails   	= true;
		newState.Financials   		= false;
		newState.Amenities   		= false;
		newState.Availability   	= false;
		newState.Location   		= false;
		newState.ImageUpload 	    = false;
		newState.property_id 	  	= action.property_id;
		newState.uid 			  	= action.uid;
		newState.updateStatus 	  	= true;
	}
	if(action.type === "BACK_TO_AMENITIES"){
		newState.BasicInfo 	    	= false;
		newState.PropertyDetails   	= false;
		newState.Financials   		= false;
		newState.Amenities   		= true;
		newState.Availability   	= false;
		newState.Location   		= false;
		newState.ImageUpload 	    = false;
		newState.property_id 	  	= action.property_id;
		newState.uid 			  	= action.uid;
		newState.updateStatus 	  	= true;
	}
	if(action.type === "BACK_TO_FINANCIALS"){
		newState.BasicInfo 	    	= false;
		newState.PropertyDetails   	= false;
		newState.Financials   		= true;
		newState.Amenities   		= false;
		newState.Availability   	= false;
		newState.Location   		= false;
		newState.ImageUpload 	    = false;
		newState.property_id 	  	= action.property_id;
		newState.uid 			  	= action.uid;
		newState.updateStatus 	  	= true;
	}
	if(action.type === "BACK_TO_AVAILABILITY"){
		newState.BasicInfo 	    	= false;
		newState.PropertyDetails   	= false;
		newState.Financials   		= false;
		newState.Amenities   		= false;
		newState.Availability   	= true;
		newState.Location   		= false;
		newState.ImageUpload 	    = false;
		newState.property_id 	  	= action.property_id;
		newState.uid 			  	= action.uid;
		newState.updateStatus 	  	= true;
	}

	if(action.type === "SET_FORM_TITLE"){
		newState.formTitle 			= action.formTitle;
	}

	if(action.type === "LOGOUT_ME"){
		newState.uid = "";
	}

	if(action.type === "LOGIN_MOB_NUM"){
		newState.originPage  = action.originPage;
		newState.LoginMobNum = true;
		newState.LoginOtp    = false;
	}

	if(action.type === "ALREADY_LOGGEDIN"){
		newState.originPage  		= action.originPage;
		newState.uid  				= action.uid;
		newState.property_id  		= action.property_id;
		newState.LoginMobNum 		= false;
		newState.LoginOtp    		= false;
		newState.WebSignupForm  	= false;
		newState.BasicInfo 			= true;			
		newState.PropertyDetails   	= false;
		newState.Financials   	    = false;
		newState.Amenities   	    = false;
		newState.Availability   	= false;
		newState.Location           = false;
		newState.CongratsPage       = false;
		newState.ImageUpload        = false;
		newState.updateStatus 		= true;
		
	}

	if(action.type === "LOGIN_ME"){
		newState.LoginMobNum 		= false;
		newState.LoginOtp    		= false;
		newState.WebSignupForm  	= false;
		newState.BasicInfo 			= false;
		newState.PropertyDetails   	= false;
		newState.Financials   	    = false;
		newState.Amenities   	    = false;
		newState.Availability   	= false;
		newState.Location           = false;
		newState.CongratsPage       = false;
		newState.ImageUpload        = false;
		newState.uid         	   = action.uid;
	}
	if(action.type === "PROPERTY_FLOW"){
		newState.propertyType         	= action.propertyType;
		newState.transactionType        = action.transactionType;
	}
	if(action.type === "AVAILABLE_MOBILE"){
		newState.availableMobile         = action.availableMobile;
	}

	if(action.type === "EDIT_PROP_PROFILE"){
		newState.uid   	      = action.uid;
		newState.property_id  = action.property_id;
		newState.updateStatus = true;
		newState.BasicInfo 	  = true;

	}

	return newState;
}

export default reducer;