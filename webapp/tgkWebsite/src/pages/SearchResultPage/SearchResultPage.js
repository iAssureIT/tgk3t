import React , { Component }	from 'react';

import Header 					from "../../blocks/common/Header/Header.js";
import MainFooter  				from '../../blocks/common/MainFooter/MainFooter.js';
import SearchResults            from "../../blocks/SearchProperty/SearchResults/SearchResults.js"

import './SearchResultPage.css';

 class SearchResultPage extends Component {
	constructor(){
		super();
		console.log("On MyPostedProperties Page = ", localStorage.getItem("uid") );
	}
	render() {
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad ">
				<div className="noPad headerDiv">
					<Header />
				</div>	
				<div className="searchResultsDiv">
					<SearchResults />
				</div>

			    <MainFooter />
			</div>
		);
	}
}

export default SearchResultPage;