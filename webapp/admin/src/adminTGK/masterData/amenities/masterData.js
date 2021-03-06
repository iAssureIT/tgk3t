import React, { Component, PropTypes } from 'react';
import axios 						   from 'axios';
import swal                     	   from 'sweetalert';
import Add_data 					   from './add_data.js';
import $ 							   from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/js/modal.js';
import './masterData.css';
/*import Add_dataTable 				   from './add_dataTable.js';*/

class masterData extends Component {
    

    constructor(props) {
        super(props);
        	this.state = {
				allPosts : [],
				amenityname : "",
		}

		  this.handleChange = this.handleChange.bind(this);
		   // $('.subjectRowError').css({'display':'none'});
    }

    componentDidMount(){
      axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");
      
   	  $('.subjectRowError').css({'display':'none'});

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
	

  		deleteAmenity(event){

  			event.preventDefault();
			var id = event.target.id;
			console.log("id",id);
			const token = 'Bearer '+ localStorage.getItem("token");
			const url = '/api/masteramenities/'+id ;
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

  		editRole(event){

  			event.preventDefault();
			var id = event.target.id;
			console.log("edit id",id);

			 console.log("this.state.amenityname",this.state.amenityname);

			const formValues = {
		      "amenity"     : this.state.amenityname,
		      }

		      console.log("formValues",formValues);
		      
		      if(this.state.amenityname != "")
		      {
		      		   $('.subjectRowError').css({'display':'none'});

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

								$('.modal').remove();
								$('.modal-backdrop').remove();
								$('body').removeClass( "modal-open" );
								 window.location.reload();
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
		      		   $('.subjectRowError').removeClass('hidden');
		      		    // swal("Please enter Name", "", "warning");
		      }
		   

  		}

  	handleChange(event){
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

       axios.get('/api/masteramenities/'+ id)
        .then( (res)=>{
          console.log("here data_______________",res.data);
          this.setState({
            amenityname: res.data[0].amenity,
           
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
    	 // $('.subjectRowError').css({'display':'none'});
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
									<div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 addRolesInWrap">
											<Add_data selectedData={this.selectedData.bind(this)}/>
										<div className="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
											<table className="table iAssureITtable-bordered table-striped table-hover">
												<thead className="tempTableHeader">
													<tr className="">
														<th className="umDynamicHeader srpadd textAlignCenter"> Amenities </th>
														<th className="umDynamicHeader srpadd textAlignCenter"> Actions </th>
													</tr>
												</thead>
												<tbody>
												{this.state.allPosts.map( (roleData, index)=>{
													// console.log('roleData',roleData);
												   return( 
													<tr className="ReverseData">
														<td className="textCenter">{roleData.amenity}</td>		
														<td className="roleTextCenter pointerCls">
															{roleData.amenity=="Swimming Pool" || roleData.amenity=="AC" || roleData.amenity=="Gas Pipeline" || roleData.amenity=="24*7 Water" || roleData.amenity=="Lift"  || roleData.amenity=="Power Backup" || roleData.amenity=="Shopping Center" || roleData.amenity=="Children's Play Area" || roleData.amenity=="Internal Gym" || roleData.amenity=="Park"  ?
															null
															:	
															<div>		
															<i className="fa fa-pencil editTcon editIcon pointerCls"  data-toggle="modal" id={roleData._id} onClick={this.getData.bind(this)} title=" Edit" data-target={`#${roleData._id}-edit`} title="Edit" ></i>
															<i className="deleteIcon roleDelete  redFont fa fa-trash delIcon detailsCenter"  id="" title="Delete" data-toggle="modal" title="Delete" data-target={`#${roleData._id}-rm`} ></i>
															</div>
															
															}
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

										                                 <h4 className="blackFont textAlignCenter col-lg-12 col-md-12 col-sm-12 col-xs-12 examDeleteFont">Are you sure you want to delete this Amenity?</h4>
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
										                              
										                              <label className="textAlignLeft">Enter Amenities</label>
																			<input type="text" ref="amenityname" name="amenityname" id="amenityname" value={this.state.amenityname} onChange={this.handleChange} className="form-control rolesField" required/>
																			<span className="text-danger subjectRowError hidden">Please enter Name</span> 
                                      

										                              </div>
										                              
										                              <div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
										                                   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
										                                        <button type="button" className="btn adminCancel-btn col-lg-4 col-lg-offset-1 col-md-4 col-md-offset-1 col-sm-8 col-sm-offset-1 col-xs-10 col-xs-offset-1" data-dismiss="modal">CANCEL</button>
										                                   </div>
										                                   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
										                                        <button id={roleData._id} onClick={this.editRole.bind(this)} type="button" className="btn examDelete-btn col-lg-4 col-lg-offset-7 col-md-4 col-md-offset-7 col-sm-8 col-sm-offset-3 col-xs-10 col-xs-offset-1">SUBMIT</button>
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
