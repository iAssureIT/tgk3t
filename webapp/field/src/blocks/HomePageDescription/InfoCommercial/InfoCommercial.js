import React , { Component }	from 'react';
import {withRouter}         from 'react-router-dom';

// import "bootstrap/dist/css/bootstrap.min.css";
import './InfoCommercial.css';
/*var formValues=[];*/
 class InfoCommercial extends Component {

	render() {
		return (
			<div className="col-lg-12 col-md-12 col-sm-6 col-xs-12 mt56">
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 divContainer">
					<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
						<img className="saleImg" src="/images/new/e.png" />
						<div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-8 col-xs-8 noPad sale">
							<img alt="" className="" src="/images/15.png" />
							<br/>
							<label className="saleText">We LOVE Property Owners</label>
							<br/>
							We at LYVO, love our PROPERTY OWNERS.We are going to share up-to 50% brokerage with you based on salability of your property.
							Hurry, check our SELL-O-METER rating now to find salability of your property.
						</div>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
						<img className="saleImg" src="/images/new/e.png" />
						<div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-8 col-xs-8 noPad sale">
							<img alt="" className="" src="/images/16.png" />
							<br/>
							<label className="saleText">For our Buyers & Tenant</label>
							<br/>
							Buyers and Tenants are our key business partners and we offer you high class, streamlined brokerage services on top of massive discount (up-to 50%) on brokerage you pay.
						</div>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
						<img className="saleImg" src="/images/new/e.png" />
						<div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-8 col-xs-8 noPad sale">
							<img alt="" className="" src="/images/17.png" />
							<br/>
							<label className="saleText">What we do?</label>
							<br/>
							India’s only ONLINE-OFFLINE Property Company, which comes with ONLINE presence to bring property dealing at your fingertips with strong backbone of broker network for on the ground execution.
						</div>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 ">
						<img className="saleImg" src="/images/new/e.png" />
						<div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-8 col-xs-8 noPad sale">
							<img alt="" className="" src="/images/17.png" />
							<br/>
							<label className="saleText">Why we are the best?</label>
							<br/>
							Be assured to find best properties only on LYVO.
							as we pay REAL MONEY (up-to 50% of Brokerage) to Property Owners for listing with us.
						</div>
					</div>
				</div>
				
			</div>
		);
	}
}
  export default withRouter(InfoCommercial);