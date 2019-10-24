import React, { Component }   from 'react';
import axios                  from 'axios';
import $ 					  from "jquery";
import Query                  from './query/Query.js';
import Properties 			  from './Properties/Properties.js';
import swal                   from 'sweetalert';

import './Operation.css';

export default class Operation extends Component {
	constructor(props){
		super(props);
		this.state = {
			propertyStatus :"WIP",
			propDataCount  : []
			
		}

		this.getTotalCount = this.getTotalCount.bind(this);

	}
	componentDidMount(){
		this.getTotalCount();
		
      	axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");

		// axios
	 //    .get('/api/properties/list/salesagent/type/5d56b692b0c7a9b7c727ac13/WIP')
	 //    .then(
	 //      (res)=>{
	 //        console.log("aaaaa.....",res);
	 //      }
	 //    )
	 //    .catch((error)=>{
	 //    	console.log("error = ",error);
	 //                        if(error.message === "Request failed with status code 401")
	 //                        {
	 //                             swal("Your session is expired! Please login again.","", "error");
		// 						localStorage.removeItem("uid");
		// 						localStorage.removeItem("token");
	 //                             this.props.history.push("/login");
	                             
	 //                        }
	 //    });
        
	 var userId = localStorage.getItem("user_ID");
	 console.log("userId",userId)
	}

	getTotalCount(){
	 var userId = localStorage.getItem("user_ID");
	 var userRole = localStorage.getItem("userRole");
		
		axios
	    .get('/api/salesagent/get/gettotaldisplaylist/'+userId+'/'+userRole)
	    .then(
	      (res)=>{
	        // console.log("aaaaa.....",res);
	        const postCount = res.data;
	        
	        this.setState({
	          propDataCount : postCount,
	        },()=>{
	        	
	        });
	      }
	    )
	    .catch();

	}

	propertyStatus(event){
		event.preventDefault();
		this.setState({
			propertyStatus : $(event.target).attr('property-status'),
		})
	}

	render() {
		return (
			<div className="container-fluid bodyDiv ">
				<div className="tableinnetWrap1 innerblock innerblock1">
					<div className="">
					  <h2>Operations</h2>
					  <br/>
					 {/* <!-- Nav pills -->*/}
					 <div className=" col-lg-12 col-md-12">
						  <ul className="nav nav-pills textC col-lg-12 col-md-12 noPad" role="tablist">
						    <li className="nav-item col-lg-2 col-md-2 active navPillsMargin ">
						      <a className="nav-link active textB " data-toggle="pill" href="#propertyStatus" property-status="WIP" onClick={this.propertyStatus.bind(this)}>WIP
						      </a>
						       <span className="badge badge-secondary label-warning badgeP">{this.state.propDataCount.WIPCount}</span>
						    </li>
						    <li className="nav-item col-lg-2 col-md-2 navPillsMargin ">
						      <a className="nav-link active textB " data-toggle="pill" href="#propertyStatus" property-status="New" onClick={this.propertyStatus.bind(this)}>New
						      </a>
						       <span className="badge badge-secondary label-warning badgeP">{this.state.propDataCount.NEWCount}</span>
						    </li>
						    <li className="nav-item col-lg-2 col-md-2 navPillsMargin">
						      <a className="nav-link textB" data-toggle="pill" href="#propertyStatus" property-status="ReListing" onClick={this.propertyStatus.bind(this)}>Re-Listing </a>
						       <span className="badge badge-secondary label-warning badgeP">{this.state.propDataCount.RELISTINGCount}</span>
						    </li>
						    <li className="nav-item col-lg-2 col-md-2 navPillsMargin">
						      <a className="nav-link textB" data-toggle="pill" href="#propertyStatus" property-status="VerifyPending" onClick={this.propertyStatus.bind(this)}>Verify Pending </a>
						       <span className="badge badge-secondary label-warning badgeP">{this.state.propDataCount.VERIFIEDCount}</span>
						    </li>
						    <li className="nav-item col-lg-2 col-md-2 navPillsMargin">
						      <a className="nav-link textB" data-toggle="pill" href="#propertyStatus" property-status="Verified" onClick={this.propertyStatus.bind(this)}>Verified </a>
						       <span className="badge badge-secondary label-warning badgeP">{this.state.propDataCount.VERIFIEDCount}</span>
						    </li>
						    <li className="nav-item col-lg-2 col-md-2 navPillsMargin">
						      <a className="nav-link textB" data-toggle="pill" href="#propertyStatus" property-status="Listed" onClick={this.propertyStatus.bind(this)}>Listed </a>
						       <span className="badge badge-secondary label-warning badgeP">{this.state.propDataCount.LISTEDCount}</span>
						    </li>
						    <li className="nav-item col-lg-2 col-md-2 navPillsMargin">
						      <a className="nav-link textB" data-toggle="pill" href="#Query">Query </a>
						       <span className="badge badge-secondary label-warning badgeP">6</span>
						    </li>		    
						  </ul>
					 </div>
					  
					  {/*<!-- Tab panes -->*/}
					  <div className="tab-content  noPad ">
						     <div id="propertyStatus" className="container active tab-pane ">
						       <Properties status={this.state.propertyStatus} getTotalTabCount={this.getTotalCount}/> 
						    </div>
						    <div id="Query" className="container tab-pane fade">
						      <Query />
						    </div>
						 </div>   
					</div>
				</div>
			</div>

		);
	}
}
