import React, { Component } from 'react';
import { render } from 'react-dom';
import swal                       from 'sweetalert';

import axios from 'axios';

import './sellometer.css';
// import TrackerReact from 'meteor/ultimatejs:tracker-react';
// import { UserManagementMaster }  from '/imports/admin/userManagement/UM/UserManagementMaster.js';

export default class add_sellometer extends Component {

    constructor(props) {
    super(props);
    this.state = {
        "index" : ""

      }     
       this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        const target = event.target.value;
        const name   = event.target.name;
        console.log('target',name, target);
          this.setState({ 
        [name]:target
      },()=>{
        // console.log('this state', this.state);
      })

         /* if(name=="index" && target.length>=2)
          {
            console.log("name of index");
          }*/
  }

    createData(event){
    event.preventDefault();
    const formValues = {
      "city"     : this.refs.city.value,
      "area"     : this.refs.area.value,
      "sub arera": this.refs.subarea.value,
      "society"  : this.refs.society.value,
      "propclass": this.refs.propertyClass.value,

      }
      console.log("this.state.city", this.state.city);
      console.log("formValues ", formValues);
    /*axios.post('/api/roles', formValues)
      .then( (res)=>{
          console.log("submit ");
          swal("Role added successfully", "", "success");
          this.refs.role.value = '';        
      })
      .catch((error)=>{
        console.log("error = ",error);
        // alert("Something went wrong! Please check Get URL.");
      });*/
  

    }



	

	render(){
    var cityName = this.state.city;
    var areaName = this.state.area;
    var subareaName = this.state.subarea;
    var societyName = this.state.society;
    var propclassName = this.state.propertyClass;   
    console.log("cityName",cityName); 
    if(cityName!=null && areaName != null && subareaName != null && societyName != null && propclassName != null)
    {
      this.state.index = "PUHDMANA";
    console.log("all data filled");
    }
       return(
       			<div>
					<form id="addroles" className="paddingLeftz noLRPad " >
						<div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-8">
							<label className="">Enter Data </label><span className="astrick">*</span> <br/>
							{/*<span className="blocking-span leftmar">*/}
                 <div className="form-group  col-lg-3 col-md-6 col-sm-12 col-xs-12">
                     <label className="control-label statelabel locationlabel" >City Name</label>
                      <input type="text" placeholder="City" className="rolesField form-control  inputText tmsUserAccForm" value={this.state.city} ref="city"  name="city" id="city" onChange={this.handleChange}/>   
                  </div>

                   <div className="form-group  col-lg-3 col-md-6 col-sm-12 col-xs-12">
                      <label className="control-label statelabel locationlabel" >Area Name</label> 
                      <input type="text" placeholder="Area" className="rolesField form-control  inputText tmsUserAccForm" ref="area"  name="area" id="area" onChange={this.handleChange}/>
                  </div>

                   <div className="form-group  col-lg-3 col-md-6 col-sm-12 col-xs-12">
                       <label className="control-label statelabel locationlabel" >Subarea Name</label> 
                       <input type="text" placeholder="Sub area" className="rolesField form-control  inputText tmsUserAccForm" ref="subarea"  name="subarea" id="subarea" onChange={this.handleChange}/>
                  </div>

                   <div className="form-group  col-lg-3 col-md-6 col-sm-12 col-xs-12">
                       <label className="control-label statelabel locationlabel" >Society Name</label> 
                       <input type="text" placeholder="Society" className="rolesField form-control  inputText tmsUserAccForm" ref="society"  name="society" id="society" onChange={this.handleChange}/>
                  </div>

              </div>

               <div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-8">
                    <div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-8">
      							<label>Property Class </label>

                    <select className="stateselection col-lg-6 col-md-6 col-xs-12 col-sm-8 form-control" title="Please select class" id="propertyClass" ref="propertyClass" name="propertyClass" onChange={this.handleChange} required>
                                   <option value="">-Select-</option>
                                   <option value="A"> A </option>
                                   <option value="B"> B </option>
                                   <option value="C"> C </option>
                                   <option value="D"> D </option>
                                   <option value="E"> E </option>
                                   <option value="F"> F </option>
                                   </select>
                 {/*   </span>*/}
      						</div>

                </div>

              <div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-8">
                   <div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-8">
                        <label>Property Index </label>
                        <input type="text" placeholder="index" className="rolesField form-control  inputText tmsUserAccForm" value={this.state.index} ref="index"  name="index" id="index" onChange={this.handleChange}/>
                   </div>
                  <div className="form-group mar30 col-lg-6 col-md-6 col-xs-12 col-sm-8">
                     <button onClick={this.createData.bind(this)} className="btn btn-primary pull-right">&nbsp; &nbsp;Submit&nbsp; &nbsp;</button>
                  </div>          
					    </div>

					</form>
				</div>
								

	    );
	} 

}