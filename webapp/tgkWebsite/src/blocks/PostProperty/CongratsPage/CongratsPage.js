import React, { Component } from 'react';
import './CongratsPage.css';

export default class CongratsPage extends Component {
	render() {
		return (
			<div className="col-lg-8 col-lg-offset-2">
				<p className="col-lg-12 CP1">Congratulations</p>
				<p className="col-lg-12 CP2">Your Property is FAST SELLING HOT POTATO</p>
				<p className="col-lg-12 CP3">and qaulifies for a 40% brokerage to be paid by us on successful deal through us </p>
				<div className="col-lg-12 CP4">
					<img src="images/3.png" />
					<b className="col-lg-12 CP5">Sell-O-Meter</b>
				</div>
				<p className="col-lg-12 CP6">Your Property <b>Successfully</b> submitted & will be published soon!!!</p>
			</div>
		);
	}
}
