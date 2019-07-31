import React , { Component }	from 'react';
import axios 					from 'axios';
import swal 					from 'sweetalert';		
import $						from 'jquery';
import ReactTable 				from 'react-table'; //import react table
import { connect } 				from 'react-redux';
import {withRouter}    from 'react-router-dom';
import 'react-table/react-table.css' //import css
import './Availability.css';

// import 'bootstrap/js/tab.js';
// import 'bootstrap/js/modal.js';
// import "bootstrap/dist/css/bootstrap.min.css";

const formValid = formerrors=>{
  console.log("formerrors",formerrors);
  let valid = true;
  Object.values(formerrors).forEach(val=>{
  val.length>0 && (valid = false);
  })
  return valid;
  }
const clientmobileRegex = RegExp(/^[0-9][0-9]{9}$/);


 class Availability extends Component{

		constructor(props){
			super(props);
			this.state = {
				contactPersonMobile :"",
				contactPerson       : "Someone",
				available           :[],
				formerrors :{
				
					clientMobile : " ",
				
				},
			};
		}
		insertAvailability(event){
			event.preventDefault();
			const formValues = {
				"contactPersonMobile" : this.state.contactPersonMobile,
        		"contactPerson"       : this.state.contactPerson,
				"property_id" 		  : localStorage.getItem("propertyId"),
				"uid" 				  : this.props.uid,
				"available"			  : this.state.available
			};
			console.log("Availability req = ",formValues);
		    if(this.state.available!=""){
		    		if(formValid(this.state.formerrors)){
				axios
				.patch('/api/properties/patch/availabilityPlan',formValues)
				.then( (res) =>{
					console.log("availabilityPlan",res);
					if(res.status === 200){
						/*swal("wow","great job done!","success");*/
						this.props.redirectToImageUpload(this.props.uid);

					}
				})
				.catch((error) =>{
					console.log("error = ", error);
				});
			}
		    }else{
              swal("Please enter mandatory fields", "", "warning");
              console.error("FORM INVALID - DISPLAY ERROR MESSAGE");

		    }
			
		}
		selectType(event){
          if(this.state.contactPerson === "Someone")
            {
              this.setState(
              {
                "contactPerson" : "Myself",
              });
            }else if(this.state.contactPerson === "Myself")
            {
               this.setState(
               {
                "contactPerson" : "Someone",
              }); 
            
          }
      }

      backToFinancials(){
		this.props.backToFinancials();
	}
	handleAvailability(event){
		event.preventDefault();
		var availability = this.state.available;

		var day  = this.refs.availability.value ;
		var time = this.refs.timeFrom.value + " " + this.refs.timeFromAMPM.value 
					 + ' - ' + 
				   this.refs.timeTo.value + " " + this.refs.timeToAMPM.value ;

		if(day!="" && time!="" && availability!=""){
			availability.push({
			"day" : day,
			"time" : time,

			});
			this.setState({
				"available" : availability,
			});

			$('input[name=timeFrom').val('');
			$('input[name=timeTo').val('');
			$('select[name=availableDay').val('');

		}else{
			alert("Please fill up the Time slot");
		};	
		

		



	}

	timeFromVal(){
		var timeFromVal = this.refs.timeFrom.value;
		var timeFrom 	= timeFromVal.split(":");
		if(timeFrom[0] > 12){
			timeFrom[0] = parseInt(timeFrom) - 12; 
			if(timeFrom[0] < 10){
				var newtimeFrom = "0" + timeFrom[0] + ":" + timeFrom[1] ;
			}else{
				var newtimeFrom = timeFrom[0] + ":" + timeFrom[1] ;
			}
			this.refs.timeFrom.value = newtimeFrom;
			this.refs.timeFromAMPM.value = "PM";
		}
	}

	timeToVal(){
		var timeToVal = this.refs.timeTo.value;
		var timeFromVal = this.refs.timeFrom.value;

		if(timeToVal<timeFromVal){
			// alert("To Time should not be less than From Time");

		}else{
			var timeTo 	= timeToVal.split(":");
			if(timeTo[0] > 12){
				timeTo[0] = parseInt(timeTo) - 12; 
				if(timeTo[0] < 10){
					var newtimeTo = "0" + timeTo[0] + ":" + timeTo[1] ;
				}else{
					var newtimeTo = timeTo[0] + ":" + timeTo[1] ;
				}
				this.refs.timeTo.value = newtimeTo;
				this.refs.timeToAMPM.value = "PM";
			}
		}

		
	}
	deleteData(row)
	{
		console.log('availability',this.state.available)
		console.log("rowId",row);

		this.state.available.splice(row,1)
		this.setState({available:this.state.available})
	}

	handleChange(event){
			event.preventDefault();
			const datatype = event.target.getAttribute('data-text');
		    const {name,value} = event.target;
		    let formerrors = this.state.formerrors;
			console.log("datatype",datatype);
			switch (datatype){


			case 'clientMobile' : 
		       formerrors.clientMobile = clientmobileRegex.test(value)? '' : "Please Enter 10 digit Number only";
		       break;

			default :
			break;

			}
			this.setState({ formerrors,
				[name]:value
			} );
		}

	render() {
   	 const {formerrors} = this.state;

   	 	const data = this.state.available;
   	 	// console.log('data',data)
		const columns = [{
			Header: 'Availability',
			accessor: 'day'
			}, {
			Header: 'Time',
			accessor: 'time',
			},
			{
			Header: 'Action',
			accessor: 'id',
			Cell: row => 
          (
          <div className="actionDiv col-lg-offset-3">
              <div className="col-lg-6" id={row.index} onClick={() => this.deleteData(row.index)}>
            <i className="fa fa-trash"> </i>
              </div>
             
            </div>
            )     
			}]
    return (
     <div >
           <div className="col-lg-12  col-md-12 col-sm-12 col-xs-12">
			<form id="form">
			  <div className="row"></div>
			   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  	 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  	 	<label>Who will show?</label>
			  	 </div>
			  </div>
		  	  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">	
				  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				  	<div className="form-group" id="superArea">
					 	<div className="can-toggle1 genderbtn demo-rebrand-2" onChange={this.selectType.bind(this)}>
				              <input id="d" type="checkbox"/>
				              <label className="formLable" htmlFor="d">
				             	 <div className="can-toggle1__switch" data-checked="Myself"  data-unchecked="Someone" ></div>
				                <div className="can-toggle1__label-text"></div>
				              </label>
			            	</div>
				  	</div>
				  </div>
				  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
					  <div className="form-group"  id="builtArea" >
						  <div className="input-group inputBox-main " id="">
					      	<div className="input-group-addon inputIcon">
		                     	<i className="fa fa-mobile iconClr"></i>
		                    </div>
					    		<input type="number" data-text="clientMobile" name="contactPersonMobile" value={this.state.contactPersonMobile} onChange={this.handleChange.bind(this)} className="form-control" ref="contactPersonMobile" min="0" placeholder="Phone Number" />
					  		</div>
					  		{this.state.formerrors.clientMobile &&(
		                          <span className="text-danger">{formerrors.clientMobile}</span> 
		                        )}
					  </div>
				  </div>
		 	 </div>
			  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm_5">
			  	 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  	 	<label>Visit Schedule (Add as many as You Like)</label>
			  	 </div>
			  </div>
		  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm_5">	
		    	<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">	
		    		<label className=""> Availability <span className="astrick">*</span></label>
					  <select className="custom-select form-control " ref="availability" placeholder="select" name="availableDay" >
				    	<option value="">-- Select --</option>
				    	<option value="Everyday"> Everyday (Mon-Sun)</option>
				    	<option value="Weekdays"> Weekdays (Mon-Fri)</option>
				    	<option value="Weekends"> Weekends (Sat-Sun)</option>
				    	<option value="Monday">   Monday 	</option>
				    	<option value="Tuesday">  Tuesday 	</option>
				    	<option value="Wednesday">Wednesday </option>
				    	<option value="Thursday"> Thursday 	</option>
				    	<option value="Friday">   Friday 	</option>
				    	<option value="Saturday"> Saturday 	</option>
				    	<option value="Sunday">   Sunday 	</option>
				    </select>
				</div>


				<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
	    			<label className="col-lg-12 col-md-12 col-sm-12 col-xs-12"> From Time<span className="astrick">*</span> </label>

					<div className="col-lg-7 col-md-8 col-sm-8 col-xs-8"  id="" >
					    <div className="input-group">
					      	<div className="input-group-addon inputIcon">
		                     	<i className="fa fa-clock-o " aria-hidden="true"></i>
		                    </div>
						    <input type="time" name="timeFrom" className="form-control col-lg-12" ref="timeFrom" onBlur={this.timeFromVal.bind(this)}/>
					  	</div>
					</div>
				  	<div className="col-lg-5 col-md-4 col-sm-4 col-xs-4"  id="" >
					    <div className="input-group" id="">
						    <select className="form-control col-lg-12" ref="timeFromAMPM" defaultValue="AM">
						    	<option > AM </option>
						    	<option> PM </option>
						    </select>
					  	</div>
			  		</div>
				</div>

				<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
	    			<label className="col-lg-12 col-md-12 col-sm-12 col-xs-12"> To Time <span className="astrick">*</span></label>

					<div className="col-lg-7 col-md-8 col-sm-8 col-xs-8"  id="" >
					    <div className="input-group inputBox-main ">
					      	<div className="input-group-addon inputIcon">
		                     	<i className="fa fa-clock-o " aria-hidden="true"></i>
		                    </div>
						    <input type="time" className="form-control col-lg-12" name="timeTo" ref="timeTo"  onBlur={this.timeToVal.bind(this)}/>
					  	</div>
					</div>
				  	<div className="col-lg-5 col-md-4 col-sm-4 col-xs-4"  id="" >
					    <div className="input-group" id="">
						    <select className="form-control col-lg-12" ref="timeToAMPM" defaultValue="PM">
						    	<option > AM </option>
						    	<option > PM </option>
						    </select>
					  	</div>
			  		</div>
			  	</div> 
		  	</div>
		  	 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  	 <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 pull-right">
			    	<label className="col-lg-12 col-md-12 col-sm-12 col-xs-12"></label>				  
					<button className="btn btn-primary" onClick={this.handleAvailability.bind(this)}>Add Slot +</button>					  	
				</div>
			</div>	

		   	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt23">	
		  	 	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  	 	<ReactTable
				    data={data}
				    columns={columns}
				    className={"-striped -highlight"}
				    minRows={3}
				  />
			  	 	
				</div>
			</div>

		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
		  	<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4 pull-left">
		       <button className="btn btn-danger col-lg-12 col-md-12 col-sm-12 col-xs-12 mt23" onClick={this.backToFinancials.bind(this)}> &lArr; &nbsp; &nbsp; Back </button>
		  	</div>
		  	<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4 pull-right">
		       <button type="submit" className="btn nxt_btn col-lg-12 col-md-12 col-sm-12 col-xs-12 mt23"  onClick={this.insertAvailability.bind(this)}>Save & Next &nbsp; &nbsp; &rArr;</button>
		  	</div>
		  </div>
		  
		</form>
		</div>

		</div>
		);
	}
}

const mapStateToProps = (state)=>{
	return {
		property_id  : state.property_id,
		uid			    : state.uid

	}
};
const mapDispatchToProps = (dispatch)=>{
	return {
		backToFinancials  	        : ()=> dispatch({type: "BACK_TO_FINANCIALS"
														
	}),
		redirectToImageUpload       : (uid)=> dispatch({type: "REDIRECT_TO_IMG_UPLOAD",
														uid:  uid
	}),


	}
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Availability));
