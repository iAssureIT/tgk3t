import React , { Component }	from 'react';
import {  withRouter}    from 'react-router-dom';

import './CommercialRent.css';

 class CommercialRent extends Component{

		constructor(props){
			super(props);
			this.state = {
			};
		}


	backToLocation(){
		this.props.backToLocation();
	}

	render() {
	   	return (
    		<div className="container-fluid">
    			<form  id="form">
	    			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
	    				<h1 className="text-center">Commercial Rent</h1>
	    			</div>
				</form>	 
			</div>
		);
	}
}
export default (withRouter(CommercialRent));