import React , { Component }	from 'react';
import {withRouter}         	from 'react-router-dom';
import $ 						from 'jquery';

// import "bootstrap/dist/css/bootstrap.min.css";
import './InfoCommercial.css';
/*var formValues=[];*/
 class InfoCommercial extends Component {
 	handleShow1(event){
		event.preventDefault()
    	 $('.saleTextP1').slideToggle("slow");
	}
	handleShow2(event){
		event.preventDefault()
    	 $('.saleTextP2').slideToggle("slow");
	}
	handleShow3(event){
		event.preventDefault()
    	 $('.saleTextP3').slideToggle("slow");
	}
	handleShow4(event){
		event.preventDefault()
    	 $('.saleTextP4').slideToggle("slow");
	}
	render() {
		return (
			<div className="col-lg-12 col-md-12 col-sm-6 col-xs-12 ">
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 divContainer hidden-xs hidden-sm">
					<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
						
					<div className="flip-card">
					  	<div className="flip-card-inner">
						    <div className="flip-card-front">
						      <img src="/images/Icons/1.png" alt="Avatar" className="saleImg1"/>
						      <div className="col-lg-12 col-md-12 saleText1 noPad">
						      	<b>We LOVE Property Owners</b>
						      </div>
						    </div>
						    <div className="flip-card-back">
						      
						      <p className="saleTextP">We at LYVO, love our PROPERTY OWNERS. LYVO shares up-to 50% brokerage with Owners based on the salability of the property. Hurry, check SELL-O-METER rating now to find brokerage you will earn.
							  </p> 
						    </div>
					  	</div>
					</div>

					</div>
					<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
						
					    <div className="flip-card">
						  	<div className="flip-card-inner">
							    <div className="flip-card-front">
							      <img src="/images/Icons/2.png" alt="Avatar" className="saleImg1"/>
							      <div className="col-lg-12 col-md-12 saleText1">
							      	<b>For our Buyers & Tenant</b>
							      </div>
							    </div>
							    <div className="flip-card-back">
							      
							      <p className="saleTextP">Buyers and Tenants are our key business partners and we offer you massive discount (up-to 50%) on the brokerage you pay and best-in-class services.
								  </p> 
							    </div>
						  	</div>
						</div>
						

					</div>
					<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
						
						<div className="flip-card">
						  	<div className="flip-card-inner">
							    <div className="flip-card-front">
							      <img src="/images/Icons/3.png" alt="Avatar" className="saleImg1"/>
							      <div className="col-lg-12 col-md-12 saleText1">
							      	<b>What we do?</b>
							      </div>
							    </div>
							    <div className="flip-card-back">
							      
							      <p className="saleTextP">India’s only ONLINE-OFFLINE Property Portal with ONLINE presence to bring property dealing at your fingertips and strong backbone of broker network for on the ground execution.
								  </p> 
							    </div>
						  	</div>
						</div>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
						
						<div className="flip-card">
						  	<div className="flip-card-inner">
							    <div className="flip-card-front">
							      <img src="/images/Icons/4.png" alt="Avatar" className="saleImg1"/>
							      <div className="col-lg-12 col-md-12 saleText1">
							      	<b>Why we are the best?</b>
							      </div>
							    </div>
							    <div className="flip-card-back">
							      
							      <p className="saleTextP">Be assured to find best properties only on LYVO as we pay REAL MONEY (upto 50% Brokerage) to Property Owners to attract best assets combined with our top notch services.
								  </p> 
							    </div>
						  	</div>
						</div>        
						
					</div>
				</div>
				{/*=========================resp=======================*/}
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 divContainer1 hidden-lg hidden-md">
					<div className="col-xs-6 noPad">
						<img src="/images/Icons/1.png" alt="Avatar" className="saleImg2" onClick={this.handleShow1.bind(this)}/>
						<div className="col-lg-12 col-md-12 saleText2">
					      	<b>We LOVE Property Owners</b>
					    </div>
					     

					</div>	
					<div className="col-xs-6 noPad">
						<img src="/images/Icons/2.png" alt="Avatar" className="saleImg2 "onClick={this.handleShow2.bind(this)}/>
						<div className="col-lg-12 col-md-12 saleText2">
					      	<b>For our Buyers & Tenant</b>
					    </div>
					</div>	
					<div className="col-xs-6 noPad mt10">
						<img src="/images/Icons/3.png" alt="Avatar" className="saleImg21" onClick={this.handleShow3.bind(this)}/>
						<div className="col-lg-12 col-md-12 saleText2">
					      	<b>What we do?</b>
					    </div>
					</div>	
					<div className="col-xs-6 noPad mt10">
						<img src="/images/Icons/4.png" alt="Avatar" className="saleImg2" onClick={this.handleShow4.bind(this)}/>
						<div className="col-lg-12 col-md-12 saleText2">
					      	<b>Why we are the best?</b>
					    </div>
					</div>
					<div className="saleTextP1 " >We at LYVO, love our PROPERTY OWNERS. LYVO shares up-to 50% brokerage with Owners based on the salability of the property. Hurry, check SELL-O-METER rating now to find brokerage you will earn.
					</div>
					<div className="saleTextP2 " >Buyers and Tenants are our key business partners and we offer you massive discount (up-to 50%) on the brokerage you pay and best-in-class services.
					</div>
					<div className="saleTextP3 " >India’s only ONLINE-OFFLINE Property Portal with ONLINE presence to bring property dealing at your fingertips and strong backbone of broker network for on the ground execution.
					</div>
					<div className="saleTextP4 " >Be assured to find best properties only on LYVO as we pay REAL MONEY (upto 50% Brokerage) to Property Owners to attract best assets combined with our top notch services.
					</div>	
				</div>
				{/*================end================================*/}
				
			</div>
		);
	}
}
  export default withRouter(InfoCommercial);