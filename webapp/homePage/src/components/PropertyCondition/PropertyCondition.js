import React, { Component } from 'react';
import Properties           from '../Properties/Properties.js';
import PropertiesCarousel   from '../PropertiesCarousel/PropertiesCarousel.js';

export default class PropertyCondition extends Component {
	constructor(props){
    super(props);
    this.state = {
    	inputData    : props.inputData ? props.inputData : '',
        carouselvalue:this.props.carouselvalue,
    };
  }  componentWillReceiveProps(nextProps){
  	if(nextProps){
	  	this.setState({
	  		inputData : nextProps.inputData
	  	},()=>{
	  		// console.log('nextProps', this.state.inputDataC);
	  	})
  	}
  }
	render() {
		return (
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
				{this.state.carouselvalue === true ? 
					 <Properties inputData={this.state.inputData}/>  
					 :
					 <PropertiesCarousel inputData={this.state.inputData}/>   
					}                        
                </div>
		);
	}
}
