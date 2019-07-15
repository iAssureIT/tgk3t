import React , { Component }	from 'react';
import axios 					from 'axios';
import NavTab 					from '../NavTab/NavTab.js';
import ReactTable 				from 'react-table'; //import react table
import $ 						from "jquery";
import swal                     from 'sweetalert';

import "bootstrap/dist/css/bootstrap.min.css";
import 'react-table/react-table.css' //import css
import './Form5.css';
import 'bootstrap/js/tab.js';
import 'bootstrap/js/modal.js';

/*import Form4 from '../Form4/Form4.js';*/


export default class Form5 extends Component{

		constructor(props){
			super(props);
			this.state = {
				formshow 			:"form-5",
				contactPerson         : "",
			};
			this.handleBack = this.handleBack.bind(this);
			this.handleNext = this.handleNext.bind(this);
			this.updateForm = this.updateForm.bind(this);
		}

		handleBack(event) {
   			event.preventDefault();
   			 /*this.props.history.push('/Form1');*/
   			 this.props.updateForm("form-4");
  		}

  		handleNext(event){
        	event.preventDefault();
   			this.props.updateForm("form-7");
        }

        updateForm(data){
	         this.setState({
	         	"formshow" : data,
	         })
        }



		updateUser(event){
			event.preventDefault();
			console.log("abc");
			const formValues = {
				"contactPersonMobile" : this.refs.contactPersonMobile.value,
				"availability" 				: this.refs.availability.value,
				"startTime" 			: this.refs.startTime.value,
				"endTime" 		: this.refs.endTime.value,
        		"contactPerson"       : this.state.contactPerson,

			
				
			};
			console.log("asd====",formValues);
			

			//this.props.fun(formValues);
			axios
				.post('/api/sellResident',formValues)
				.then( (res) =>{
					console.log(res);
					if(res.status == 200){
						// alert("Data inerted successfully!")
						swal("Good job!", "Data inserted successfully!", "success");

						this.refs.contactPersonMobile.value 		= '';
						this.refs.availability.value 		= '';
						this.refs.startTime.value 	= '';
						this.refs.endTime.value 	= '';

					    this.setState(
			              {
			                "contactPerson" : '',
			              });
						this.props.history.push("/CongratsPage");

						$("#nop").hide();
    						$("#nop").removeClass('in');
						$("#qrs").show();
          					$("#qrs").addClass('in');
					}
				})
				.catch((error) =>{
					console.log("error = ", error);
					// alert("Something Went wrong")
				});
				// this.props.updateForm("form-7");
		}

		closeModal(){
			$("#nop").removeClass('in');
		}

		selectType(event){
          if(this.state.contactPerson === "someone")
            {
              this.setState(
              {
                "contactPerson" : "I",
              });
            }else if(this.state.contactPerson === "I")
            {
               this.setState(
               {
                "contactPerson" : "someone",
              }); 
            
          }
      }

