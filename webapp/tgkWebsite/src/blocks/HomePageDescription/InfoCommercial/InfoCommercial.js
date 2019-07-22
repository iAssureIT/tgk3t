import React , { Component }	from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import './InfoCommercial.css';
/*var formValues=[];*/
export default class InfoCommercial extends Component {

	render() {
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad mt40">
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad divContainer">
					<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 ">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  personServices ">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-info">

								<img src="images/15.png" />
								<br/>
								<label className="mt10">Personalised Service</label>
								<br/>
								India's only ONLINE-OFFLINE Property
								company!! Your local broker with Pan-India Reach*
							</div>
						</div>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 ">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 personServices">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-info">
								<img src="images/16.png" />

								<br/>
								<label className="mt10">Earning for Owners</label>
								<br/>
								GET UPTO 50%Brokerage for dealing through us!!
								Extra 10% for EXCLUSIVE LISTING on TGK
							</div>
						</div>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 ">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 personServices">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-info">
								<img src="images/17.png" />
								<br/>
								<label className="mt10">Unbelivable Discount</label>
								<br/>
								BUYERS/Tenants: Amazing discount/ offers upto 50% on Feesl!
							</div>
						</div>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 ">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 personServices">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-info">
								<img src="images/18.png" />
								<br/>
								<label className="mt10">Best Properties in India</label>
								<br/>
								Best Properties are only listed at THE GOLDEN KEY as we pay REAL MONEY (upto 50% of Fees)
								to Owners for listing with us
							</div>
						</div>
					</div>
				</div>
				
			</div>
		);
	}
}