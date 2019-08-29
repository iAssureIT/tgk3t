import React, { Component } from 'react';
import './AboutUsInfo.css';

export default class AboutUsInfo extends Component {
	render() {
		return (
			<div className="container-fluid">
				<div className="col-lg-10 col-lg-offset-1 col-md-10 col-sm-12 col-xs-12 noPad About1 ">
					<h3 className="col-lg-3 col-lg-offset-2 col-xs-8 col-xs-offset-3  About2 ">ABOUT US</h3>
					<hr className="col-lg-10 col-lg-offset-1 col-xs-11" />
					<div className="col-lg-8 col-lg-offset-2  About3">
						<p><b>The GOLDEN KEY (TGK)</b> is a market disrupting Real Estate Brokerage ONLINE-OFFLINE business portal, which is aimed at addressing a number of key issues in the REAL Estate Brokerage Markets such as price discrepancy, services (or lack of), integrity, trust and transparency.</p>
						<p>TGK Team is a mix of professionals from different walks for life.</p>
						<p>Ashish Jain (MD, Founder) has about 20 years of Investment Banking IT experience in Tokyo and India. He worked with top Sales and Trading community in fast paced investment banking industry. His global exposure helps him realize the major gaps in Indian Real Estate market and motivated him to take a leap to bridge them and offer best services to Real Estate clients. </p>
						<p>He is a firm believer of perfection, integrity and building trust based relationships.</p>
						<p>Ripunjay Singh has about 8 Years of work experience in IT Industry in various domains. He is a fitness enthusiast and loves reading. He is a visionary and wants to get a better insight in this world and its phenomena each passing day.</p>
					</div>
				</div>
			</div>
		);
	}
}
