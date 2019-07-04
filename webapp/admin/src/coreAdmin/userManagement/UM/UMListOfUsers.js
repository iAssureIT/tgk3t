import React, { Component } 		  from 'react';
import CreateUser 					       from './CreateUser.js';
import axios                        from 'axios';
import _                        from 'underscore';
import './userManagement.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/js/modal.js';
import IAssureTable from '../../IAssureTable/IAssureTable.jsx';
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
            // "tableHeading"      : {
            //     userName    : 'User Name',
            //     Email    	: 'Email',
            //     mobNumber   : 'Mobile Number', 
            //     role        : 'Roles',
            //     status      : 'Status',
            //     actions     : 'Action',
            // },
             "tableHeading"      : {
                templateType    : 'Template Type',
                templateName    : 'Template Name',
                subject         : 'Subject', 
                contents        : 'Content',
            },
            "startRange"        : 0,
            "limitRange"        : 10,
            // "completeDataCount" : 45,
		}

	}

	componentDidMount(){
		var data ={
			limitRange : this.state.limitRange,
			startRange : this.state.startRange,
		}

		axios.get('/api/users/list')
		.then( (res)=>{
			console.log('res', res);
			const postsdata = _.flatten(res.data);

			console.log('postsdata====================',postsdata);
			this.setState({
				tableData : postsdata,
			});
		})
		.catch((error)=>{
			console.log("error = ",error);
			alert("Something went wrong! Please check Get URL.");
		});	

		  // var tableDatas = [
    //         {
    //             templateType    : 'Notification',
    //             templateName    : 'User Registration',
    //             subject         : 'User Registered Successfully.', 
    //             contents        : 'Content 1',
    //         },
    //         {
    //             templateType    : 'Email',
    //             templateName    : 'User Registration',
    //             subject         : 'User Registered Successfully.', 
    //             contents        : 'Content 2',
    //         },
    //         {
    //             templateType    : 'SMS',
    //             templateName    : 'User Registration',
    //             subject         : 'User Registered Successfully.', 
    //             contents        : 'Content 3',
    //         },
    //         {
    //             templateType    : 'Notification',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 4',
    //         },
    //         {
    //             templateType    : 'Email',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 5',
    //         },
    //         {
    //             templateType    : 'SMS',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 6',
    //         },
    //         {
    //             templateType    : 'Notification',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 7',
    //         },
    //         {
    //             templateType    : 'Email',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 8',
    //         },
    //         {
    //             templateType    : 'SMS',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 9',
    //         },
    //         {
    //             templateType    : 'Notification',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 10',
    //         },
    //         {
    //             templateType    : 'Email',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 11',
    //         },
    //         {
    //             templateType    : 'SMS',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 12',
    //         },
    //         {
    //             templateType    : 'Notification',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 13',
    //         },
    //         {
    //             templateType    : 'Email',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 14',
    //         },
    //         {
    //             templateType    : 'SMS',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 15',
    //         },
    //         {
    //             templateType    : 'Notification',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 16',
    //         },
    //         {
    //             templateType    : 'Email',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 17',
    //         },
    //         {
    //             templateType    : 'SMS',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 18',
    //         },
    //         {
    //             templateType    : 'Notification',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 19',
    //         },
    //         {
    //             templateType    : 'Email',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 20',
    //         },
    //         {
    //             templateType    : 'SMS',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 21',
    //         },
    //         {
    //             templateType    : 'Notification',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 22',
    //         },
    //         {
    //             templateType    : 'Email',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 23',
    //         },
    //         {
    //             templateType    : 'SMS',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 24',
    //         },
    //         {
    //             templateType    : 'Notification',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 25',
    //         },
    //         {
    //             templateType    : 'Email',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 26',
    //         },
    //         {
    //             templateType    : 'SMS',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 27',
    //         },
    //         {
    //             templateType    : 'Notification',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 28',
    //         },
    //         {
    //             templateType    : 'Email',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 29',
    //         },
    //         {
    //             templateType    : 'SMS',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 30',
    //         },
    //         {
    //             templateType    : 'Notification',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 31',
    //         },
    //         {
    //             templateType    : 'Email',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 32',
    //         },
    //         {
    //             templateType    : 'SMS',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 33',
    //         },
    //         {
    //             templateType    : 'Notification',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 34',
    //         },
    //         {
    //             templateType    : 'Email',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 35',
    //         },
    //         {
    //             templateType    : 'SMS',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 36',
    //         },
    //         {
    //             templateType    : 'Notification',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 37',
    //         },
    //         {
    //             templateType    : 'Email',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 38',
    //         },
    //         {
    //             templateType    : 'SMS',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 39',
    //         },
    //         {
    //             templateType    : 'Notification',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 40',
    //         },
    //         {
    //             templateType    : 'Email',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 41',
    //         },
    //         {
    //             templateType    : 'SMS',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 42',
    //         },
    //         {
    //             templateType    : 'Notification',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 43',
    //         },
    //         {
    //             templateType    : 'Email',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 44',
    //         },
    //         {
    //             templateType    : 'SMS',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 45',
    //         },
    //     ]
        
        this.setState({
        	completeDataCount : 0,
        	// tableData : tableDatas.slice(this.state.startRange, this.state.limitRange),
          tableData : [],
        	
        },()=>{
        	console.log('completeDataCount', this.state.completeDataCount);
        })	
	}
	getData(startRange, limitRange){        
        var data ={
			limitRange : limitRange,
			startRange : startRange,
		}

		// axios.post('/api/users/users', data)
		// .then( (res)=>{
		// 	console.log('res', res);
		// 	const postsdata = res.data;
		// 	console.log('postsdata',postsdata);
		// 	this.setState({
		// 		tableData : postsdata,
		// 	});
		// })
		// .catch((error)=>{
		// 	console.log("error = ",error);
		// 	alert("Something went wrong! Please check Get URL.");
		// });

		  // var tableDatas = [
    //         {
    //             templateType    : 'Notification',
    //             templateName    : 'User Registration',
    //             subject         : 'User Registered Successfully.', 
    //             contents        : 'Content 1',
    //         },
    //         {
    //             templateType    : 'Email',
    //             templateName    : 'User Registration',
    //             subject         : 'User Registered Successfully.', 
    //             contents        : 'Content 2',
    //         },
    //         {
    //             templateType    : 'SMS',
    //             templateName    : 'User Registration',
    //             subject         : 'User Registered Successfully.', 
    //             contents        : 'Content 3',
    //         },
    //         {
    //             templateType    : 'Notification',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 4',
    //         },
    //         {
    //             templateType    : 'Email',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 5',
    //         },
    //         {
    //             templateType    : 'SMS',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 6',
    //         },
    //         {
    //             templateType    : 'Notification',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 7',
    //         },
    //         {
    //             templateType    : 'Email',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 8',
    //         },
    //         {
    //             templateType    : 'SMS',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 9',
    //         },
    //         {
    //             templateType    : 'Notification',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 10',
    //         },
    //         {
    //             templateType    : 'Email',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 11',
    //         },
    //         {
    //             templateType    : 'SMS',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 12',
    //         },
    //         {
    //             templateType    : 'Notification',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 13',
    //         },
    //         {
    //             templateType    : 'Email',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 14',
    //         },
    //         {
    //             templateType    : 'SMS',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 15',
    //         },
    //         {
    //             templateType    : 'Notification',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 16',
    //         },
    //         {
    //             templateType    : 'Email',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 17',
    //         },
    //         {
    //             templateType    : 'SMS',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 18',
    //         },
    //         {
    //             templateType    : 'Notification',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 19',
    //         },
    //         {
    //             templateType    : 'Email',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 20',
    //         },
    //         {
    //             templateType    : 'SMS',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 21',
    //         },
    //         {
    //             templateType    : 'Notification',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 22',
    //         },
    //         {
    //             templateType    : 'Email',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 23',
    //         },
    //         {
    //             templateType    : 'SMS',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 24',
    //         },
    //         {
    //             templateType    : 'Notification',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 25',
    //         },
    //         {
    //             templateType    : 'Email',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 26',
    //         },
    //         {
    //             templateType    : 'SMS',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 27',
    //         },
    //         {
    //             templateType    : 'Notification',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 28',
    //         },
    //         {
    //             templateType    : 'Email',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 29',
    //         },
    //         {
    //             templateType    : 'SMS',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 30',
    //         },
    //         {
    //             templateType    : 'Notification',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 31',
    //         },
    //         {
    //             templateType    : 'Email',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 32',
    //         },
    //         {
    //             templateType    : 'SMS',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 33',
    //         },
    //         {
    //             templateType    : 'Notification',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 34',
    //         },
    //         {
    //             templateType    : 'Email',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 35',
    //         },
    //         {
    //             templateType    : 'SMS',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 36',
    //         },
    //         {
    //             templateType    : 'Notification',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 37',
    //         },
    //         {
    //             templateType    : 'Email',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 38',
    //         },
    //         {
    //             templateType    : 'SMS',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 39',
    //         },
    //         {
    //             templateType    : 'Notification',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 40',
    //         },
    //         {
    //             templateType    : 'Email',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 41',
    //         },
    //         {
    //             templateType    : 'SMS',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 42',
    //         },
    //         {
    //             templateType    : 'Notification',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 43',
    //         },
    //         {
    //             templateType    : 'Email',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 44',
    //         },
    //         {
    //             templateType    : 'SMS',
    //             templateName    : 'User Login',
    //             subject         : 'User loggedin Successfully.', 
    //             contents        : 'Content 45',
    //         },
    //     ]
        
        this.setState({
        	// tableData : tableDatas.slice(startRange, limitRange),
        })
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
							
				                    <div className="col-lg-7 col-md-6 col-sm-12 col-xs-12 searchTableBoxAlignSETUM">
				                   		<span className="blocking-span">
					                   		<input type="text" name="search"  className="col-lg-8 col-md-8 col-sm-8 Searchusers Searchfind inputTextSearch outlinebox pull-right "  placeholder="&#128269; Search by Name "  />
					                   	</span>
				                    </div>
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
										{/*<IAssureTable
  										completeDataCount={this.state.completeDataCount}
                      twoLevelHeader={this.state.twoLevelHeader} 
                      getData={this.getData.bind(this)} 
                      tableHeading={this.state.tableHeading} 
                      tableData={this.state.tableData} 
                      getSearchText={this.getSearchText.bind(this)} 
										/>			*/}	
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