import React, { Component }   from 'react';
import Query                  from './query/Query.js';
import './Operation.css';
import  NewProperty from './newProperty/NewProperty.js';

export default class Operation extends Component {
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
						      <a className="nav-link active textB " data-toggle="pill" href="#WIP">WIP
						      </a>
						       <span className="badge badge-secondary label-warning badgeP">6</span>
						    </li>
						    <li className="nav-item col-lg-2 col-md-2 navPillsMargin ">
						      <a className="nav-link active textB " data-toggle="pill" href="#New">New
						      </a>
						       <span className="badge badge-secondary label-warning badgeP">6</span>
						    </li>
						    <li className="nav-item col-lg-2 col-md-2 navPillsMargin">
						      <a className="nav-link textB" data-toggle="pill" href="#ReListing">Re-Listing </a>
						       <span className="badge badge-secondary label-warning badgeP">6</span>
						    </li>
						    <li className="nav-item col-lg-2 col-md-2 navPillsMargin">
						      <a className="nav-link textB" data-toggle="pill" href="#Verified">Verified </a>
						       <span className="badge badge-secondary label-warning badgeP">3</span>
						    </li>
						    <li className="nav-item col-lg-2 col-md-2 navPillsMargin">
						      <a className="nav-link textB" data-toggle="pill" href="#Listed">Listed </a>
						       <span className="badge badge-secondary label-warning badgeP">9</span>
						    </li>
						    <li className="nav-item col-lg-2 col-md-2 navPillsMargin">
						      <a className="nav-link textB" data-toggle="pill" href="#Query">Query </a>
						       <span className="badge badge-secondary label-warning badgeP">6</span>
						    </li>		    
						  </ul>
					 </div>
					  
					  {/*<!-- Tab panes -->*/}
					  <div className="tab-content col-lg-10 col-lg-offset-1 noPad ">
						     <div id="WIP" className="container active tab-pane ">
						       <NewProperty /> 
						    </div>
						    <div id="New" className="container tab-pane fade "><br/>
							    <div className="col-lg-12 noPad ">
								  	<div className="col-lg-1">
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
							    <NewProperty /> 
						    </div>
						    <div id="ReListing" className="container tab-pane fade">
						      <NewProperty /> 
						    </div>
						    <div id="Verified" className="container tab-pane fade">
						      <NewProperty /> 
						    </div>
						    <div id="Listed" className="container tab-pane fade">
						      <NewProperty /> 
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
