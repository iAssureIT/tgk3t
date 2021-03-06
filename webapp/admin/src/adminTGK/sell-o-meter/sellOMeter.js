import React, { Component, PropTypes } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios 						   from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/js/modal.js';
import swal                       from 'sweetalert';
import $ from "jquery";
import Add_sellOMeter 					   from './add_sellometer.js';
/*import Add_dataTable 				   from './add_dataTable.js';*/

class sellOMeter extends Component {
    

    constructor(props) {
        super(props);
        	this.state = {
				allPosts : [],
				city : "",
				area : "",
				subarea : "",
				society : "",
				index : "",
				propertyClass : "",

		}

		this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
      axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");

		axios
			.get('/api/sellometers/list')
			.then(
				(res)=>{
					console.log('res', res);
					const postsdata = res.data;
					console.log('postsdata',postsdata);
					this.setState({
						allPosts : postsdata,
					});
				}
			)
			.catch((error)=>{
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                             swal("Your session is expired! Please login again.","", "error");
                             this.props.history.push("/login");
                        }
              });    		

	}

	selectedData(data){
		this.setState({
			allPosts : data,
		})

		console.log("here full data in props ______________________________",this.state.allPosts);
	}
	

  		deleteData(event){
  			event.preventDefault();
			var id = event.target.id;
			console.log("id",id);
			// const token = '';
			const url = '/api/sellometers/'+id ;
			const headers = {
				    "Authorization" : 'Bearer '+ localStorage.getItem("token"),
				    "Content-Type" 	: "application/json",
				};

				axios({
					method: "DELETE",
					url : url,
					headers: headers,
					timeout: 3000,
					data: null,
				})
				.then((response)=> {
			    	console.log('delete response',response);
			    	swal("Data deleted successfully","", "success");


			    	axios
					.get('/api/sellometers/list')
					.then(
						(res)=>{
							console.log('res', res);
							const postsdata = res.data;
							console.log('postsdata',postsdata);
							this.setState({
								allPosts : postsdata,
							});
						}
					)
					.catch((error)=>{
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                             swal("Your session is expired! Please login again.","", "error");
                             this.props.history.push("/login");
                        }
              		});    		


				}).catch((error)=>{
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                             swal("Your session is expired! Please login again.","", "error");
                             this.props.history.push("/login");
                        }
              		});    
  		}

  		ClearData(event){
  			this.setState({
  				city : "",
				area : "",
				subarea : "",
				society : "",
				index : "",
				propertyClass : "",
  			});

  		}

  		editData(event){

  			event.preventDefault();
			var id = event.target.id;
			console.log("edit id",id);

			const formValues = {
		        "city"	    : this.state.city,
				"area"	    : this.state.area,
				"subArea"	: this.state.subarea,
				"socity"	: this.state.society,
				"propertyClass" : this.state.propertyClass,
				"index" : this.state.index,
		      }

		      console.log("formValues",formValues);
		 	  if( this.state.city!= "" && this.state.area!="" && this.state.subarea!="" && this.state.propertyClass!="" && this.state.index!="" )
		 	  {
		 	  	axios
		 	  	.put('/api/sellometers/'+id, formValues)
			    .then( (res)=>{
			          console.log("submit ",res);
			          swal("Sell-O-Meter Data Updated successfully", "", "success");
			         
			         this.setState({
			         city             : "",
				     area 			  : "",
					 subarea 		  : "",
					 society 		  : "",
					 propertyClass 	  : "",
					 index 			  : "",     
			         });
		         
			        		    $('.modal').remove();
								$('.modal-backdrop').remove();
								$('body').removeClass( "modal-open" );
								 window.location.reload();

		          	axios
					.get('/api/sellometers/list')
					.then(
						(res)=>{
							console.log('res', res);
							const postsdata = res.data;
							console.log('postsdata',postsdata);
							this.setState({
								allPosts : postsdata,
							});

								
						}
					)
					.catch((error)=>{
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                             swal("Your session is expired! Please login again.","", "error");
                             this.props.history.push("/login");
                        }
              		});    	


			      })
			      .catch((error)=>{
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                             swal("Your session is expired! Please login again.","", "error");
                             this.props.history.push("/login");
                        }
              		});    

		 	  }else{
		 	  	swal("Please enter mandatory fields", "", "warning");
          // console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
		 	  }     
		      
  		}



  		handleChange=(event)=>{
		    const target = event.target;
		    const name   = target.name;
		    this.setState({
		      [name]: event.target.value,
		    });
		  }


		getData(event){
		      event.preventDefault();
		      var id = event.target.id;
		      console.log("here id",id);

		       axios.get('/api/sellometers/'+ id)
		        .then( (res)=>{
		          console.log("here data_______________",res.data);
		          this.setState({
		  				city 			: res.data[0].city,
						area 			: res.data[0].area,
						subarea 		: res.data[0].subArea,
						society 		: res.data[0].socity,
						index 			: res.data[0].index,
						propertyClass 	: res.data[0].propertyClass,
		  			});
				          
		        })
		        .catch((error)=>{
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                             swal("Your session is expired! Please login again.","", "error");
                             this.props.history.push("/login");
                        }
              		});    
		}	  

    render() {

    var cityName = this.state.city;
    var areaName = this.state.area;
    var subareaName = this.state.subarea;
    var societyName = this.state.society;
    var propclassName = this.state.propertyClass;   
    // console.log("cityName",cityName); 

    if(cityName != null &&  areaName != null && subareaName != null && societyName != null)
    {
       var first  = cityName.toUpperCase().slice(0,2);
       var second = areaName.toUpperCase().slice(0,2);
       var third  = subareaName.toUpperCase().slice(0,2);
       var forth  = societyName.toUpperCase().slice(0,2);

       this.state.index = first+second+third+forth;
    }

        return (
            <div> 

            	<section className="">
			        <div className="">
			          	<div className="">
	                        <div className="">
	                            <div className="box col-lg-12 col-md-12 col-xs-12 col-sm-12">
	                            	<div className=" col-lg-1 col-md-1 col-xs-1 col-sm-1 box-header with-border text-center">
                                         <h4 className="weighttitle"><a href="/"><i className="cursorpointer fa fa-chevron-circle-left"></i></a></h4>
                                    </div>
                                    <div className=" col-lg-11 col-md-11 col-xs-11 col-sm-11 box-header with-border">
                                         <h4 className="weighttitle">Property Indexation</h4>
                                    </div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addRolesInWrap">
											<Add_sellOMeter selectedData={this.selectedData.bind(this)}/>
										<div className="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
											<table className="table iAssureITtable-bordered table-striped table-hover">
												<thead className="tempTableHeader">
													<tr className="">
														
														<th className="umDynamicHeader srpadd textAlignCenter">  City </th>
														<th className="umDynamicHeader srpadd textAlignCenter">  Area </th>
														<th className="umDynamicHeader srpadd textAlignCenter">  Sub-area </th>
														<th className="umDynamicHeader srpadd textAlignCenter">  Society </th>
														<th className="umDynamicHeader srpadd textAlignCenter">  Index </th>
														<th className="umDynamicHeader srpadd textAlignCenter">  Class </th>
														<th className="umDynamicHeader srpadd textAlignCenter"> Actions </th>
													</tr>
												</thead>
												<tbody>
												{this.state.allPosts.map( (Data, index)=>{
													// console.log('Data',Data);
												   return( 
													<tr>
														
														<td className="textAlignLeft">{Data.city}</td>
														<td className="textAlignLeft">{Data.area}</td>
														<td className="textAlignLeft">{Data.subArea}</td>
														<td className="textAlignLeft">{Data.socity}</td>
														<td className="textAlignLeft">{Data.index}</td>
														<td className="textAlignLeft">{Data.propertyClass}</td>	
														<td className="roleTextCenter pointerCls"> 						
															<i className="fa fa-pencil editTcon editIcon pointerCls"  data-toggle="modal" id={Data._id} onClick={this.getData.bind(this)} title="Delete" data-target={`#${Data._id}-edit`} title="Edit" ></i>
															&nbsp;&nbsp;
															<i className="deleteIcon roleDelete  redFont fa fa-trash delIcon detailsCenter"  id="" title="Edit Department Name" data-toggle="modal" title="Delete" data-target={`#${Data._id}-rm`} ></i>
														</td>

														<div className="modal fade col-lg-12 col-md-12 col-sm-12 col-xs-12" id={`${Data._id}-rm`}  role="dialog">
										                    <div className=" modal-dialog adminModal adminModal-dialog">
										                         <div className="modal-content adminModal-content col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
										                                <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
															        		<h4 className="CreateTempModal col-lg-11 col-md-11 col-sm-11 col-xs-11" id="exampleModalLabel"></h4>
															        		<div className="adminCloseCircleDiv pull-right  col-lg-1 col-md-1 col-sm-1 col-xs-1 NOpadding-left NOpadding-right">
																		        <button type="button" className="adminCloseButton" data-dismiss="modal" aria-label="Close">
																		          <span aria-hidden="true">&times;</span>
																		        </button>
																	        </div>
															      		</div>
										                              <div className="modal-body adminModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">

										                                 <h4 className="blackFont textAlignCenter col-lg-12 col-md-12 col-sm-12 col-xs-12 examDeleteFont">Are you sure you want to delete this Sell-O-Meter Data?</h4>
										                              </div>
										                              
										                              <div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
										                                   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
										                                        <button type="button" className="btn adminCancel-btn col-lg-4 col-lg-offset-1 col-md-4 col-md-offset-1 col-sm-8 col-sm-offset-1 col-xs-10 col-xs-offset-1" data-dismiss="modal">CANCEL</button>
										                                   </div>
										                                   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
										                                        <button id={Data._id} onClick={this.deleteData.bind(this)} type="button" className="btn examDelete-btn col-lg-4 col-lg-offset-7 col-md-4 col-md-offset-7 col-sm-8 col-sm-offset-3 col-xs-10 col-xs-offset-1" data-dismiss="modal">DELETE</button>
										                                   </div>
										                              </div>
										                         </div>
										                    </div>
										               </div>


										               <div className="modal fade col-lg-12 col-md-12 col-sm-12 col-xs-12" id={`${Data._id}-edit`}  role="dialog">
										                    <div className=" modal-dialog adminModal adminModal-dialog">
										                         <div className="modal-content adminModal-content col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
										                                <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
															        		<h4 className="CreateTempModal col-lg-11 col-md-11 col-sm-11 col-xs-11" id="exampleModalLabel"></h4>
															        		<div className="adminCloseCircleDiv pull-right  col-lg-1 col-md-1 col-sm-1 col-xs-1 NOpadding-left NOpadding-right">
																		        <button type="button" className="adminCloseButton" data-dismiss="modal" aria-label="Close">
																		          <span aria-hidden="true">&times;</span>
																		        </button>
																	        </div>
															      		</div>
															      		<div className="modal-body  col-lg-12 col-md-12 col-sm-12 col-xs-12">
												                              <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
												                              		<div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
													                              		<label className="textAlignLeft"> City name <span className="astrick">*</span></label>
																						<input type="text" ref="city" placeholder="Enter City" name="city" id="city" value={this.state.city} onChange={this.handleChange} className="form-control rolesField" required/>
																					</div>
																					<div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
													                              		<label className="textAlignLeft"> Area name <span className="astrick">*</span></label>
																						<input type="text" ref="area" placeholder="Enter Area" name="area" id="area" value={this.state.area} onChange={this.handleChange} className="form-control rolesField" required/>
																					</div>
												                              </div>

												                               <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
												                              		<div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
													                              		<label className="textAlignLeft"> Sub Area name <span className="astrick">*</span></label>
																						<input type="text" ref="subarea" placeholder="Enter Sub area" name="subarea" id="subarea" value={this.state.subarea} onChange={this.handleChange} className="form-control rolesField" required/>
																					</div>
																					<div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
													                              		<label className="textAlignLeft"> Society name <span className="astrick">*</span></label>
																						<input type="text" ref="society" placeholder="Enter society" name="society" id="society" value={this.state.society} onChange={this.handleChange} className="form-control rolesField" required/>
																					</div>
												                              </div>


												                              <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
												                              		  <div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-8">
																	      					<label>Property Class <span className="astrick">*</span></label>

																	                    	<select className="stateselection col-lg-6 col-md-6 col-xs-12 col-sm-8 form-control" title="Please select class" id="propertyClass" ref="propertyClass" name="propertyClass" value={this.state.propertyClass} onChange={this.handleChange} required>
																	                                   <option value="">-Select-</option>
																	                                   <option value="A"> A </option>
																	                                   <option value="B"> B </option>
																	                                   <option value="C"> C </option>
																	                                   <option value="D"> D </option>
																	                                   <option value="E"> E </option>
																	                                   <option value="F"> F </option>
																	                                   </select>
																	                 
																	      				</div>
																	      				<div className=" form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
													                              			<label className="textAlignLeft"> Index code <span className="astrick">*</span></label>
																							<input type="text" ref="index" name="index" id="index" value={this.state.index} onChange={this.handleChange} className="form-control rolesField" required/>
																						</div>
												                              </div>
												                         </div>
										                              
										                              <div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
										                                   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
										                                        <button type="button" onClick={this.ClearData.bind(this)} className="btn adminCancel-btn col-lg-4 col-lg-offset-1 col-md-4 col-md-offset-1 col-sm-8 col-sm-offset-1 col-xs-10 col-xs-offset-1" data-dismiss="modal">CANCEL</button>
										                                   </div>
										                                   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
										                                        <button id={Data._id} onClick={this.editData.bind(this)} type="button" className="btn examDelete-btn col-lg-4 col-lg-offset-7 col-md-4 col-md-offset-7 col-sm-8 col-sm-offset-3 col-xs-10 col-xs-offset-1">SUBMIT</button>
										                                   </div>
										                              </div>
										                         </div>
										                    </div>
										               </div>


														<div id="edit" className="modal fade col-lg-12 col-md-12 col-sm-12 col-xs-12" role="dialog">
														  <div className="modal-dialog adminModal adminModal-dialog col-lg-12 col-md-12 col-sm-12 col-xs-12" role="document">
														    <div className="modal-content adminModal-content col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12 noPadding">
														      <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
														        <h4 className="WightFont textAlignCenter col-lg-11 col-md-11 col-sm-11 col-xs-11" id="exampleModalLabel1">Edit Data</h4>
														        <div className="adminCloseCircleDiv pull-right  col-lg-1 col-md-1 col-sm-1 col-xs-12 NOpadding-left NOpadding-right">
									                              	<button type="button" className="adminCloseButton" data-dismiss="modal" data-target="edit">&times;</button>
									                            </div>
														      </div>
														      <div className="modal-body addressModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
																	<form className="editroles">
																		<div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-xs-12 col-sm-12 paddingLeftz addRoleMarginBtm">
																			<label className="textAlignLeft">Index Name</label>
																			<input type="text" ref="roleName" className="form-control rolesField" required/>
																		</div>
																		<div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
																			<div className="form-group col-lg-4 col-lg-offset-8 col-md-4 col-md-offset-8 col-xs-12 col-sm-12">
																				<label>&nbsp;</label>
																			    <button type="button" id="" className="btn adminFinish-btn" data-dismiss="modal">Edit Data</button>
																			</div>
																		</div>
																	</form>
														      </div>
														    </div>

														  </div>
														</div>

													</tr>
													)
													
													})
												}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
            </div>
        );
    }
}

export default sellOMeter;
