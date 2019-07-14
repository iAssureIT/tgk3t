import React , { Component }	from 'react';
import { Link } 				from 'react-router-dom';
import axios 					from 'axios';
// import NavTab 					from '../NavTab/NavTab.js';
import $ 						from "jquery";
import Form3 					from '../Form3/Form3.js';
import swal                     from 'sweetalert';


import './TransactionPage.css';
import 'bootstrap/js/tab.js';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/js/modal.js';

export default class TransactionPage extends Component{

		constructor(props){
			super(props);
			this.state = {
			
        		
			};
			this.handleBack = this.handleBack.bind(this);
			this.handleNext = this.handleNext.bind(this);
			this.updateForm = this.updateForm.bind(this);
		}

	

	    updateForm(data){
	         this.setState({
	         	"formshow" : data,
	         })
        }
		handleBack(event) {
			event.preventDefault();
   			
   			 this.props.updateForm("form-1");
   			
			
  		}
        handleNext(event){
        	event.preventDefault();
   			this.props.updateForm("form-3");
        }
  		

		updateUser(event){
			
			event.preventDefault();
		
			
			

			
			
		}

		closeModal(){
			$("#efg").removeClass('in');
		}

	render() {
    return (
    <div>
    
      <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 page_content ">
			<form  id="form">
			  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 title_pd">	
			  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">	
					<label className="title_sz">My Apartment Size and Financial Details</label>
					<button type="button" className="close" onClick={this.closeModal.bind(this)} data-dismiss="modal">&times;</button>
				</div>
			  </div>
			 
			  <div className="hr_border row"></div>
			  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-group">	
					 <div className="mtgbtm5"> <b> Transaction Type </b> <br/></div>
					  	  <input type="radio" name="transactionType" value="New property"/> New Property &nbsp; &nbsp;
						  <input type="radio" name="transactionType" value="Resale"/> Resale<br/>
			  </div>
			  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  form-group ">
			  		<div className="mtgbtm5"> <b> Possession Status</b>  <br/></div>
					  	  <input type="radio" name="transactionType" value="New property"/> Under Construction &nbsp; &nbsp;
						  <input type="radio" name="transactionType" value="Resale"/> Ready to Move<br/>				
			  </div>
			  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-group">
			  				<div className="mtgbtm5"> <b> Age of Construction </b> <br/> </div>
			  					<select className="custom-select form-control " name="yearOld" ref="yearOld" placeholder="select" >
							    	{<option className="hidden">--Select--</option>}
							    	<option>New Construction</option>
							    	<option>Less than 5 years</option>
							    	<option>10 to 15 years</option>
							    	<option>Above 20 years</option>
								</select>
			  </div>
			  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		  		<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4">
			       <button type="" className="btn back_btn col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.handleBack}>Back</button>
			  	</div>
			  	<div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4 pull-right">
			       <button type="submit " className="btn nxt_btn col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.updateUser.bind(this)}>Save & Next >></button>
			  	</div>
			  </div>		  
		</form>
		</div>
	</div>
		);
	}
}

