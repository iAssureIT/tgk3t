import React, { Component, PropTypes } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios 						   from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/js/modal.js';
import swal                     	from 'sweetalert';
import Add_data 					   from './add_data.js';
/*import Add_dataTable 				   from './add_dataTable.js';*/

class masterData extends Component {
    

    constructor(props) {
        super(props);
        	this.state = {
				allPosts : [],
				amenityname : "",
		}

		  this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){

		axios
			.get('/api/masteramenities/list')
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
				// alert("Something went wrong! Please check Get URL.");
				 });				

	}

	selectedData(data){
		this.setState({
			allPosts : data,
		})

		console.log("here full data in props ______________________________",this.state.allPosts);
	}
	

  		deleteAmenity(event){
  			event.preventDefault();
			var id = event.target.id;
			console.log("id",id);
			const token = '';
			const url = '/api/masteramenities/'+id ;
			const headers = {
				    "Authorization" : token,
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
			    	swal("Amenity deleted successfully","", "success");

			    	axios
					.get('/api/masteramenities/list')
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
						// alert("Something went wrong! Please check Get URL.");
						 });			


				}).catch((error)=> {			    // handle error
				    console.log(error);
				});
  		}

  		editRole(event){

  			event.preventDefault();
			var id = event.target.id;
			console.log("edit id",id);

			 console.log("this.state.amenityname",this.state.amenityname);

			const formValues = {
		      "amenity"     : this.state.amenityname,
		      }

		      console.log("formValues",formValues);
		      
		    axios.put('/api/masteramenities/'+id, formValues)
		      .then( (res)=>{
		          console.log("submit ",res);
		          swal("Amenities Updated successfully", "", "success");
		          this.state.amenityname = '';    


		          axios
				.get('/api/masteramenities/list')
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
					// alert("Something went wrong! Please check Get URL.");
					 });			
				     
		      })
		      .catch((error)=>{
		        console.log("error = ",error);
		        // alert("Something went wrong! Please check Get URL.");
		      });  

  		}

  		handleChange(event){
	  const target = event.target;
	  const name   = target.name;
	  this.setState({
	  	[name]: event.target.value,
	  });
	}

    render() {
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
                                         <h4 className="weighttitle">List of Amenities</h4>
                                    </div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addRolesInWrap">
											<Add_data selectedData={this.selectedData.bind(this)}/>
										<div className="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
											<table className="table iAssureITtable-bordered table-striped table-hover">
												<thead className="tempTableHeader">
													<tr className="">
														<th className="umDynamicHeader srpadd textAlignCenter"> Amenities </th>
														<th className="umDynamicHeader srpadd textAlignCenter"> Action </th>
													</tr>
												</thead>
												<tbody>
												{this.state.allPosts.map( (roleData, index)=>{
													// console.log('roleData',roleData);
												   return( 
													<tr>
														<td className="textAlignLeft">{roleData.amenity}</td>		
														<td className="roleTextCenter pointerCls"> 						
															<i className="fa fa-pencil editTcon editIcon pointerCls"  data-toggle="modal" title=" Edit" data-target={`#${roleData._id}-edit`} title="Edit Department Name" ></i>
															&nbsp;&nbsp;
															<i className="deleteIcon roleDelete  redFont fa fa-trash delIcon detailsCenter"  id="" title="Delete" data-toggle="modal" title="Delete" data-target={`#${roleData._id}-rm`} ></i>
														</td>

														<div className="modal fade col-lg-12 col-md-12 col-sm-12 col-xs-12" id={`${roleData._id}-rm`}  role="dialog">
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

										                                 <h4 className="blackFont textAlignCenter col-lg-12 col-md-12 col-sm-12 col-xs-12 examDeleteFont">Are you sure you want to delete this Amenities?</h4>
										                              </div>
										                              
										                              <div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
										                                   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
										                                        <button type="button" className="btn adminCancel-btn col-lg-4 col-lg-offset-1 col-md-4 col-md-offset-1 col-sm-8 col-sm-offset-1 col-xs-10 col-xs-offset-1" data-dismiss="modal">CANCEL</button>
										                                   </div>
										                                   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
										                                        <button id={roleData._id} onClick={this.deleteAmenity.bind(this)} type="button" className="btn examDelete-btn col-lg-4 col-lg-offset-7 col-md-4 col-md-offset-7 col-sm-8 col-sm-offset-3 col-xs-10 col-xs-offset-1" data-dismiss="modal">DELETE</button>
										                                   </div>
										                              </div>
										                         </div>
										                    </div>
										               </div>


										               <div className="modal fade col-lg-12 col-md-12 col-sm-12 col-xs-12" id={`${roleData._id}-edit`}  role="dialog">
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
										                              
										                              <label className="textAlignLeft">Amenities Name</label>
																			<input type="text" ref="amenityname" name="amenityname" id="amenityname" value={this.state.amenityname} onChange={this.handleChange} className="form-control rolesField" required/>
																		

										                              </div>
										                              
										                              <div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
										                                   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
										                                        <button type="button" className="btn adminCancel-btn col-lg-4 col-lg-offset-1 col-md-4 col-md-offset-1 col-sm-8 col-sm-offset-1 col-xs-10 col-xs-offset-1" data-dismiss="modal">CANCEL</button>
										                                   </div>
										                                   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
										                                        <button id={roleData._id} onClick={this.editRole.bind(this)} type="button" className="btn examDelete-btn col-lg-4 col-lg-offset-7 col-md-4 col-md-offset-7 col-sm-8 col-sm-offset-3 col-xs-10 col-xs-offset-1" data-dismiss="modal">SUBMIT</button>
										                                   </div>
										                              </div>
										                         </div>
										                    </div>
										               </div>


														<div id="edit" className="modal fade col-lg-12 col-md-12 col-sm-12 col-xs-12" role="dialog">
														  <div className="modal-dialog adminModal adminModal-dialog col-lg-12 col-md-12 col-sm-12 col-xs-12" role="document">
														    <div className="modal-content adminModal-content col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12 noPadding">
														      <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
														        <h4 className="WightFont textAlignCenter col-lg-11 col-md-11 col-sm-11 col-xs-11" id="exampleModalLabel1">Edit Role</h4>
														        <div className="adminCloseCircleDiv pull-right  col-lg-1 col-md-1 col-sm-1 col-xs-12 NOpadding-left NOpadding-right">
									                              	<button type="button" className="adminCloseButton" data-dismiss="modal" data-target="edit">&times;</button>
									                            </div>
														      </div>
														      <div className="modal-body addressModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
																	<form className="editroles">
																		<div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-xs-12 col-sm-12 paddingLeftz addRoleMarginBtm">
																			<label className="textAlignLeft">Collection Name</label>
																			<input type="text" ref="roleName" className="form-control rolesField" required/>
																		</div>
																		<div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
																			<div className="form-group col-lg-4 col-lg-offset-8 col-md-4 col-md-offset-8 col-xs-12 col-sm-12">
																				<label>&nbsp;</label>
																			    <button type="button" id="" className="btn adminFinish-btn" data-dismiss="modal">Edit Role</button>
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

export default masterData;
