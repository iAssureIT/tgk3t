import React , { Component }	from 'react';

import Header 					from "../../blocks/common/Header/Header.js";
import MainFooter  				from '../../blocks/common/MainFooter/MainFooter.js';

import BannerwithModal			from "../../blocks/Banner/BannerwithModal.js";
import PopularPlace  			from '../../blocks/Profile/PopularPlace.js';
import InfoSale  			    from '../../blocks/HomePageDescription/InfoSale/InfoSale.js';
import InfoRent  			    from '../../blocks/HomePageDescription/InfoRent/InfoRent.js';
import InfoCommercial  			from '../../blocks/HomePageDescription/InfoCommercial/InfoCommercial.js';
import HomePageProperties  		from '../../blocks/HomePageProperties/HomePageProperties.js';
import $                        from "jquery";

// import 'bootstrap/js/tab.js';
// import "bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap/js/modal.js';

import './HomePage.css';

 class HomePage extends Component {
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
	componentDidMount(){
		
    $("#place1").addClass("mT30");
    $(".modal-backdrop").remove();

	}
	render() {
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad BoxSize">
			
				<Header />

				<BannerwithModal inputData={this.inputData.bind(this)}/>

					

				<div className="tab-content">


				    <div id="Buy" className="tab-pane active"><br/>
		    			<InfoSale />
				    </div>
				    <div id="Rent" className="tab-pane fade"><br/>
				   		<InfoRent />
				    </div>
				    <div id="Commercial" className="tab-pane fade"><br/>
		    			<InfoCommercial />
				    </div>
				</div>
		    	<HomePageProperties  inputData={this.state.inputData} />

			    <PopularPlace />

			    <MainFooter />
			</div>
		);
	}
}

export default HomePage;