import React, { Component }   			from 'react';
import { Route , Redirect, withRouter}  from 'react-router-dom';
import { connect } 						from 'react-redux';


import './CongratsPage.css';

 class CongratsPage extends Component {
 	redirectToProfile(){
 			this.props.history.push("/PropertyProfile/"+this.props.property_id);
   			window.location.reload();
 	}

	render() {
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<img src="/images/fireworks.png" className="col-lg-3" style={{height:"154px"}} />
					<p className="col-lg-4 CP1">Congratulations</p>
					<img src="/images/fireworks.png" className="col-lg-3 col-lg-offset-2" style={{height:"154px"}} />
				</div>
				<p className="col-lg-12 CP2">Your Property is <b className="fontColor">FAST SELLING HOT POTATO</b></p>
				<p className="col-lg-12 CP3">and qaulifies for a <b className="fontColor">40%</b> brokerage to be paid by us on successful deal through us </p>
				<div className="col-lg-12 CP4">
					<img alt=""  src="/images/3.png" />
					<b className="col-lg-12 CP5">Sell-O-Meter</b>
				</div>
				<p className="col-lg-12 CP6">Your Property <b className="congColor">Successfully</b> submitted & will be published soon!!!</p>
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
