import React , { Component }	from 'react';

// import "bootstrap/dist/css/bootstrap.min.css";
import './InfoRent.css';
/*var formValues=[];*/
export default class InfoRent extends Component {

	render() {
		return (
			<div className="col-lg-12 col-md-12 col-sm-6 col-xs-12 mt56">
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 divContainer">
					<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
						
						<div class="flip-card">
					  	<div class="flip-card-inner">
						    <div class="flip-card-front">
						      <img src="/images/Icons/1.png" alt="Avatar" className="saleImg1"/>
						      <div className="col-lg-12 col-md-12 saleText1">
						      	<b>We LOVE Property Owners</b>
						      </div>
						    </div>
						    <div class="flip-card-back">
						      
						      <p className="saleTextP">We at LYVO, love our PROPERTY OWNERS. LYVO shares up-to 50% brokerage with Owners based on the salability of the property. Hurry, check SELL-O-METER rating now to find brokerage you will earn.
							  </p> 
						    </div>
					  	</div>
					</div>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
						
						<div class="flip-card">
						  	<div class="flip-card-inner">
							    <div class="flip-card-front">
							      <img src="/images/Icons/2.png" alt="Avatar" className="saleImg1"/>
							      <div className="col-lg-12 col-md-12 saleText1">
							      	<b>For our Buyers & Tenant</b>
							      </div>
							    </div>
							    <div class="flip-card-back">
							      
							      <p className="saleTextP">Buyers and Tenants are our key business partners and we offer you massive discount (up-to 50%) on the brokerage you pay and best-in-class services.
								  </p> 
							    </div>
						  	</div>
						</div>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
						
						<div class="flip-card">
						  	<div class="flip-card-inner">
							    <div class="flip-card-front">
							      <img src="/images/Icons/3.png" alt="Avatar" className="saleImg1"/>
							      <div className="col-lg-12 col-md-12 saleText1">
							      	<b>What we do?</b>
							      </div>
							    </div>
							    <div class="flip-card-back">
							      
							      <p className="saleTextP">India’s only ONLINE-OFFLINE Property Portal with ONLINE presence to bring property dealing at your fingertips and strong backbone of broker network for on the ground execution.
								  </p> 
							    </div>
						  	</div>
						</div>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 ">
						
						<div class="flip-card">
						  	<div class="flip-card-inner">
							    <div class="flip-card-front">
							      <img src="/images/Icons/4.png" alt="Avatar" className="saleImg1"/>
							      <div className="col-lg-12 col-md-12 saleText1">
							      	<b>Why we are the best?</b>
							      </div>
							    </div>
							    <div class="flip-card-back">
							      
							      <p className="saleTextP">Be assured to find best properties only on LYVO as we pay REAL MONEY (upto 50% Brokerage) to Property Owners to attract best assets combined with our top notch services.
								  </p> 
							    </div>
						  	</div>
						</div>   
					</div>
				</div>
				
			</div>
		);
	}
}