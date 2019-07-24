import React , { Component }	from 'react';
import axios 					from 'axios';
import ReactTable 				from 'react-table'; //import react table
import { connect } 				from 'react-redux';
import {withRouter}    from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-table/react-table.css' //import css
import './Availability.css';
import 'bootstrap/js/tab.js';
import 'bootstrap/js/modal.js';

 class Availability extends Component{

		constructor(props){
			super(props);
			this.state = {
				contactPerson       : "Someone",
				available           :[
					{"day" : "Everyday", "time" : "10:00AM - 7:00PM" },
					{"day" : "Weekday", "time" : "10:00AM - 7:00PM" }
				],
			};
		}
		insertAvailability(event){
			event.preventDefault();
			const formValues = {
				"contactPersonMobile" : this.refs.contactPersonMobile.value,
				"availability" 		  : this.refs.availability.value,
				"timeFrom" 		  	  : this.refs.timeFrom.value,
				"timeTo" 		      : this.refs.timeTo.value,
        		"contactPerson"       : this.state.contactPerson,
				"property_id" 		  : this.props.property_id,
				"uid" 				: this.props.uid,

				

			};
			console.log("Availability req = ",formValues);
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
		var time = this.refs.timeFrom.value + ' - ' + this.refs.timeTo.value ;

		availability.push({
			"day" : day,
			"time" : time
		});

		this.setState({
			"available" : availability,
		});

	}
	render() {
		// const data = [{
  //  			Availability: 'Tanner Linsley',
		//     Time: 26,
		    
		//   }]
		const columns = [{
			Header: 'Availability',
			accessor: 'day'
			}, {
			Header: 'Time',
			accessor: 'time',
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
     <div >
           <div className="col-lg-12  col-md-12 col-sm-12 col-xs-12">
			<form id="form">
			  {/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 title_pd">	
			  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">	
					<label className="title_sz">Please tell us your availability to plan visit</label>
					<Link to="/HomePage" className=" ">
						<button type="button" className="close">&times;</button>
					</Link>
				</div>
			  </div>*/}
			  <div className="row"></div>
			   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  	 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  	 	<label>Who will show?</label>
			  	 </div>
			  </div>
		  	  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">	
				  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				  	<div className="form-group" id="superArea">
					 	<div className="can-toggle genderbtn demo-rebrand-2" onChange={this.selectType.bind(this)}>
				              <input id="d" type="checkbox"/>
				              <label className="formLable" htmlFor="d">
				             	 <div className="can-toggle__switch" data-checked="Myself"  data-unchecked="someone" ></div>
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
			  	 	<label>Visit Schedule (Add as you may like)</label>
			  	 </div>
			  </div>
			  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm_5">
			  	 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  	 	Availability
			  	 </div>
			  </div>
			 

		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">	
	  		
				 
		    	<div className="col-lg-3 col-md-4 col-sm-4 col-xs-4">
					  
					  <select className="custom-select form-control " ref="availability" placeholder="select" >
				    	<option disabled>-- Select --</option>
				    	<option value="everyDay">Everyday (Mon-Sun)</option>
				    	<option value="weekDays">Weekdays (Mon-Fri)</option>
				    	<option value="weekEnds">Weekends (Sat-Sun)</option>
				    </select>
				  </div>


				  <div className="col-lg-3 col-md-4 col-sm-4 col-xs-4">
					  <div className="form-group"  id="" >
					    <div className="input-group inputBox-main " id="">
					      	<div className="input-group-addon inputIcon">
		                     <i className="fas fa-rupee-sign iconSize12"></i>
		                    </div>
					    {/*<span for="">Per</span><span className="asterisk">*</span>*/}
{					    <input type="time" className="form-control" ref="timeFrom" placeholder="From 10:00 AM" />
}					    {/*<div className="errorMsg">{this.state.errors.builtArea}</div>*/}

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
					    {/*<input type="text" className="form-control" ref="timeTo"  placeholder="To 09:00 PM"/>*/}
{					    <input type="time" className="form-control" ref="timeTo" placeholder="To 09:00 PM" />
}
					    {/*<div className="errorMsg">{this.state.errors.builtArea}</div>*/}


					  	</div>
					  </div>
				  </div>

				  <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
					  <div className="form-group"  id="" >
					    <div className="input-group inputBox-main " id="">
					      	<button className="btn" onClick={this.handleAvailability.bind(this)}>&nbsp; &nbsp; &nbsp;Add Slot + &nbsp; &nbsp; &nbsp;</button>
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
		  		Wednesday
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
		  	<button className="weekBtn weekBtn_lst Active">
		  		Sunday
		  	</button>
		  	
		  	</div>	
		  </div>
		 

		   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">	
		  	 	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  	 	<ReactTable
				    data={this.state.available}
				    columns={columns}
				    className={"-striped -highlight"}
				    minRows={3}
				  />
			  	 	
				</div>
			</div>
		  

		  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
