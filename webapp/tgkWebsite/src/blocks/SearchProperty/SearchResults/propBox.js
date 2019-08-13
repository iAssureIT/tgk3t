import React from 'react';
import {withRouter, Link} 		from 'react-router-dom';

export default class PropBox extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		console.log("myproperty = ", this.props.myProperty);

		return (
			<div className="col-lg-12 col-md-1 col-xs-12 col-sm-12 result noPad">						
				<div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12 propertyBox">			
					<div className="row pull-right topRightTriangle" id="triangle-topright"> 
					</div>	
					<div className="row">
						<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 noPad">															
						<img alt=""  className="propertyImgDiv" src={this.props.myProperty.gallery.Images[0]} />
					</div>
					<div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 noPad">				
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 myPropertiesInternal">				
							<div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 propertySubText1">				
								<i className="fa fa-inr"></i>&nbsp;
								<span>
									{this.props.myProperty.financial && this.props.myProperty.financial.totalPrice ? this.props.myProperty.financial.totalPrice : "-"}
								</span>
							</div>

								<div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 propertySubText1">				
									{
										this.props.myProperty.propertyDetails && this.props.myProperty.propertyDetails.bedrooms ? this.props.myProperty.propertyDetails.bedrooms 
										: 
										"-"
									}
									&nbsp;BHK
									&nbsp;
									<i className="fa fa-map-marker text-warning"/>
									&nbsp;
									{this.props.myProperty.propertyLocation  &&  this.props.myProperty.propertyLocation.city && this.props.myProperty.propertyLocation.society
										? 
										this.props.myProperty.propertyLocation.society +", "+this.props.myProperty.propertyLocation.city 
										:
										 "-"
									}
								</div>
							
								<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 noPad pull-right">		
									{this.props.myProperty.transactionType && this.props.myProperty.transactionType === "Sell" ?
										<span className="pull-right text-right col-lg-8  noPad transactionLabel">Sale</span>
										:
										this.props.myProperty.transactionType ==="Rent" ?
										<span className="pull-right text-right col-lg-8 noPad transactionLabel">{this.props.myProperty.transactionType}</span>
										:
										null
									
									}
								</div>	
								

							</div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 myPropertiesInternal">				
								<div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 ">				
									<img alt=""  src="/images/Icons/bed.png" className="imgIcon"/>&nbsp;
									<span className="propertySubText1">
										{this.props.myProperty.propertyDetails && this.props.myProperty.propertyDetails.bedrooms ? this.props.myProperty.propertyDetails.bedrooms : "-"}
									</span>
									<br/> Beds
								</div>
								<div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 ">				
									<img alt=""  src="/images/Icons/bath.png" className="imgIcon"/>&nbsp;
									<span className="propertySubText1">
										{this.props.myProperty.propertyDetails && this.props.myProperty.propertyDetails.bathrooms ? this.props.myProperty.propertyDetails.bathrooms : "-"}
									</span>
									<br/>Baths
								</div>
								<div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 ">				
									<img alt=""  src="/images/Icons/floor.png" className="imgIcon"/>&nbsp;
									<span className="propertySubText1">{this.props.myProperty.floor? this.props.myProperty.floor :"-"}  /  {this.props.myProperty.floor? this.props.myProperty.totalFloor :"-"}</span><br/>Floor / Total Floor
								</div>
								<div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 ">				
									<img alt=""  src="/images/Icons/face.png" className="imgIcon"/>&nbsp;
									<span className="propertySubText1">{this.props.myProperty.propertyDetails? this.props.myProperty.propertyDetails.facing :"-"}</span><br/>Facing
								</div>
							</div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 myPropertiesInternal mt20">				
								<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">				
									Super Area : <b>{this.props.myProperty.propertyDetails ? this.props.myProperty.propertyDetails.superArea : "-"}&nbsp;Sqft</b>
								</div>
								<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">				
									Possession by : <span className="propertySubText2">{this.props.myProperty.financial ? this.props.myProperty.financial.availableFrom : "-"}</span>
								</div>
								<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 pull-right">				
                              		<Link to={"/PropertyProfile/"+this.props.myProperty._id} target="_blank">
										<button className="btn pull-right btnDetails">Details &nbsp;<img alt=""  className="btnImg" src="/images/TGK-key.png"/></button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>							
			</div>
		);
	}
}
