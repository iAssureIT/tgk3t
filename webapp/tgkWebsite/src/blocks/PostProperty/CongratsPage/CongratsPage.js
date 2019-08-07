import React, { Component }   			from 'react';
import { Route , Redirect, withRouter}  from 'react-router-dom';
import { connect } 						from 'react-redux';
import axios 							from 'axios';

import './CongratsPage.css';

 class CongratsPage extends Component {

 	constructor(props){
			super(props);
			this.state = {
				
				percentage : ""
			};
		}


 	componentDidMount(){
		
		var prop_index = localStorage.getItem("index");
		console.log("here prop_index", prop_index);
		var formvalues = {
			
			 "index" 			: prop_index

		}

			axios
				.post('/api/properties/post/findindexper',formvalues)
				.then( (res) =>{
					console.log("resposnse here===================>",res);
					var cash_per = res.data.data.earnings;
					console.log("here earnings",cash_per);

					this.setState({
						percentage : cash_per
					});
					
				})
				.catch((error) =>{
					console.log("error = ", error);
					// alert("Something Went wrong")
				});

	}

 	redirectToProfile(){
 			this.props.history.push("/PropertyProfile/"+this.props.property_id);
   			window.location.reload();
 	}

	render() {
		var data =  this.state.percentage;
		var per = 0;
		if(data <=10)
		{
			per = 18;
		}
		if(data <=20)
		{
			per = 18+18;
		}
		if(data <=30)
		{
			per = 18+18+18;
		}
		if(data <=40)
		{
			per = 18+18+18+18;
		}
		if(data <=50)
		{
			per = 18+18+18+18+18;
		}

		console.log("data",data);
		console.log("per",per);
		const needleRotation = {
		    transform: "rotate("+per+"deg)",
		    transformOrigin: "90% 55%",
		    transition : "transform 3s",
		}



		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<img src="/images/fireworks.png" className="col-lg-3" style={{height:"154px"}} />
					<p className="col-lg-4 CP1">Congratulations</p>
					<img src="/images/fireworks.png" className="col-lg-3 col-lg-offset-2" style={{height:"154px"}} />
				</div>
				<p className="col-lg-12 CP2">Your Property is <b className="fontColor">FAST SELLING HOT POTATO</b></p>
				<p className="col-lg-12 CP3">and qualifies for a <b className="fontColor">{this.state.percentage!="" ? this.state.percentage+"%" : null}</b> brokerage to be paid by us on successful deal through us </p>
				<div className="col-lg-12 CP4">
					<img src="images/meter.png" />
					<img src="images/needle1.png" className="needle" style={needleRotation} />

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
