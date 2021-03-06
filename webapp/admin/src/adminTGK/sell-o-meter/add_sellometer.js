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
             allPosts : [],

      }     
       this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
      axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");
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
      "subArea": this.refs.subarea.value,
      "socity"  : this.refs.society.value,
      "propertyClass": this.refs.propertyClass.value,
      "index"      : this.state.index, 
      }
      
      console.log("formValues ", formValues);
    if(this.refs.city.value!=""&&this.refs.area.value!=""&&this.refs.subarea.value!=""&&this.refs.society.value!=""&&this.refs.propertyClass.value!=""&& this.state.index!="")
    {


        axios.post('/api/sellometers/', formValues)
          .then( (res)=>{
              console.log("submit ");
              swal("Data added successfully", "", "success");
              this.state.city = '';
              this.refs.area.value = '';        
              this.refs.subarea.value = '';        
              this.refs.society.value = '';        
              this.refs.propertyClass.value = '';


              this.state.area = "";
              this.state.subarea = "";
              this.state.society = "";
              this.state.propertyClass = "";
              this.state.index ='';      

              axios
              .get('/api/sellometers/list')
              .then(
                (res)=>{
                  console.log('res', res);
                  const postsdata = res.data;
                  console.log('postsdata of list ++++++++++++++++++++++++++++++++++',postsdata);
                  this.setState({
                    allPosts : postsdata,
                  });
                   this.props.selectedData(this.state.allPosts);
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
      }

    }



	

	render(){
    var cityName = this.state.city;
    var areaName = this.state.area;
    var subareaName = this.state.subarea;
    var societyName = this.state.society;
    var propclassName = this.state.propertyClass;   
    console.log("cityName",cityName); 

    if(cityName != null &&  areaName != null && subareaName != null && societyName != null)
    {
       var first  = cityName.toUpperCase().slice(0,2);
       var second = areaName.toUpperCase().slice(0,2);
       var third  = subareaName.toUpperCase().slice(0,2);
       var forth  = societyName.toUpperCase().slice(0,2);

       this.state.index = first+second+third+forth;
    }
   
   
       return(
       			<div>
					<form id="addroles" className="paddingLeftz noLRPad " >
						<div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-8">
							<label className="">Enter Data </label><br/>
							{/*<span className="blocking-span leftmar">*/}
                 <div className="form-group  col-lg-3 col-md-6 col-sm-12 col-xs-12">
                     <label className="control-label statelabel locationlabel" >City Name <span className="astrick">*</span> </label>
                      <input type="text" placeholder="Enter City" className="rolesField form-control  inputText " value={this.state.city} ref="city"  name="city" id="city" onChange={this.handleChange}/>   
                  </div>

                   <div className="form-group  col-lg-3 col-md-6 col-sm-12 col-xs-12">
                      <label className="control-label statelabel locationlabel" >Area Name <span className="astrick">*</span> </label> 
                      <input type="text" placeholder="Enter Area" className="rolesField form-control  inputText " ref="area"  name="area" id="area" onChange={this.handleChange}/>
                  </div>

                   <div className="form-group  col-lg-3 col-md-6 col-sm-12 col-xs-12">
                       <label className="control-label statelabel locationlabel" >Subarea Name <span className="astrick">*</span> </label> 
                       <input type="text" placeholder="Enter Sub area" className="rolesField form-control  inputText " ref="subarea"  name="subarea" id="subarea" onChange={this.handleChange}/>
                  </div>

                   <div className="form-group  col-lg-3 col-md-6 col-sm-12 col-xs-12">
                       <label className="control-label statelabel locationlabel" >Society Name <span className="astrick">*</span> </label> 
                       <input type="text" placeholder="Enter Society" className="rolesField form-control  inputText " ref="society"  name="society" id="society" onChange={this.handleChange}/>
                  </div>

              </div>

               <div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-8">
                    <div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-8">
      							<label>Property Class <span className="astrick">*</span>  </label>

                    <select className="stateselection col-lg-6 col-md-6 col-xs-12 col-sm-8 form-control" title="Please select class" id="propertyClass" ref="propertyClass" name="propertyClass" onChange={this.handleChange} required>
                                   <option value="">-Select-</option>
                                   <option value="A"> A </option>
                                   <option value="B"> B </option>
                                   <option value="C"> C </option>
                                   <option value="D"> D </option>
                                   <option value="E"> E </option>
                                 {/*  <option value="F"> F </option>*/}
                                   </select>
                 {/*   </span>*/}
      						</div>

                </div>

              <div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-8">
                   <div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-8">
                        <label>Property Index <span className="astrick">*</span> </label>
                        <input type="text" placeholder="index" className="rolesField form-control  inputText " value={this.state.index} ref="index"  name="index" id="index" onChange={this.handleChange}/>
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