import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import axios 	 from 'axios';
import swal      from 'sweetalert';
import "./userManagement.css";
class EditUserProfile extends Component{
	constructor(props) {
	  super(props);
	 		    var UserId = this.props.match.params.id;
    		 	console.log("UserId ----------------------",UserId);
	  this.state = {
	  		UserId    : UserId,
	  		fullname  : "",
	  		username  : "",
	  		mobNumber : "",
	  		userProfile : "",
	  		firstName : "",
	  		lastName  : "",
			}	  	
			 this.handleChange = this.handleChange.bind(this);
	  }
	    
	handleSubmit(event) {
		var userid = this.state.UserId;
		console.log("userid-----------------------------------------",userid);
		var formvalues = {
		/*	"fullName" 		: this.refs.fullname.value,*/
			"firstname"		: this.refs.firstName.value,
			"lastname" 		: this.refs.lastName.value,
			"email"  		: this.refs.username.value,
			"mobNumber"  : this.refs.mobNumber.value,
		}
		console.log("formvalues",formvalues);
				axios.put('/api/users/'+userid, formvalues)
				.then((response)=> {		
					swal("User updated successfully","", "success");		
					 this.props.history.push('/umlistofusers');	
					console.log('response --==',response);
				})
				.catch((error)=>{
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                             swal("Your session is expired! Please login again.","", "error");
                             this.props.history.push("/login");
                        }
       			});    
	}

	handleChange(event){
			event.preventDefault();
	        const target = event.target;
	        const name   = target.name;
	}
	
	componentDidMount(){

      axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");


		console.log("here edit view");
		var userid = this.state.UserId;
		console.log("userid-----------------------------------------",userid);
		 axios.get('/api/users/'+ userid)
	      .then( (res)=>{
	        console.log(res.data);
	        var FName = res.data.profile.fullName.split(' ');
	        var FirstName = FName[0];
	        var LastName = FName[1];
	        var Email = res.data.profile.emailId;
	        var Mnob  = res.data.mobileNumber;

	        console.log("f name", FirstName);
	        console.log("L name", LastName);

	      this.refs.firstName.value = FirstName 
	      this.refs.lastName.value = LastName  
	     /* this.refs.fullname.value = FName */
		  this.refs.username.value = Email
		  this.refs.mobNumber.value = Mnob

		 
	      })
	      .catch((error)=>{
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                             swal("Your session is expired! Please login again.","", "error");
                             this.props.history.push("/login");
                        }
       		});    
	}
  	
	render(){      
		return (
				<div>
					<div>					        
					    <div className="">					        
					         <section className="content-header">
					            <h3 className="contentTitle">Edit User</h3>
					         </section>					         
					          <section className="content viewContent">
					            <div className="row">
					              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
					                <div className="box">					                 
					                  <div className="box-header with-border boxMinHeight">
								            <div className="box-header with-border">
								            <h4 className="reportTitle">Edit User Data</h4>
								            </div>										
											<div className="box-body">												
												<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12  EditUserProfileWrap">
													<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12">
														{/*<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12 group btmmargin inputContent">
															<label className="formLable">Full Name <label className="requiredsign">*</label></label>
                                                          <span className="blocking-span">
                                                           <div className="input-group inputBox-main  new_inputbx " >
                                                             <div className="input-group-addon remove_brdr inputIcon">
                                                             <i className="fa fa-user-circle fa "></i>
                                                            </div>  
                                                              <input type="text" style={{textTransform:'capitalize'}}
                                                               className="form-control UMname inputText form-control  has-content"
                                                                id="fullname" ref="fullname" name="fullname"  onChange={this.handleChange} placeholder="Full Name"/>
                                                           </div>   
                                                          </span>
														</div>*/}	

														   <div className=" col-lg-6 col-md-6 col-xs-6 col-sm-6 inputContent">
                                                          <label className="formLable">First Name <label className="requiredsign">*</label></label>
                                                          <span className="blocking-span">
                                                           <div className="input-group inputBox-main  new_inputbx " >
                                                             <div className="input-group-addon remove_brdr inputIcon">
                                                             <i className="fa fa-user-circle fa "></i>
                                                            </div>  
                                                              <input type="text" style={{textTransform:'capitalize'}}
                                                               className="form-control UMname inputText form-control  has-content"
                                                                id="firstName" ref="firstName" name="firstName" onChange={this.handleChange}  placeholder="First Name"/>
                                                           </div>   
                                                          </span>
                                                      </div>
                                                      <div className=" col-lg-6 col-md-6 col-xs-6 col-sm-6 inputContent">
                                                          <label className="formLable">Last Name <label className="requiredsign">*</label></label>
                                                          <span className="blocking-span row">
                                                          <div className="input-group inputBox-main  new_inputbx " >
                                                             <div className="input-group-addon remove_brdr inputIcon">
                                                              <i className="fa fa-user-circle fa "></i>
                                                            </div>  
                                                             <input type="text"className="form-control UMname inputText form-control  has-content" 
                                                             id="lastName" ref="lastName" name="lastName" onChange={this.handleChange}  placeholder="Last Name" />
                                                          </div>   
                                                          </span>
                                                      </div>


														<div className="col-lg-12 col-sm-12 col-xs-12 col-md-12 group btmmargin inputContent">
															<label className="formLable">Username/Email <label className="requiredsign">*</label></label>
                                                          	<input type="text" disabled  onChange={this.handleChange} className="disableInput inputMaterial form-control inputText" ref="username" name="username" required/>
														</div>
														<div className="col-lg-6 col-sm-6 col-xs-6 col-md-6 group btmmargin inputContent">
															<label className="formLable">Mobile Number <label className="requiredsign">*</label></label>
	                                                          <span className="blocking-span">
	                                                           <div className="input-group inputBox-main  new_inputbx " >
	                                                             <div className="input-group-addon remove_brdr inputIcon">
	                                                            <i className="fa fa-mobile"></i>
	                                                            </div>  
	                                                              <input type="text" style={{textTransform:'capitalize'}}
	                                                               className="form-control UMname inputText form-control  has-content"
	                                                                id="mobNumber" ref="mobNumber" name="mobNumber"  onChange={this.handleChange} placeholder="mobile number"/>
	                                                           </div>   
	                                                          </span>
														</div>	
													</div>
													<br/>
														<div className="col-lg-6 col-sm-12 col-xs-12 col-md-12 pull-right btmmargin userProfileEditBtn">
																<button onClick={this.handleSubmit.bind(this)} className="btn btn-primary pull-right">&nbsp; &nbsp;Update Profile&nbsp; &nbsp;</button>
														</div>
													</div>
												</div>	
										</div>
									  </div>
									</div>
								  </div>
							    </section>
							  </div>
							</div>
					     		
						</div>
					);
					
				

	} 

}

export default EditUserProfile;


