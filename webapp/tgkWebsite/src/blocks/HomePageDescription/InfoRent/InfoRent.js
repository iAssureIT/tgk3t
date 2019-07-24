import React , { Component }	from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import './InfoRent.css';
/*var formValues=[];*/
export default class InfoRent extends Component {

	render() {
		return (
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad mt40">
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad divContainer">
					<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 personServices">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad">

								<img alt=""  src="images/15.png" />
								<br/>
								<label className="mt10">We LOVE Property Owners</label>
								<br/>
								We at TGK, love our PROPERTY OWNERS i.e. YOU. It is because of you we generate revenue so we are going to share up-to 50% brokerage with you based on salability of your property.
								Hurry, check our SELL-O-METER rating now to find salability of your property.
							</div>
						</div>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 ">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 personServices">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad">
								<img alt=""  src="images/16.png" />

								<br/>
								<label className="mt10">For our Buyers & Tenants</label>
								<br/>
								Buyers and Tenants are our key business partners and we offer you high class, streamlined brokerage services on top of massive discount (up-to 50%) on brokerage you pay.
							</div>
						</div>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 ">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 personServices">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad">
								<img alt=""  src="images/17.png" />
								<br/>
								<label className="mt10">What we do?</label>
								<br/>
								India’s only ONLINE-OFFLINE Property Company, which comes with ONLINE presence to bring property dealing at your fingertips with strong backbone of broker network for on the ground execution.
							</div>
						</div>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 ">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 personServices">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad">
								<img alt=""  src="images/18.png" />
								<br/>
								<label className="mt10">Why we are the best?</label>
								<br/>
								Be assured to find best properties only on TGK.
								BEST Properties are only listed at THE GOLDEN KEY as we pay REAL MONEY (up-to 50% of Brokerage) to Property Owners for listing with us.
							</div>
						</div>
					</div>
				</div>
				
			</div>
		);
	}
}