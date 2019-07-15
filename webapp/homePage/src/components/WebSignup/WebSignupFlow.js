import React , { Component }	from 'react';
import axios 					from 'axios';
import NavTab 					from '../NavTab/NavTab.js';
import $ 						from "jquery";
import Form1 					from '../Form1/Form1.js';
import Form2 					from '../Form2/Form2.js';
import Form3 					from '../Form3/Form3.js';
import Form4 					from '../Form4/Form4.js';
import Form5 					from '../Form5/Form5.js';
import Form6 					from '../Form6/Form6.js';
import CongratsPage             from '../CongratsPage/CongratsPage.js';
import Location             from '../Location/Location.js';

		
import './WebSignup.css';
import 'bootstrap/js/tab.js';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/js/modal.js';

import '../LoginMobNum/LoginMobNum.css';

/*var formValues=[];*/

 export default class WebSignupFlow extends Component{
		constructor(props){
			super(props);
			this.state = {
				formshow 			:"form-1",
			};
			this.handleBack = this.handleBack.bind(this);
			this.handleNext = this.handleNext.bind(this);
			this.updateForm = this.updateForm.bind(this);
		}
		handleBack(event) {
   			event.preventDefault();
   			 /*this.props.history.push('/Form1');*/
   			 this.props.updateForm("form-5");
  		}

		handleNext(event){
    		event.preventDefault();
			this.props.updateForm("form-1");
        }

        updateForm(data){
	         this.setState({
	         	"formshow" : data,
	         })
        }
		
        componentDidMount(){
          $("#xyz").show();
          $("#xyz").addClass('in');
  		}

		render() {
			var windowWidth = $(window).width();
	    	// console.log('ww',windowWidth);
	      if(windowWidth>=320&&windowWidth<=992){
	        var backImage = "visible-xs col-xs-12 visible-sm col-sm-12 noBackImage"
	        }
	       else{
	        var backImage = "backImageModal hidden-xs hidden-sm"
	      	}
		    var winHeight = window.innerHeight;
		    var divHeight = 760 +'px';

    	return (
    		<div className={backImage} style={{"height": winHeight}}> 

    			<div className="modal fade" id="xyz" role="dialog">
					<div className="modal-dialog modal-lg">
					    <div className="modal-content">
					    	<div className="modal-body ModalPd">
				  				{this.state.formshow == "form-7" ?
									<div>
										<CongratsPage />
									</div> 
								:
				      				this.state.formshow == "form-1" ?
									<Form1 updateForm={this.updateForm} />
								:
				      				this.state.formshow == "form-2" ?
				        			<Location updateForm={this.updateForm} />
				      			:
				      				this.state.formshow == "form-3"?
				              		<Form3 updateForm={this.updateForm} />
							    :
							        this.state.formshow == "form-4"?
				              		<Form4 updateForm={this.updateForm} />
							    :
							      	this.state.formshow == "form-5"?
							        <Form5 updateForm={this.updateForm} />
							    :
							    	this.state.formshow == "form-6"?
							        <Form6 updateForm={this.updateForm} />
							    :   
							      	
				      				null
				     			}
     						</div>	
					    </div>	
					</div>	
				</div>	
			</div>
		);
	}
}

