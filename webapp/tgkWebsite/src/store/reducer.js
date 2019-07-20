const initialState = {
	LoginMobNum 	: true,
	LoginOtp 		: false,
	WebSignupForm 	: false,
	BasicInfo			: false,
	PropertyDetails			: false,
	Financials			: false,
	Amenities			: false,
	Availability			: false,
	Location		: false,
	CongratsPage	: false,
	uid 			: "",
	mobile 			: "",
	OTP 			: "",
	mobFoundMsg 	: "",
	propertyCode    : "",
	property_id     : "",
}

const reducer = (state = initialState,action) => {
	const newState = {...state};

	if(action.type === "MOBILE_FOUND"){
		newState.LoginMobNum 	= false;
		newState.LoginOtp 		= true;
		newState.WebSignupForm 	= false;
		newState.uid 			= action.uid;
		newState.mobile 		= action.mobile;
		newState.OTP 			= action.OTP;
		newState.mobFoundMsg 	= action.mobFoundMsg;
	}

	if(action.type === "MOBILE_NOT_FOUND"){
		newState.LoginMobNum 	= false;
		newState.LoginOtp 		= false;
		newState.WebSignupForm 	= true;
		newState.mobile 		= action.mobile;
	}

	if(action.type === "USER_CREATED"){
		newState.LoginOtp 	= false;
		newState.BasicInfo	 	= true;
	}

	if(action.type === "SIGN_UP"){
		newState.WebSignupForm 	= false;
		newState.LoginOtp 		= true;
		newState.uid 			= action.uid;
		newState.mobile 		= action.mobile;
		newState.OTP 			= action.OTP;
		newState.mobFoundMsg 	= action.newUsermessage;				
	}

	if(action.type === "REDIRECT_TO_BASIC_INFO"){
		newState.LoginOtp 	= false;
		newState.BasicInfo 		= true;
	}
	if(action.type === "REDIRECT_TO_LOCATION"){
		newState.BasicInfo 		= false;
		newState.Location 	= true;
		newState.propertyCode = action.propertyCode;
		newState.property_id  = action.property_id;
	}
	if(action.type === "REDIRECT_TO_PROPERTY"){
		newState.Location 	=false;
		newState.PropertyDetails 	    = true;
		newState.propertyID = action.propertyID;
	}
	if(action.type === "REDIRECT_TO_AMENITIES"){
		newState.PropertyDetails 	    = false;
		newState.Amenities   	= true;
		newState.propertyID = action.propertyID;
	}
	if(action.type === "REDIRECT_TO_FINANCIAL"){
		newState.Amenities 	    = false;
		newState.Financials   	= true;
		newState.propertyID = action.propertyID;
	}
	if(action.type === "REDIRECT_TO_AVAILABILITY"){
		newState.Financials 	    = false;
		newState.Availability   	= true;
		newState.propertyID = action.propertyID;
	}

	if(action.type === "SHOW_FIRST_FORM"){
		newState.BasicInfo 	        = false;
		newState.PropertyDetails   	    = false;
		newState.Financials   	    = false;
		newState.Amenities   	    = false;
		newState.Availability   	    = true;
		newState.Location       = false;
		newState.CongratsPage   = false;
		newState.uid 		    = "5d3088c36e513977e889d2d1";
	}
	if(action.type === "BACK_TO_BasicInfo"){
		newState.BasicInfo 	    = true;
		newState.PropertyDetails   	= false;
		newState.Financials   	= false;
		newState.Amenities   	= false;
		newState.Availability   	= false;
		newState.Location   = false;
	}
	if(action.type === "BACK_TO_LOCATION"){
		newState.BasicInfo 	    = false;
		newState.PropertyDetails   	= false;
		newState.Financials   	= false;
		newState.Amenities   	= false;
		newState.Availability   	= false;
		newState.Location   = true;
	}
if(action.type === "BACK_TO_PropertyDetails"){
		newState.BasicInfo 	    = false;
		newState.PropertyDetails   	= true;
		newState.Financials   	= false;
		newState.Amenities   	= false;
		newState.Availability   	= false;
		newState.Location   = false;
	}
	if(action.type === "BACK_TO_Amenities"){
		newState.BasicInfo 	    = false;
		newState.PropertyDetails   	= false;
		newState.Financials   	= false;
		newState.Amenities   	= true;
		newState.Availability   	= false;
		newState.Location   = false;
	}
	if(action.type === "BACK_TO_Financials"){
		newState.BasicInfo 	    = false;
		newState.PropertyDetails   	= false;
		newState.Financials   	= true;
		newState.Amenities   	= false;
		newState.Availability   	= false;
		newState.Location   = false;
	}
if(action.type === "REDIRECT_TO_CONGRATS_PAGE"){
		newState.BasicInfo 	       = false;
		newState.PropertyDetails   	   = false;
		newState.Financials   	   = false;
		newState.Amenities   	   = false;
		newState.Availability   	   = false;
		newState.Location      = false;
		newState.CongratsPage  = true;
	}


	return newState;
}

export default reducer;