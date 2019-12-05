import React, { Component } from 'react';
import { render } 				  from 'react-dom';

// import {State} 					    from '/imports/admin/masterData/manageLocation/components/State/component/state.js';
// import Countries 				  from './components/Country/component/Countries.js';
// import {City} 				      from '/imports/admin/masterData/manageLocation/components/City/component/City.js';
// import {Location} 				  from '/imports/admin/masterData/manageLocation/components/location/component/Location.js';
// import {Area} 				      from '/imports/admin/masterData/manageLocation/components/Area/component/Area.js';

import AddCountries 			  from './components/Country/component/AddCountries.js';
import AddCity    				  from './components/City/component/AddCity.js';
import AddArea 				      from './components/Area/component/AddArea.js';
import AddState 				    from './components/State/component/AddState.js';
import AddLocations 			  from './components/location/component/AddLocations.js';

export default class ManageLocations extends Component{
	constructor(props){
		super(props)
		this.state = {
			tabtype : "location",
		}
		this.changeTab = this.changeTab.bind(this);	

	}
  	componentDidMount() {
    
	   
  	}


  	changeTab = (data)=>{
		this.setState({
			tabtype : data,
		})
	}


  	render() {

    return (
       <div>
          <div className="content-wrapper1">
            <section className="content-header">
              <h1> Manage Location </h1>
              <ol className="breadcrumb">
                <li>
                  <a href="#"><i className="fa fa-database" /> Manage Location </a></li>
                <li className="active">Add {this.state.tabtype.charAt(0).toUpperCase()+this.state.tabtype.slice(1)}</li>
              </ol>
              </section>
            <div className="col-lg-12 col-md-12 hidden-sm hidden-xs secdiv"></div>
               <section className="content">
                    <div className="row">
                         <div className="addrol col-lg-12 col-md-12 col-xs-12 col-sm-12">
                              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 padding-zero">
                                   <div className="box padding-zero col-lg-12 col-md-12 col-xs-12 col-sm-12">
                                        <div className="box-header with-border">
                                            <h4 className="weighttitle">Manage Location</h4>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                             <div className="reportWrapper">
                                                  <div className="nav-center manageLocationTabs col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12">
                                                       <ul className="nav nav-pills nav-pillss location">
                                                            <li className="active text-center col-lg-3 col-md-2 col-sm-12 col-xs-12 transactionTab masterDataTab">
                                                                <a href="#Location" className="tab-align" data-toggle="tab" onClick={()=>this.changeTab('location')} >
                                                                	Location Pincode
                                                                </a>
                                                            </li>
                                                            <li className="text-center col-lg-2 col-md-2 col-sm-12 col-xs-12 transactionTab masterDataTab">
                                                                <a href="#Area" className="tab-align" data-toggle="tab" onClick={()=>this.changeTab('area')}>
                                                                	Area
                                                                </a>
                                                            </li>
                                                            <li className="text-center col-lg-2 col-md-2 col-sm-12 col-xs-12 transactionTab masterDataTab">
                                                                <a href="#City" data-toggle="tab" className="tab-align"	onClick={()=>this.changeTab('city')} >
                                                                	City
                                                                </a>
                                                            </li>
                                                             <li className="text-center col-lg-2 col-md-2 col-sm-12 col-xs-12 transactionTab masterDataTab">
                                                                <a href="#State" data-toggle="tab" className="tab-align"	onClick={()=>this.changeTab('state')} >
                                                                	State
                                                                </a>
                                                            </li>
                                                            <li className="text-center col-lg-2 col-md-2 col-sm-12 col-xs-12 transactionTab masterDataTab">
                                                              	<a  href="#Country" data-toggle="tab" className="tab-align" 	onClick={()=>this.changeTab('country')} >
                                                              		Country
                                                              	</a>
                                                            </li>
                                                       </ul>
                                                  	</div>
                                                  	<div className="tab-content col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          														<div className="tab-pane active" id="Location">
                          															{
                          																this.state.tabtype == "location" ?
                          																<AddLocations dataVal={this.state.tabtype} />				
                          																:
                          																null
                          															}
                          														</div>
                          														<div className="tab-pane" id="Country">
                          															{
                          																this.state.tabtype == "country" ?
                          																<AddCountries dataVal={this.state.tabtype} />				
                          																:
                          																null
                          															}						
                          														</div>
                          											       <div className="tab-pane" id="State">
                          											        {
                          																this.state.tabtype == "state" ?
                          																<AddState dataVal={this.state.tabtype} />				
                          																:
                          																null
                          															}	
                          														</div>
                          														<div className="tab-pane" id="City">
                          										        	{
                          																this.state.tabtype == "city" ?
                          																<AddCity dataVal={this.state.tabtype} />	

                          																:
                          																null
                          															}
                          														</div>
                          														<div className="tab-pane" id="Area">
                          										        	{
                          																this.state.tabtype == "area" ?
                          																<AddArea dataVal={this.state.tabtype} />				
                          																:
                          																null
                          															}
                          														</div>
                          													</div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                      </div>   
               </section>
          </div>
      </div>
    );

  }

}
