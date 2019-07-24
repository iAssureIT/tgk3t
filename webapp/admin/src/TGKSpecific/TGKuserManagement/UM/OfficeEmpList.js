import React, { Component, PropTypes } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios 						   from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/js/modal.js';
import swal                     	from 'sweetalert';


class OfficeEmpList extends Component {
    

    constructor(props) {
        super(props);
        	this.state = {
				// allPosts : [],
				 allPosts   : [

            	{ name : "Technical Admin"},
            	{ name : "Executive Admin"},
            	{ name : "Sales Manager"},
            	{ name : "Sales Agent"},
            	{ name : "Field Manager"},
            	{ name : "Field Agent"},
            	
            	  
            ],

				// officename : "",
				 office : null,
				 allPostsLoc : [],

		}

		  this.handleChange = this.handleChange.bind(this);
    }

   componentDidMount() {

      axios
      .get('/api/tgkSpecificcompanysettings/list')
      .then(
        (res)=>{
          console.log('res', res);
          const postsdata = res.data;
          console.log('postsdata',postsdata);
          this.setState({
            allPostsLoc : postsdata,
          });

          console.log("allPostsLoc-------------------------------------",this.state.allPostsLoc);
          let locationArray =[];
          if(this.state.allPosts!=null){

          
           locationArray = this.state.allPostsLoc.map(function(item) { return item.companyLocationsInfo });
          }else{
             locationArray = "no data";
          }
    
          this.setState({
            office : locationArray,
          });
          console.log("locationArray", locationArray);
        console.log("this.state.office+++++++++++++++++",this.state.office);
               
        }
      )
      .catch((error)=>{

        console.log("error = ",error);
        // alert("Something went wrong! Please check Get URL.");
         });  
    }  

	// selectedData(data){
	// 	this.setState({
	// 		allPosts : data,
	// 	})

	// 	console.log("here full data in props ______________________________",this.state.allPosts);
	// }
	

  		deleteAmenity(event){
  	// 		event.preventDefault();
			// var id = event.target.id;
			// console.log("id",id);
			// const token = '';
			// const url = '/api/masteramenities/'+id ;
			// const headers = {
			// 	    "Authorization" : token,
			// 	    "Content-Type" 	: "application/json",
			// 	};

			// 	axios({
			// 		method: "DELETE",
			// 		url : url,
			// 		headers: headers,
			// 		timeout: 3000,
			// 		data: null,
			// 	})
			// 	.then((response)=> {
			//     	console.log('delete response',response);
			//     	swal("Amenity deleted successfully","", "success");

			//     	axios
			// 		.get('/api/masteramenities/list')
			// 		.then(
			// 			(res)=>{
			// 				console.log('res', res);
			// 				const postsdata = res.data;
			// 				console.log('postsdata',postsdata);
			// 				this.setState({
			// 					allPosts : postsdata,
			// 				});
			// 			}
			// 		)
			// 		.catch((error)=>{

			// 			console.log("error = ",error);
			// 			// alert("Something went wrong! Please check Get URL.");
			// // 			 });			


			// 	}).catch((error)=> {			    // handle error
			// 	    console.log(error);
			// 	});
  		}

  		editRole(event){

  	// 		event.preventDefault();
			// var id = event.target.id;
			// console.log("edit id",id);

			//  console.log("this.state.amenityname",this.state.amenityname);

			// const formValues = {
		 //      "amenity"     : this.state.amenityname,
		 //      }

		 //      console.log("formValues",formValues);
		      
		 //    axios.put('/api/masteramenities/'+id, formValues)
		 //      .then( (res)=>{
		 //          console.log("submit ",res);
		 //          swal("Amenities Updated successfully", "", "success");
		 //          this.state.amenityname = '';    


		 //          axios
			// 	.get('/api/masteramenities/list')
			// 	.then(
			// 		(res)=>{
			// 			console.log('res', res);
			// 			const postsdata = res.data;
			// 			console.log('postsdata',postsdata);
			// 			this.setState({
			// 				allPosts : postsdata,
			// 			});
			// 		}
			// 	)
			// 	.catch((error)=>{

			// 		console.log("error = ",error);
			// 		// alert("Something went wrong! Please check Get URL.");
			// 		 });			
				     
		 //      })
		 //      .catch((error)=>{
		 //        console.log("error = ",error);
		 //        // alert("Something went wrong! Please check Get URL.");
		 //      });  

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
                                         <h4 className="weighttitle">List of Employees</h4>
                                    </div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addRolesInWrap">

										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

												<div className=" col-lg-6 col-md-6 col-xs-12 col-sm-12 inputContent" >
                                                              <label className="formLable">Office Location <label className="requiredsign">*</label></label>
                                                                  <span className="blocking-span col-lg-12 col-md-12 col-xs-12 col-sm-12 emailfixdomain">
                                                                    <select className="form-control" value={this.state.officeid} ref ="office" id="office" name="office" data-text="office">
                                                                        <option  disabled> --select-- </option>

                                                                           { this.state.office != null ?
                                                                          this.state.office[0].map( (locData, index)=>{
                                                                          // console.log('locData',locData);
                                                                           return( 

                                                                                 <option value={locData.officeLocationid ? locData.officeLocationid : null } > {locData.officeLocationid ? locData.officeLocationid : null}  </option>


                                                                                   )}
                                                                           )
                                                                          :
                                                                          null

                                                                        }
                                                                    </select>

                                                                  </span>
                                                           </div>

										</div>
											
										<div className="table-responsive topmr40 col-lg-12 col-md-12 col-sm-12 col-xs-12">
											<table className="table iAssureITtable-bordered table-striped table-hover">
												<thead className="tempTableHeader">
													<tr className="">
														<th className="umDynamicHeader srpadd textAlignCenter"> Name </th>
														<th className="umDynamicHeader srpadd textAlignCenter"> Action </th>
													</tr>
												</thead>
												<tbody>
												{this.state.allPosts.map( (roleData, index)=>{
													// console.log('roleData',roleData);
												   return( 
													<tr>
														<td className="textAlignLeft">{roleData.name}</td>		
														<td className="roleTextCenter pointerCls"> 						
															<i className="fa fa-pencil editTcon editIcon pointerCls"  data-toggle="modal" title=" Edit"  title="Edit Department Name" ></i>
															&nbsp;&nbsp;
															<i className="deleteIcon roleDelete  redFont fa fa-trash delIcon detailsCenter"  id="" title="Delete" data-toggle="modal" title="Delete" ></i>
														</td>

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

export default OfficeEmpList;
