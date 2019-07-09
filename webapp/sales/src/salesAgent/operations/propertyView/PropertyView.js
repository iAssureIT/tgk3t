import React, { Component } from 'react';
import { Link }             from 'react-router-dom';
import $                    from 'jquery';
import Progressbar          from './Progressbar.js';
import './propertyView.css';
import './Progressbar.css'

export default class PropertyView extends Component {
	constructor(props){
		super(props);
		// console.log("1 = ", props);
		this.state = {
			propertiesData:[],
		}
	}
	componentDidMount(){
		const propertiesDataArray = [
			{propertyId:"MH-PN-101",type:"Residential Property",propDetails:"4 BHK Flat – Rent",name:"Mr.John Doe",email:"john.doe@gmail.com",phone:"+91 – 98765 43210",time:"23-Nov-2019 3:30 PM" ,limit:20},
			{propertyId:"MH-PN-101",type:"Residential Property",propDetails:"4 BHK Flat – Rent",name:"Mr.John Doe",email:"john.doe@gmail.com",phone:"+91 – 98765 43210",time:"23-Nov-2019 3:30 PM" ,limit:40},
			{propertyId:"MH-PN-101",type:"Residential Property",propDetails:"4 BHK Flat – Rent",name:"Mr.John Doe",email:"john.doe@gmail.com",phone:"+91 – 98765 43210",time:"23-Nov-2019 3:30 PM" ,limit:60},
			{propertyId:"MH-PN-101",type:"Residential Property",propDetails:"4 BHK Flat – Rent",name:"Mr.John Doe",email:"john.doe@gmail.com",phone:"+91 – 98765 43210",time:"23-Nov-2019 3:30 PM" ,limit:80},
		];
		this.setState({
			propertiesData: propertiesDataArray,
		},()=>{});

		$(".selectall").click(function(){
		$(".individual").prop("checked",$(this).prop("checked"));
		});
	}
	render() {
		return (
			<div>
				{
					this.state.propertiesData.map((property,index)=>{
						return(
						<div key={index}>
							<div className="col-lg-1 check1">
							    <input type="checkbox" id="cbtest"  className="check individual"/>
							    <label htmlFor="cbtest" className="check-box"></label> 
							</div>
							<div className="col-lg-11 pBoxSize">
								<div className="col-lg-4">
									<span className="mt-8">
										Property ID: 
								        <Link to="/propertyDetails"> {property.propertyId}</Link><br/>
										{property.type}<br/>
										{property.propDetails}
									</span>
								</div>
								<div className="col-lg-3">
									<span className="mt-8">
										{property.name}<br/>
										{property.email}<br/>
										{property.phone}
									</span>
								</div>
								<div className="col-lg-5 pull-right">
									<span className="time mt-8">{property.time}</span>
									<div id="myProgress">
										<Progressbar data={property.limit} />
									</div>
								</div>
							</div>
						</div>
						);
					})
				}
			</div>
		)
	}
}
