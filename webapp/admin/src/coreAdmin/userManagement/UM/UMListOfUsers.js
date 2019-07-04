import React, { Component } 		  from 'react';
import CreateUser 					       from './CreateUser.js';
import axios                        from 'axios';
import _                        from 'underscore';
import './userManagement.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/js/modal.js';
import IAssureTableUM from '../../IAssureTableUM/IAssureTable.jsx';
axios.defaults.baseURL = 'http://apitgk3t.iassureit.com/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

class UMListOfUsers extends Component {
	constructor(props){
		super(props);
		this.state = {
		 	allPosts : [],
		 	"twoLevelHeader"    : {
                apply           : false,
            },
             "tableHeading"      : {
                fullName    : 'User Name',
                emailId    : 'Email',
                mobNumber         : 'Mobile Number', 
                status        : 'Status',
                roles        : 'Role',
                actions        : 'Action',
            },
            "startRange"        : 0,
            "limitRange"        : 10,
		}

	}
	componentDidMount(){
		axios.get('/api/users/list')
		.then( (res)=>{      
			const postsdata = res.data.map((a, index)=>{
        var x = {};
        x = {
          fullName : a.profile ? a.profile.fullName : '',
          emailId  : a.profile ? a.profile.emailId : '',
          mobNumber  : a.profile ? a.profile.mobNumber : '',
          status  : a.profile ? a.profile.status : '',
          roles  : a.roles ? a.roles.toString() : '',
        } 
        return x; 
       });

			console.log('postsdata====================',postsdata);
			this.setState({
          completeDataCount : postsdata.length,
          tableData : postsdata.slice(this.state.startRange, this.state.limitRange),          
        },()=>{
        })  
		})
		.catch((error)=>{
			console.log("error = ",error);
			alert("Something went wrong! Please check Get URL.");
		});	
        
        
	}
	getData(startRange, limitRange){        
        axios.get('/api/users/list')
        .then( (res)=>{      
          const postsdata = res.data.map((a, index)=>{
            var x = {};
            x = {
              fullName : a.profile ? a.profile.fullName : '',
              emailId  : a.profile ? a.profile.emailId : '',
              mobNumber  : a.profile ? a.profile.mobNumber : '',
              status  : a.profile ? a.profile.status : '',
              roles  : a.roles ? a.roles.toString() : '',
            } 
            return x; 
           });
          this.setState({
              completeDataCount : postsdata.length,
              tableData : postsdata.slice(startRange, limitRange),          
            },()=>{
            })  
        })
    .catch((error)=>{
      console.log("error = ",error);
      alert("Something went wrong! Please check Get URL.");
    }); 
    }
    getSearchText(searchText, startRange, limitRange){
        console.log(searchText, startRange, limitRange);
        this.setState({
            tableData : []
        });
    }

render(){
	// console.log('this.state.completeDataCount', this.state.completeDataCount);
     return(
   		<div className="">
   		<div className="">
      	</div>
			<section className="">
		        <div className="">
		        <div className="">
		          	<div className="">
			            <div className="">
				            
							<div className="modal-bodyuser">

						        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 box-header with-border nopaddingum2">

									<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12  paddingright">

										<h4 className="usrmgnttitle weighttitle">User Management</h4>
									</div>
									<div className="col-lg-2 col-md-3 col-sm-12 col-xs-12 "  id="createmodalcl">
										<button type="button" className="btn col-lg-12 col-md-12 col-sm-12 col-xs-12 addexamform clickforhideshow" data-toggle="modal" data-target="#CreateUserModal">Add User</button>
											<CreateUser />
									</div>
									<div className="col-lg-2 col-md-3 col-sm-12 col-xs-12 "  id="createmodalcl">
										<a href="/umroleslist"><button type="button" className="btn col-lg-12 col-md-12 col-sm-12 col-xs-12 addexamform clickforhideshow">Add Role</button></a>
									</div>
							
				                   {/* <div className="col-lg-7 col-md-6 col-sm-12 col-xs-12 searchTableBoxAlignSETUM">
				                   		<span className="blocking-span">
					                   		<input type="text" name="search"  className="col-lg-8 col-md-8 col-sm-8 Searchusers Searchfind inputTextSearch outlinebox pull-right "  placeholder="&#128269; Search by Name "  />
					                   	</span>
				                    </div>*/}
								</div>
						        <form className="newTemplateForm">
									
									<div className="col-lg-12  col-md-12 col-sm-12 col-xs-12 usrmgnhead">
										<div className="form-group col-lg-3 col-md-3 col-sm-6 col-xs-6">
											<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">Select Action</label>
											<select className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPadding  form-control" id="userListDropdownId" ref="userListDropdown" name="userListDropdown" >
												<option className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-limit='37' value="-" name="userListDDOption">-- Select --</option>	
												<option className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-limit='37' value="block_selected" name="userListDDOption">Block Selected</option>	
												<option className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-limit='37' value="active_selected" name="userListDDOption">Active Selected</option>
												<option className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-limit='37' value="cancel_selected" name="userListDDOption">Delete Selected Acccounts</option>	
												{/* 	this.adminRolesListData().map( (rolesData)=>{
														return <UMAddRolRow key={rolesData._id} roleDataVales={rolesData}/>
												  	})
												*/}
												{ /*this.adminRolesListData().map( (rolesData)=>{
													return <UMDelRolRow key={rolesData._id} roleDataVales={rolesData}/>
													  })
												*/}
											</select>

										</div> 
										

										<div className="form-group col-lg-3 col-md-3 col-sm-6 col-xs-6">
											
											<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">Select Role</label>
											<select className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPadding  form-control" ref="roleListDropdown" name="roleListDropdown" >
												<option name="roleListDDOption">-- Select --</option>
												<option value="all" name="roleListDDOption">Show All</option>		
												{ /*this.rolesListData().map( (rolesData)=>{
													return <UMSelectRoleUsers key={rolesData._id} roleDataVales={rolesData}/>
												  }) 
												*/}	
												 
											</select>
										</div>

				
										<div className="form-group col-lg-3 col-md-3 col-sm-6 col-xs-6">
											<label className="col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-left">Select Status</label>
											<select className="col-lg-12 col-md-12 col-sm-12 col-xs-12  noPadding  form-control" ref="blockActive" name="blockActive" >
												<option>-- Select --</option>	
												<option value="all"	>Show All</option>	
												<option value="Blocked">Blocked</option>	
												<option value="Active">Active </option>	
											</select>
										</div>

										
									</div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  usrmgnhead">
										<IAssureTableUM
  										completeDataCount={this.state.completeDataCount}
                      twoLevelHeader={this.state.twoLevelHeader} 
                      getData={this.getData.bind(this)} 
                      tableHeading={this.state.tableHeading} 
                      tableData={this.state.tableData} 
                      getSearchText={this.getSearchText.bind(this)} 
										/>			
									</div>
								</form>
						    </div>

						</div>
					</div>
				</div></div>
			</section>
  		</div>
     );
    }

}


export default UMListOfUsers;