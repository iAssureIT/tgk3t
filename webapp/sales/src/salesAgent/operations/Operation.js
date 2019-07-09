import React, { Component }   from 'react';
import PropertyView           from './propertyView/PropertyView.js';
import Query                  from './query/Query.js';
import './Operation.css';

export default class Operation extends Component {
	render() {
		return (
			<div className="container-fluid ">
			  <h2>Operations</h2>
			  <br/>
			 {/* <!-- Nav pills -->*/}
			 <div className=" col-lg-12  ">
			  <ul className="nav nav-pills textC" role="tablist">
			    <li className="nav-item col-sm-2 active ">
			      <a className="nav-link active textB " data-toggle="pill" href="#home">New
			      </a>
			       <span className="badge badge-secondary badge-warning badgeP">6</span>
			    </li>
			    <li className="nav-item col-sm-2">
			      <a className="nav-link textB" data-toggle="pill" href="#menu1">Re-Listing </a>
			       <span className="badge badge-secondary badge-warning badgeP">6</span>
			    </li>
			    <li className="nav-item col-sm-2">
			      <a className="nav-link textB" data-toggle="pill" href="#menu2">Verified </a>
			       <span className="badge badge-secondary badge-warning badgeP">3</span>
			    </li>
			    <li className="nav-item col-sm-2">
			      <a className="nav-link textB" data-toggle="pill" href="#menu3">Listed </a>
			       <span className="badge badge-secondary badge-warning badgeP">9</span>
			    </li>
			    <li className="nav-item col-sm-2">
			      <a className="nav-link textB" data-toggle="pill" href="#menu4">Query </a>
			       <span className="badge badge-secondary badge-warning badgeP">6</span>
			    </li>
			    
			  </ul>
			 </div>
			  
			  {/*<!-- Tab panes -->*/}
			  <div className="tab-content col-lg-10 noPad ">
				    <div id="home" className="container tab-pane active noPad"><br/>
					    <div className="col-lg-12  ">
						  	<div className="col-lg-1 check2 ">
							    <input type="checkbox" id="cbtest"  className="check selectall"/>
							    <label htmlFor="cbtest" className="check-box"></label> 
							</div>
							<div className="col-lg-3 mt19">
								<button className="bg success ">Assign To Field Agent</button>
							</div>
							<div className="col-lg-4 mt19">
								<button className="bg success  ">Verify & List</button>
							</div>
					  	</div>

					    <PropertyView />
				      
				    </div>
				    <div id="menu1" className="container tab-pane fade">
				      <PropertyView />
				    </div>
				    <div id="menu2" className="container tab-pane fade">
				      <PropertyView />
				    </div>
				    <div id="menu4" className="container tab-pane fade">
				      <Query />
				      <Query />
				      <Query />
				    </div>
				    <div id="menu3" className="container tab-pane fade">
				      <PropertyView />
				    </div>
			  </div>
			</div>

		);
	}
}
