import React,{Component} from 'react';
import $ 				 from 'jquery';
import OwlCarousel 		 from 'react-owl-carousel';
import Moment            from 'react-moment';
// import Loadable          from 'react-loadable';

import './PropertiesCarousel.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
/*const OwlCarousel = Loadable({
    
  loader: () => import('react-owl-carousel'),
  loading() {
    return <div className="col-sm-12 col-xs-12 col-lg-2 col-md-12 loadingImg">Loading...</div>
  }
});*/
export default class PropertiesCarousel extends Component {
	constructor(props){
		super(props);
		// console.log("4 = ", props);
		this.state = {
			propertiesData:[],
		}
		// console.log("propertiesData 1 =",this.state.propertiesData)
	}
	componentDidMount(){
		const propertiesDataArray = [
			{propertyName:"Park Avenue Apartment",bed:2,bath:2,status:"Ready To Move",rate:"5700 / sqft Onwards",price:"31.46 Lac",location:"Hadapsar",timestamp:"2019-01-19","image":"/images/photo1.jpeg"},
			{propertyName:"Park Avenue Apartment",bed:2,bath:2,status:"Ready To Move",rate:"5700 / sqft Onwards",price:"31.46 Lac",location:"Hadapsar",timestamp:"2019-02-19","image":"/images/photo2.jpeg"},
			{propertyName:"Park Avenue Apartment",bed:2,bath:2,status:"Ready To Move",rate:"5700 / sqft Onwards",price:"31.46 Lac",location:"Hadapsar",timestamp:"2019-03-19","image":"/images/photo3.jpeg"},
	        {propertyName:"Park Avenue Apartment",bed:2,bath:2,status:"Ready To Move",rate:"5700 / sqft Onwards",price:"31.46 Lac",location:"Hadapsar",timestamp:"2019-01-19","image":"/images/photo1.jpeg"},
	        {propertyName:"Park Avenue Apartment",bed:2,bath:2,status:"Ready To Move",rate:"5700 / sqft Onwards",price:"31.46 Lac",location:"Hadapsar",timestamp:"2019-02-19","image":"/images/photo5.jpeg"},
	        {propertyName:"Park Avenue Apartment",bed:2,bath:2,status:"Ready To Move",rate:"5700 / sqft Onwards",price:"31.46 Lac",location:"Hadapsar",timestamp:"2019-04-19","image":"/images/photo6.jpeg"},
			{propertyName:"Park Avenue Apartment",bed:2,bath:2,status:"Ready To Move",rate:"5700 / sqft Onwards",price:"31.46 Lac",location:"Hadapsar",timestamp:"2019-01-19","image":"/images/photo1.jpeg"},
		];

		this.setState({
			propertiesData: propertiesDataArray,
		},()=>{});

		$.getScript('/js/carousel.js',function(){});
	}
	render() {
		// console.log("this.state.propertiesData ",this.state.propertiesData );
		return (
			
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
						<h3 className="textC"> {this.props.propertiesData ? "Properties for" + this.props.inputData.type : null} </h3>	

						<div id="owl-demo" className="owl-carousel owl-theme" >
						
						{	this.state.propertiesData && this.state.propertiesData.length > 0?
							this.state.propertiesData.map((property, index)=>{
								return(
									<div className="item oneProp" key={index} >
								    	<div>
			                                <div id=" bgImg" >
			                                   <img alt="" src={property.image} className="col-lg-12 noPad imgSize" />
			                                </div>
			                                <div id="info11" className="ml10" >
			                                  RESIDENTIAL TOWER
			                                </div>
			                                <div id="info21" >
			                                  FOR SALE
			                                </div>
			                                <div id="priceDisplay1">
			                                  <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.price}
			                                </div>
			                                
		                                </div>
			                            <div className="col-lg-5 mt10 ">
			                                <i className="fa fa-map-marker"></i> {property.location}
			                            </div>
		                                <div className="pull-left col-lg-12  ">
		                                    <h4><b> {property.propertyName} </b></h4>
		                                </div>
		                                <div className=" col-lg-12 row">
		                                    <div className=" col-lg-9 row">
		                                      <h4 className="pull-left col-lg-12"><span> Bed {property.bed}</span> <span>Baths {property.bath}</span> </h4>
		                                      <div className="pull-left col-lg-12"> <b> Apartment </b></div>
		                                      <div className="pull-left mt10 col-lg-12"> {property.status} </div>
		                                    </div>
		                                    <div className=" col-lg-3 ">
		                                      <div className="col-lg-10 col-lg-offset-1">
		                                        <button className="btn-primary btn mt30">Details <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
		                                      </div>
		                                    </div>
		                                </div>
		                                <div className="col-lg-12 bBottom mt10"></div>
		                                <div className=" col-lg-12 row ">
		                                    <div className="col-lg-6 pl30 mt10">
		                                    <i className="fa fa-inr pr8" aria-hidden="true"></i>{property.rate}
		                                    </div>
		                                    <div className="col-lg-6 pull-right mt10">
		                                    <i className="fa fa-shopping-bag pr8" aria-hidden="true"></i>  <Moment fromNow>{property.timestamp}</Moment>
		                                    </div>
		                                </div>
							    	</div>
								);
							})
							:
							null
						}
						</div>
					</div>
				</div>
			
		);
	}
}
