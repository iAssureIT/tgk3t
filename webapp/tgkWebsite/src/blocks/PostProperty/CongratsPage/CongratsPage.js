import React, { Component }   from 'react';
import { Route , withRouter}  from 'react-router-dom';
import { connect } 				from 'react-redux';

import './CongratsPage.css';

 class CongratsPage extends Component {

	redirectToProfile(){

				this.props.history.push("/PropertyProfile/"+this.props.property_id);

	}
	render() {
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<p className="col-lg-12 CP1">Congratulations</p>
				<p className="col-lg-12 CP2">Your Property is FAST SELLING HOT POTATO</p>
				<p className="col-lg-12 CP3">and qaulifies for a 40% brokerage to be paid by us on successful deal through us </p>
				<div className="col-lg-12 CP4">
					<img alt=""  src="images/3.png" />
					<b className="col-lg-12 CP5">Sell-O-Meter</b>
				</div>
				<p className="col-lg-12 CP6">Your Property <b>Successfully</b> submitted & will be published soon!!!</p>
				<div>
					<button className="btn btn-primary CP7 pull-right" onClick={this.redirectToProfile.bind(this)}>Profile Preview</button>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state)=>{
	return {
		property_id  : state.property_id,
		uid			 : state.uid

	}
};
export default connect(mapStateToProps) (withRouter(CongratsPage));
