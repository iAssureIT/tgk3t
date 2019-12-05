	import React, { Component } from 'react';
	import { render } from 'react-dom';
	import ReactTable       from "react-table";

	import swal from 'sweetalert';



	export default class AddCountries extends Component {

		constructor(props){
			super(props);
			this.state = {
				'roleSett': '',
				'firstname':'',
				'startRange': 0,
				'limitRange':10,
				'counter': 1,
				'dataRange':10,
				'adminShowAll':'Admin',
				'negativeCounter' : 2,
				'usersListData' : false,
				'paginationArray': [],
				'department'  : 'all',
				'blockActive' : 'all',
				'roleListDropdown':'all',
				'resetPasswordConfirm' : '',
				'resetPassword': '',
				button 			: "ADD",
				country    		: '',
				countryId       : '',
				toggleUploadBtn : 'Bulk Upload',
				options 	    : 'manual',
				data 			: '',

			}
			this.handleChange = this.handleChange.bind(this);
		
		}
		// 
		 handleChange(event){
	    	event.preventDefault();
	    	   const target = event.target;
			   const name   = target.name;
			   this.setState({
			    [name]: event.target.value,
			   });
	  
	    }

	    addcountry(event){
			event.preventDefault();	
			  	var CountriesValues = {
					"country" 		: this.state.country,	
				
				}		
		     
		    	if(this.props.post.find(e=> e.countryName.toUpperCase() == CountriesValues.country.toUpperCase())){	
		    		swal({text:"Country Already Added!",timer:1500});
		    	}else{	    		
				    // Meteor.call('insertCountries',CountriesValues,
				    //             (error, result)=> { 
				    //                 if (error) {
				                      
				    //                     swal(error.reason);
				    //                 } 
				    //                 else {
				    //                 	if(result == 'exist'){
				    //                      swal({
				                         	
				    //                      	text:"Country Already Added!"
				    //                      });
				    //                 	}else{
				    //                 	 swal({
						  //                   text: "Country Added Successfully!", 
						  //                   timer:2000
						  //               	});
				    //                 	}
				    //   					this.setState({
				    //   						country : '',
				    //   						countryId : ''
				    //   					})	
				    //                 }
				    //             }
				    //     );
		    	}	

		}

	
		showBtn(){
			if(this.state.countryId){
				return(
					<button type="submit" className="pull-right col-lg-2 col-md-2 col-sm-12 col-xs-12 btn updateBTN btn-temp" onClick={this.updateCountry.bind(this)}>UPDATE</button>
				)
			}else{
				return(
					<button type="submit" className="pull-right col-lg-2 col-md-2 col-sm-12 col-xs-12 btn btnSubmit btn-temp" onClick={this.addcountry.bind(this)}>ADD</button>
				)
			}
		}

		handleInputChange(event) {
		    const target = event.target;
		    const name = target.name;

		    this.setState({
		      [name]: event.target.value
		    });

		}

		render(){
			
			var locationArray = [];
			if(this.state.countryId){
				var event = this.updateCountry.bind(this)
			}else{
				var event = this.addcountry.bind(this)
			}
			const data = this.props.post;
			const columns = [
				{
					Header: 'Sr. No.',
					id: 'row',
					Cell:row=>
						<span>{row.index + 1}</span>
				},
				{
					Header: 'Country',
					accessor: 'countryName'
				},
				{
					Header: 'Actions',
					accessor: '_id',
					Cell:row=>(
							<div>
								<i className="fa fa-pencil action-btn" aria-hidden="true" title="Edit Country" id={row.value} onClick={this.editCountry.bind(this)} ></i> &nbsp;  &nbsp;
								<i className="fa fa-trash redFont action-btn" aria-hidden="true" onClick={this.delRole.bind(this)} id={row.value} title="Delete Country" ></i>
							</div>
						)
				}
			]
	       return(
				<div className="">
						<div className=""  id="addcountrie">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 wrapperTitle formgroupheight pt20">
								<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 addLoc">
									<h4 className="manageLocTitle"><i className="fa fa-map-marker" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Add Countries</h4>
								</div>
							</div>
							<div className='tab-content col-lg-12 col-md-12 col-sm-12 col-xs-12'>
								<div className='tab-pane active' id="countryform">
									<form id="addcountryform" onSubmit={event}>	
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls countryField padding-zero" >
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 formht">
												<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-group ht80">
													<div className="form-group">
													    <label className="control-label statelabel col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls padding-zero" >Country<span className="astrick">*</span></label>
													    <input className="form-control areaStaes" id="country" value={this.state.country} ref="country"  type="text" name="country" title="Please enter valid country name!" onChange={this.handleChange.bind(this)} required/>
													</div>
												</div>
											</div>	
										</div>										
									</form>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pr28">
											{this.showBtn()}	
									</div>
								</div>
							</div>							
						</div>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  usrmgnhead">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<ReactTable
									data={data}
									columns={columns}
									sortable={false}
									defaultPageSize={5}
									showPagination={true} />
											
					            { 
					            	this.props.post && this.props.post.length>0 ? 
						                <div className="col-lg-12 col-md-12 col-sm-12 paginationWrap">
						                  <ul className="pagination paginationOES">
						                      {this.state.paginationArray}
						                  </ul>
						                </div>
						              :
						                null
					            }
							</div>
					</div>
					
				

				</div>			
		    );
		} 
	}


