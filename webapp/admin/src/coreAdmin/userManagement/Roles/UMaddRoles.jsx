import React, { Component } from 'react';
import { render } from 'react-dom';

import axios from 'axios';

// import TrackerReact from 'meteor/ultimatejs:tracker-react';
// import { UserManagementMaster }  from '/imports/admin/userManagement/UM/UserManagementMaster.js';

export default class UMaddRoles extends Component {

    createRole(event){
    event.preventDefault();
    const formValues = {
      "role"     : this.refs.role.value,
      }

    axios.post('/roles', formValues)
      .then( (res)=>{
        console.log(res);
        if(res.status == 200){
          this.props.getdata(res.data.dataBody);
          alert("Data inserted Successfully!");

          this.refs.role.value = '';
        }
      })
      .catch((error)=>{
        console.log("error = ",error);
        alert("Something went wrong! Please check Get URL.");
      });
  

    }



	

	render(){
       return(
       			<div>
					<form id="addroles" className="paddingLeftz noLRPad " onSubmit={this.createRole.bind(this)} >
						<div className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-lg-offset-3 col-xs-12 col-sm-8">
							<label className="">Enter Role </label><span className="astrick">*</span>
							<span className="blocking-span">
								<input type="text" id= "" className="rolesField form-control UMname inputText tmsUserAccForm" ref="role"  name="roleName" id="roleName"/>
							</span>
						</div>
					
					</form>
				</div>
								

	    );
	} 

}