import React , { Component }	from 'react';

import Header 					from "../../blocks/common/Header/Header.js";
import MainFooter  				from '../../blocks/common/MainFooter/MainFooter.js';
import MyInterestedProp         from "../../blocks/MyProperties/MyInterestedProperties/MyInterestedProperties.js"

import './MyInterestedProperties.css';

 class MyInterestedProperties extends Component {
	constructor(){
		super();
		this.state = {
			inputData:[],
		}
	}

	inputData(inputData){
		this.setState({
			inputData : inputData,
		})
	}
	render() {
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad ">
				<div className="noPad headerDiv">
					<Header />
				</div>	

				<MyInterestedProp />

			    <MainFooter />
			</div>
		);
	}
}

export default MyInterestedProperties;