	render() {
		const data = [{
   			Availability: 'Tanner Linsley',
		    Time: 26,
		   /* Action: ,*/
		    
		  }]
		const columns = [{
			Header: 'Availability',
			accessor: 'Availability'
			}, {
			Header: 'Time',
			accessor: 'Time',
			},
			{
			Header: 'Action',
			accessor: 'Action',
			Cell: row => 
          (
          <div className="actionDiv col-lg-offset-3">
              <div className="col-lg-6" onClick={() => this.deleteData(row.original)}>
            <i className="fa fa-trash"> </i>
              </div>
             
            </div>
            )     
			}]
    return (
     <div>
    	{/*<Form6 />
	   <div className="modal fade" id="nop" role="dialog">
	  	 <div className="modal-dialog modal-lg">
	      <div class="modal-content">
		    <div class="modal-body ModalPd">*/}
           <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 page_content margTop">
			<form id="form">
			  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 title_pd">	
			  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">	
					<label className="title_sz">Please tell us your availability toplan visit</label>
					<button type="button" className="close" data-dismiss="modal" onClick={this.closeModal.bind(this)}>&times;</button>
				</div>
			  </div>
			  {/*<hr />*/}
			  <div className="hr_border hr_border2 row"></div>
			   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  	 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  	 	<label>Who will show?</label>
			  	 </div>
			  </div>
		  	  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm">	
				  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				  	<div className="form-group" id="superArea">
{/*					    <label for="exampleFormControlInput1">Who will show</label>{/*<span className="asterisk">*</span>*/}
			    	{/*<input type="text" className="form-control" ref="superArea" id="superArea" placeholder="Super Area"/>*/}		
					 	<div className="can-toggle genderbtn demo-rebrand-2" onChange={this.selectType.bind(this)}>
				              <input id="d" type="checkbox"/>
				              <label className="formLable" htmlFor="d">
				             	 <div className="can-toggle__switch" data-checked="I"  data-unchecked="someone" ></div>
				                <div className="can-toggle__label-text"></div>
				              </label>
			            	</div>
				  	</div>
				  </div>
				  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
					  <div className="form-group"  id="builtArea" >
						  <div className="input-group inputBox-main " id="">
					      	<div className="input-group-addon inputIcon">
		                     	<i className="fa fa-building iconClr"></i>
		                    </div>
					    {/*<label for="exampleFormControlInput1">Apartment Name</label><span className="asterisk">*</span>*/}
					    		<input type="phone" className="form-control" ref="contactPersonMobile"  placeholder="Phone Number"/>
					    {/*<div className="errorMsg">{this.state.errors.builtArea}</div>*/}
					  		</div>
					  </div>
				  </div>
		 	 </div>
			  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm_5">
			  	 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  	 	<label>Visit Schedule(add as you may like)</label>
			  	 </div>
			  </div>
			  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm_5">
			  	 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  	 	Availability
			  	 </div>
			  </div>
			 

		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm_30">	
	  		
				 
		    	<div className="col-lg-3 col-md-4 col-sm-4 col-xs-4">
					  <div className="form-group"  id="" >
					    {/*<div className="input-group inputBox-main " id="">
					      	<div className="input-group-addon inputIcon">
		                     <i className="fas fa-rupee-sign iconSize12"></i>
		                    </div>*/}
					    {/*<span for="">Per</span><span className="asterisk">*</span>*/}
					    <input type="date" className="form-control" ref="availability"  placeholder="From 10:00am"/>
					    {/*<div className="errorMsg">{this.state.errors.builtArea}</div>*/}
					  	{/*</div>*/}
					  </div>
				  </div>

				  <div className="col-lg-3 col-md-4 col-sm-4 col-xs-4">
					  <div className="form-group"  id="" >
					    <div className="input-group inputBox-main " id="">
					      	<div className="input-group-addon inputIcon">
		                     <i className="fas fa-rupee-sign iconSize12"></i>
		                    </div>
					    {/*<span for="">Per</span><span className="asterisk">*</span>*/}
					    <input type="text" className="form-control" ref="startTime"  placeholder="From 10:00am"/>
					    {/*<div className="errorMsg">{this.state.errors.builtArea}</div>*/}
					  	</div>
					  </div>
				  </div>

				  <div className="col-lg-3 col-md-4 col-sm-4 col-xs-4">
					  <div className="form-group"  id="" >
					    <div className="input-group inputBox-main " id="">
					      	<div className="input-group-addon inputIcon">
		                     <i className="fas fa-rupee-sign iconSize12"></i>
		                    </div>
					    {/*<span for="">Per</span><span className="asterisk">*</span>*/}
					    <input type="text" className="form-control" ref="endTime"  placeholder="Start time 12:00am"/>
					    {/*<div className="errorMsg">{this.state.errors.builtArea}</div>*/}
					  	</div>
					  </div>
				  </div>

				  <div className="col-lg-3 col-md-4 col-sm-4 col-xs-4">
					  <div className="form-group"  id="" >
					    <div className="input-group inputBox-main " id="">
					      	<div className="input-group-addon inputIcon">
		                     <i className="fas fa-rupee-sign iconSize12"></i>
		                    </div>
					    {/*<span for="">Per</span><span className="asterisk">*</span>*/}
					    <input type="text" className="form-control" ref="addSlot"  placeholder="Add"/>
					    {/*<div className="errorMsg">{this.state.errors.builtArea}</div>*/}
					  	</div>
					  </div>
				  </div>

		    	
		  	 	
		  </div>

		 
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 weekMarg_btm">
		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		 
		  	<button className="weekBtn">
		  		Monday
		  	</button>
		  	<button className="weekBtn">
		  		Tuesday
		  	</button>
		  	<button className="weekBtn">
		  		Wenesday
		  	</button>
		  	<button className="weekBtn">
		  		Thursday
		  	</button>
		  	<button className="weekBtn">
		  		Friday
		  	</button>
		  	<button className="weekBtn">
		  		Saturday
		  	</button>	
		  	<button className="weekBtn weekBtn_lst">
		  		Sunday
		  	</button>
		  	
		  	</div>	
		  </div>
		 

		   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm_30 margTop">	
		  	 	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  	 	<ReactTable
				    data={data}
				    columns={columns}
				    className={"-striped -highlight"}
				    minRows={3}
				  />
			  	 	{/*<table className="text-center table table-bordered table-hover table-responsive table-striped valign">
				  	 	<thead>
				  	 	<tr>
				  	 		<th className="text-center">Internal</th>
				  	 		<th className="text-center">External</th>
				  	 		<th className="text-center">Action</th>
				  	 	</tr>
				  	 	</thead>
				  	 	<tr>
				  	 		<td className="text-center"> 
							  <div className="form-group text-center">
							   	Weekend
							  </div> 
							</td>
				  	 		<td className="text-center"> 
					  	 		<div className="form-group text-center">
					  	 			5 pm - 7 pm
							    </div>
						  	</td>
						  	<td>
							  	<div className="form-group">
							    	<i className="fa fa-users text-center"></i>
							  	</div>
						  	</td>
				  	 	</tr>
				  	 	<tr>
				  	 		<td className="text-center"> 
							  <div className="form-group text-center">
							   	Weekend
							  </div> 
							</td>
				  	 		<td className="text-center"> 
					  	 		<div className="form-group text-center">
					  	 			5 pm - 7 pm
							    </div>
						  	</td>
						  	<td>
							  	<div className="form-group">
							    	<i className="fa fa-users text-center"></i>
							  	</div>
						  	</td>
				  	 	</tr>
				  	 	<tr>
				  	 		<td className="text-center"> 
							  <div className="form-group text-center">
							   	Weekend
							  </div> 
							</td>
				  	 		<td className="text-center"> 
					  	 		<div className="form-group text-center">
					  	 			5 pm - 7 pm
							    </div>
						  	</td>
						  	<td>
							  	<div className="form-group">
							    	<i className="fa fa-users text-center"></i>
							  	</div>
						  	</td>
				  	 	</tr>
					</table>*/}
				</div>
			</div>
		
		  
		 
		  

		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  	{/*<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4">
		       <button type="" className="btn back_btn col-lg-12 col-md-12 col-sm-12 col-xs-12"  onClick={this.handleBack}>Back</button>
		  	</div>*/}
		  	<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4 pull-right">
		       <button type="submit" className="btn nxt_btn col-lg-12 col-md-12 col-sm-12 col-xs-12"  onClick={this.updateUser.bind(this)}>Save & Next >></button>
		  	</div>
		  </div>
		  
		</form>
		</div>

		</div>
	  /* </div>
	  </div>
	 </div>
	</div>*/


		);
	}
	


}

