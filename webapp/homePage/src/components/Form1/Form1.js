import React , { Component }  from 'react';
import axios 				  from 'axios';
import NavTab 				  from '../NavTab/NavTab.js';
import $ 					  from "jquery";
import swal                   from 'sweetalert';

import './Form1.css';
import 'bootstrap/js/tab.js';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/js/modal.js';

export default class Form1 extends Component{

		constructor(props){
			super(props);
			this.state = {
				formshow         :"form-1",
				propertypurpose  : "",
				propertyHolder   : '',
				user_id 		 : localStorage.getItem("user_id"),
			};
			this.handleBack = this.handleBack.bind(this);
			this.changeForm = this.changeForm.bind(this);
			this.updateForm = this.updateForm.bind(this);
			this.handleNext = this.handleNext.bind(this);
			this.radioChange = this.radioChange.bind(this);
		}

		componentDidMount(){			

        	var message	= localStorage.getItem("message");

			if(message == "NEW-USER-CREATED"){
				swal("Welcome!","You are now logged in!","success");
			}			

			$('#radio-example1 ').click(function(){				    	
		        $('.sellerType1').addClass('highlight').siblings().removeClass('highlight');       
		    });
		    $('#radio-example2').click(function(){
		        $('.sellerType2').addClass('highlight').siblings().removeClass('highlight');       
		    });
		    $('#radio-example3').click(function(){
		        $('.sellerType3').addClass('highlight').siblings().removeClass('highlight');       
		    });

    		localStorage.removeItem("mobile");
    		localStorage.removeItem("otp");	
    		localStorage.removeItem("message");	

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

		updateUser(event){
			event.preventDefault();
			/*if (this.validateForm() && this.validateFormReq()) {*/
			// console.log("abc");

			const formValues = {

				"propertyHolder":this.state.propertyHolder,
        		"propertyPurpose": this.state.propertypurpose,
				"propertyType"   :this.refs.propertytype.value,
				"floor"         : this.refs.floor.value,
				"totalFloor"    : this.refs.totalfloor.value,


			};
			console.log("form1===",formValues);

			   // let fields = {};
			   //  fields["multistoryApt"] = "";
			   //  fields["propertyloc"] = "";
			   // /* fields["bhkType"] = "";
			   //  fields["floor"] = "";
			   //  fields["propertyage"] = "";
			   //  fields["facing"] = "";
			   //  fields["propertySize"] = "";*/
			   //  this.setState({
			   //              "multistoryApt"           : "",          
			   //              "propertyloc"           : "",         
			   //              /*"bhkType"                 : "",
			   //              "floor"              	  : "",
			   //              "propertyage"             : "",
			   //              "ParentsNumber"           : "",*/
			   //               fields:fields
			   //  });

			    axios
				.post('/api/sellResident',formValues)
				.then( (res) =>{
					console.log(res.data);
					if(res.status == 200){
						// alert("Data inserted successfully!")
						swal("Good job!", "Data inserted successfully!", "success");

						this.refs.propertytype.value = '';
						this.refs.floor.value 	= '';
						this.refs.totalfloor.value 	= '';
						
						this.setState(
			              {
			                "propertyPurpose"        : '',
				            "propertyHolder "    : ''

			              });
						this.props.history.push("/location");
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
          if(this.state.propertypurpose === "Sell")
            {
              this.setState(
              {
                "propertypurpose" : "Rent",
              });
            }else if(this.state.propertypurpose === "Rent")
            {
               this.setState(
               {
                "propertypurpose" : "Sell",
              }); 
            
          }
      }
	   radioChange(event) {
	       	event.preventDefault();
	    	this.setState({
	      	"propertyHolder": event.currentTarget.value,
			    });
			
				    $('#radio-example1 ').click(function(){

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

          <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 page_content margTop">
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
				    	<div className="col-lg-1 sellerType1"  >
					    <label className="radio-inline ">
					      <input type="radio" 
					      		 value="owner" 
					      		 className="FrRadio" 
					      		 id="radio-example1"
					      		 checked={this.state.propertyHolder === "owner"}
               					 onChange={this.radioChange} />

				  			<i className="fa fa-users fa-1x logo1"></i>
					    </label>
					    </div>

					    <div className="col-lg-1 col-lg-offset-2 sellerType2"  >
					    <label className="radio-inline ">
					      <input type="radio" 
					      		 value="careTaker" 
					      		 className="FrRadio" 
					      		 id="radio-example2"
					      		 checked={this.state.propertyHolder === "careTaker"}
               					 onChange={this.radioChange}/>

				  			<i className="fa fa-users fa-1x logo1"></i>
					    </label>
					    </div>

					    <div className="col-lg-1 col-lg-offset-2 sellerType3"   >
					    <label className="radio-inline ">
					      <input type="radio"
					      		 value="builder" 
					      		 className="FrRadio" 
					      		id="radio-example3"
					      		 checked={this.state.propertyHolder === "builder"}
               					 onChange={this.radioChange} 
					      		 />
				  			<i className="fa fa-users fa-1x logo1"></i>
					    </label>
					    </div>
						
					</div>

					  	<div className="col-lg-12 mb-40">
					  			<span className=""> Owner</span>
					  			<span className="ml-64"> Care Taker</span>
					  			<span className="ml-56"> Builder</span>
					  	</div>
         		
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
				   		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mrgBtm">
				   			 Property Type
				   		</div>

					   	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mrgBtm_25">
						  <div className="form-group" id="">
	{/*					    <label for="exampleFormControlInput1">Bedroom</label><span className="asterisk">*</span>
	*/}					    {/*<input type="text" className="form-control" ref="bedroom" id="exampleFormControlInput1" placeholder=""/>*/}
						  	 <select className="custom-select form-control" ref="propertytype" >
						    	<option	value="" hidden>Select Property Type </option>
						    	<option	disabled>ALL RESIDENTIAL </option>
						    	<option value="MultiStoreyApt">MultiStorey Apartment</option>
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

			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
			  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mrgBtm">
			  		<b>My Apartment is on</b>
			  	</div>
		  </div>
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mrgBtm row">
		  	<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"> 
			  <div className="form-group" id="floor">
		  		<div className="input-group inputBox-main " id="">
			      	<div className="input-group-addon inputIcon">
                     	<i className="fa fa-building iconClr"></i>
                    </div>
			  		<select className="custom-select form-control "  ref="floor" placeholder="Floor" >
				    	<option className="hidden">Floor</option>
				    	<option>Upper Base</option>
				    	<option>Lower Base</option>
				    	<option>Ground</option>
				    	<option>1</option>
				    	<option>2</option>
				    	<option>upto 200 </option>
					</select>
				</div>
			  </div>
			</div>

			<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				  <div className="form-group" id="totalfloor">
				  	{/*<input type="text" className="form-control" ref="totalfloor" id="exampleFormControlInput1" placeholder="Total floor"/>*/}
				  	<div className="input-group inputBox-main " id="">
				      	<div className="input-group-addon inputIcon">
	                     <i className="fa fa-building iconClr"></i>
	                    </div>
					  	<select className="custom-select form-control "  ref="totalfloor" placeholder="Floor" >
					    	<option className="hidden">Total Floor</option>
					    	<option>Upper Base</option>
					    	<option>Lower Base</option>
					    	<option>Ground</option>
					    	<option>1</option>
					    	<option>2</option>
					    	<option>upto 200 </option>
						</select>
					</div>
				  </div>
			 </div>
		  </div>

			  	</div>
				  
				<div className="col-lg-5 col-md-8 col-sm-12 col-xs-12 boxLayout">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<img src="images/2.png" className=""/>
					</div>
			  	</div>

			  </div>
				  
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  	
		  	<div className="form-group col-lg-3	col-md-2 col-sm-4 col-xs-4 pull-right">
		       <button type="submit " className="btn nxt_btn col-lg-12 col-md-2 col-sm-4 col-xs-4" onClick={this.updateUser.bind(this)} >Save & Next >></button>
		  	</div>
		  </div>
		  
		</form>
		</div>
     
		);
	}
	


}
