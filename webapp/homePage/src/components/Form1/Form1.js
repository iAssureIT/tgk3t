import React , { Component }  from 'react';
import axios 				  from 'axios';
import NavTab 				  from '../NavTab/NavTab.js';
import $ 					  from "jquery";
import swal                   from 'sweetalert';


import './Form1.css';
import 'bootstrap/js/tab.js';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/js/modal.js';

/*var formValues=[];*/
axios.defaults.baseURL = 'http://apitgk3t.iassureit.com/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default class Form1 extends Component{

		constructor(props){
			super(props);
			this.state = {
				formshow         :"form-1",
				selectType1      : "Sell",
				selectedOption   : ''

			};
			this.handleBack = this.handleBack.bind(this);
			this.changeForm = this.changeForm.bind(this);
			this.updateForm = this.updateForm.bind(this);
			this.handleNext = this.handleNext.bind(this);
			this.radioChange = this.radioChange.bind(this);
		}

		componentDidMount(){
			
		}

		updateForm(data){
	         this.setState({
	         	"formshow" : data,
	         })
        }

        handleBack(event) {
   			event.preventDefault();
   			 /*this.props.history.push('/Form1');*/
   			 this.props.updateForm("form-7");
  		}


        handleNext(event){
        	event.preventDefault();
   			this.props.updateForm("form-2");
        }

		/*handleChange(event){
	  
	      let fields = this.state.fields;
	      fields[event.target.name] = event.target.value;
	      this.setState({
	        fields
	      });
	       if (this.validateForm()) {
	        let errors = {};
	        errors[event.target.name] = "";
	        this.setState({
	          errors: errors
	        });
	      }
  }

	    
		validateFormReq() {

	      let fields = this.state.fields;
	      let errors = {};
	      let formIsValid = true;

	      if (!fields["apartmentName"]) {
	        formIsValid = false;
	        errors["apartmentName"] = "This field required";
	      }

	      if (!fields["apartmentType"]) {
	        formIsValid = false;
	        errors["apartmentType"] = "This field required";
	      }

	      if (!fields["bhkType"]) {
	        formIsValid = false;
	        errors["bhkType"] = "This field required";
	      }

	      if (!fields["floor"]) {
	        formIsValid = false;
	        errors["floor"] = "This field required";
	      }
	      if (!fields["totalFloor"]) {
	        formIsValid = false;
	        errors["totalFloor"] = "This field required";
	      }
	      if (!fields["propertyage"]) {
	        formIsValid = false;
	        errors["propertyage"] = "This field required";
	      }
	       if (!fields["facing"]) {
	        formIsValid = false;
	        errors["facing"] = "This field required";
	      }
	      if (!fields["propertySize"]) {
	        formIsValid = false;
	        errors["propertySize"] = "This field required";
	      }




	      this.setState({
	        errors: errors
	      });
	      return formIsValid;
	    }
	    
		validateForm() {

	      let fields = this.state.fields;
	      let errors = {};
	      let formIsValid = true;

	      if (typeof fields["apartmentName"] !== "undefined") {
	        if (!fields["apartmentName"].match(/^[a-zA-Z ]*$/)) {
	          formIsValid = false;
	          errors["apartmentName"] = "*Please enter alphabet characters only.";
	        }
	      }
	      this.setState({
	        errors: errors
	      });
	      return formIsValid;
	    }
*/

		// handleBack() {
  //  			 this.props.history.push('/');
  // 		}
  		changeForm(event){
  			event.preventDefault();
  			var getFromdata = event.target.getAttribute('data-form');
  			var splitData   = this.state.formshow.split('-');
  			var getNum      = parseInt(splitData[1]);
  			if (getFromdata == "nextform") {
  			  var curentVal   = getNum + 1; 
              var currentForm = "form-"+curentVal;
  			}else{
  		      var curentVal   = getNum - 1; 
              var currentForm = "form-"+curentVal;
  			}
  			this.setState({"formshow": currentForm},()=>{
  				console.log(this.state.formshow);
  			})
  		}
        updateForm(data){
	         this.setState({
	         	"formshow" : data,
	         })
        }
  	// 	componentDidMount(){
		 //    $("#efg").show();
   //        	$("#efg").addClass('in');
		 // }


		updateUser(event){
			event.preventDefault();
			/*if (this.validateForm() && this.validateFormReq()) {*/
			// console.log("abc");

			const formValues = {

				"propertyholder":this.state.selectedOption,
				"propType"   :this.refs.propType.value,
				"location"   :this.refs.location.value,
        		"selectType1": this.state.selectType1,

				// "multistoryApt" 		: this.refs.multistoryApt.value,
				/*"bhkType" 				: this.refs.bhkType.value,
				"floor"  				: this.refs.floor.value,
				"totalFloor"  			: this.refs.totalFloor.value,
				"propertyage"  			: this.refs.propertyage.value,
				"facing"  				: this.refs.facing.value,
				"propertySize"  		: this.refs.propertySize.value,*/
			};
			console.log("form1===",formValues);

			   // let fields = {};
			   //  fields["multistoryApt"] = "";
			   //  fields["location"] = "";
			   // /* fields["bhkType"] = "";
			   //  fields["floor"] = "";
			   //  fields["propertyage"] = "";
			   //  fields["facing"] = "";
			   //  fields["propertySize"] = "";*/
			   //  this.setState({
			   //              "multistoryApt"           : "",          
			   //              "location"           : "",         
			   //              /*"bhkType"                 : "",
			   //              "floor"              	  : "",
			   //              "propertyage"             : "",
			   //              "ParentsNumber"           : "",*/
			   //               fields:fields
			   //  });

			    axios
				.post('/api/users',formValues)
				.then( (res) =>{
					console.log(res.data);
					if(res.status == 201){
						// alert("Data inserted successfully!")
						swal("Good job!", "Data inserted successfully!", "success");

						this.refs.propType.value = '';
						this.refs.location.value = '';
						this.setState(
			              {
			                "selectType1"        : '',
				            "selectedOption "    : ''

			              });
						this.props.history.push("/Form2");
						/*this.refs.bhkType.value 	  = '';
						this.refs.floor.value   	  = '';
						this.refs.totalFloor.value 	  = '';
						this.refs.propertyage.value   = '';
						this.refs.facing.value        = '';
						this.refs.propertySize.value  = '';*/
						// this.props.history.push("\Form2");
						$("#abc").hide();
    					$("#abc").removeClass('in');
						$("#efg").show();
          				$("#efg").addClass('in');
					}else{
						// alert(" Please Fill all fields")
					}
				})
				.catch((error) =>{
					console.log("error = ", error);
					// alert("Something Went wrong")
				});

			    // alert("Data inserted Successfully!")
			      /*}*/
			//this.props.fun(formValues);
			// this.props.updateForm("form-2");
			
		}

		closeModal(){
			$("#abc").removeClass('in');
		}
		selectType(event){
          if(this.state.selectType1 === "Sell")
            {
              this.setState(
              {
                "selectType1" : "Rent",
              });
            }else if(this.state.selectType1 === "Rent")
            {
               this.setState(
               {
                "selectType1" : "Sell",
              }); 
            
          }
      }
	   radioChange(event) {
	       	// event.preventDefault();
	    	this.setState({
	      	"selectedOption": event.currentTarget.value,
			    });
			
				    $('#radio-example1').click(function(){
				        $('.sellerType1').addClass('highlight').siblings().removeClass('highlight');       
				    });
				    $('#radio-example2').click(function(){
				        $('.sellerType2').addClass('highlight').siblings().removeClass('highlight');       
				    });
				    $('#radio-example3').click(function(){
				        $('.sellerType3').addClass('highlight').siblings().removeClass('highlight');       
				    });

		 }


	render() {
    return (

          <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 page_content margTop">
			<form id="form">
			  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 title_pd">	
			  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">	
					<label className="title_sz">Let's Provide Details of Your Property for sell</label>
					<button type="button" className="close" data-dismiss="modal" onClick={this.closeModal.bind(this)}>&times;</button>
				</div>
			  </div>
			  {/*<hr />*/}
			  <div className="hr_border row"></div>
		  	  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">	
				<div className="col-lg-7 col-md-8 col-sm-12 col-xs-12">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				  	 	<label>I am</label>
				  	 </div>
				  	 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 crc_mrg_btm"   >
				    	<div className="col-lg-1 sellerType1" id="radio-example1" >
					    <label className="radio-inline ">
					      <input type="radio" 
					      		 // name="optradio" 
					      		 value="owner" 
					      		 className="FrRadio" 
					      		  
					      		 checked={this.state.selectedOption === "owner"}
               					 onChange={this.radioChange} />

				  			<i className="fa fa-users fa-1x logo1"></i>
					    </label>
					    </div>

					    <div className="col-lg-1 col-lg-offset-2 sellerType2"  id="radio-example2" >
					    <label className="radio-inline ">
					      <input type="radio" 
					      		 // name="optradio" 
					      		 value="careTaker" 
					      		 className="FrRadio" 
					      		
					      		 checked={this.state.selectedOption === "careTaker"}
               					 onChange={this.radioChange}/>

				  			<i className="fa fa-users fa-1x logo1"></i>
					    </label>
					    </div>

					   



					    <div className="col-lg-1 col-lg-offset-2 sellerType3"  id="radio-example3" >
					    <label className="radio-inline ">
					      <input type="radio"
					      		 // name="optradio" 
					      		 value="builder" 
					      		 className="FrRadio" 
					      		
					      		 // ref="propH"
					      		 checked={this.state.selectedOption === "builder"}
               					 onChange={this.radioChange} 
					      		 />
				  			<i className="fa fa-users fa-1x logo1"></i>
					    </label>
					    </div>
						
				  	   
					  </div>
					  	<div className="col-lg-12 mb-40">
					  			<span className=""> Owner</span>
					  			<span className="ml-55"> Care Taker</span>
					  			<span className="ml-42"> Builder</span>
					  	</div>
					  	
         		
         		
                  <h3>this.state.selectedOption: {this.state.selectedOption}</h3>
     
					  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				   			<label>I would like to</label>
				   		</div>
				   		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">	    		
				    		{/*<input type="text" className="" ref="" id="" placeholder="Seller or renter"/>*/}	
		{/*		  	 		<label className="labelMarg">One Time MAintenance</label>  */}
				  	 	<div className="form-group" id="">
							<div className="can-toggle genderbtn demo-rebrand-2 " onChange={this.selectType.bind(this)}>
				              <input id="d" type="checkbox" />
				              <label className="formLable" htmlFor="d">
				             	 <div className="can-toggle__switch" data-checked="Rent"  data-unchecked="Sell" ></div>
				                <div className="can-toggle__label-text"></div>
				              </label>
			            	</div>
			            </div>
						</div>

						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mrgBtm">
				   			<label>Property Details</label>
				   		</div>
				   		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				   			 Property Type
				   		</div>

					   	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mrgBtm_25">
						  <div className="form-group" id="">
	{/*					    <label for="exampleFormControlInput1">Bedroom</label><span className="asterisk">*</span>
	*/}					    {/*<input type="text" className="form-control" ref="bedroom" id="exampleFormControlInput1" placeholder=""/>*/}
						  	 <select className="custom-select form-control" ref="propType" >
						    	<option	value="" hidden>Select Property Type </option>
						    	<option	disabled>ALL RESIDENTIAL </option>
						    	<option value="MultiStoeryApt">MultiStoery Apartment</option>
						    	<option value="ResidentialHouse">Residential House</option>
						    	<option value="Villa">Villa</option>
						    	<option value="Penthouse">Penthouse</option>
						    	<option value="StudioApt">Studio Apartment</option>
						    	<option	disabled>ALL COMMERCIAL </option>
						    	<option value="CommercialOS">Commercial Office Space</option>
						    	<option value="OfficeIT">Office in IT Park/SEZ</option>
						    	<option value="CommercialS">Commercial Shop</option>
						    	<option value="CommercialSR">Commercial Showroom</option>
						    	<option value="Warehouse">Warehouse/Godown </option>
						    	<option value="Industrial">Industrial Building</option>
							</select>
							{/*<div className="errorMsg">{this.state.errors.bedroom}</div>*/}
						  </div>
					  	</div>

				  		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mrgBtm_25">
					  <div className="form-group" id="">
{/*					    <label for="exampleFormControlInput1">Bedroom</label><span className="asterisk">*</span>
*/}					    {/*<input type="text" className="form-control" ref="bedroom" id="exampleFormControlInput1" placeholder=""/>*/}
					  	 <select className="custom-select form-control  "  ref="location"  >
					    	<option value="" hidden>My Property is Located in</option>
					    	<option value="pune">Pune</option>
					    	<option value="nashik">Nashik</option>
					    	<option value="mumbai">Mumbai</option>
						</select>
						{/*<div className="errorMsg">{this.state.errors.bedroom}</div>*/}
					  </div>
				  	</div>
			  	</div>
				  
				<div className="col-lg-5 col-md-8 col-sm-12 col-xs-12 boxLayout">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<img src="images/2.png" className="build_img"/>
					</div>
			  	</div>

			  </div>


				  
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  	<hr/>
		  	{/*<div className="form-group col-lg-4 col-md-2 col-sm-4 col-xs-4">
		       <button type="col-lg-4 col-md-2 col-sm-4 col-xs-4" className="btn">Back</button>
		  	</div>*/}
		  	<div className="form-group col-lg-3	col-md-2 col-sm-4 col-xs-4">
		       <button type="" className="btn back_btn col-lg-12 col-md-2 col-sm-4 col-xs-4" onClick={this.handleBack}>Back</button>
		  	</div>
		  	<div className="form-group col-lg-3	col-md-2 col-sm-4 col-xs-4 pull-right">
		       <button type="submit " className="btn nxt_btn col-lg-12 col-md-2 col-sm-4 col-xs-4" onClick={this.updateUser.bind(this)} >Save & Next >></button>
		  	</div>
		  </div>
		  
		</form>
		</div>
     
		);
	}
	


}
