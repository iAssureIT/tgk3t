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

  componentDidMount(){
      axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");
  }
  
    createData(event){
    event.preventDefault();
    const formValues = {
      "class"         : this.refs.propertyClass.value,
      "earnings"       : this.refs.earning.value,
      }
      
      console.log("formValues ", formValues);
    if(this.refs.propertyClass.value!="" && this.refs.earning.value!="" )
    {
       axios.post('/api/mastersellometers/', formValues)
        .then( (res)=>{
          if(res){
            if(res.data === "Master-Sell-O-Meter-Added"){
              swal("Property Class added successfully", "", "success");
            }else{
              swal("This Property Class has already been added.", "", "warning");
              this.refs.propertyClass.value = '';  
              this.setState({
                earning : "",
              });
            }
            

             axios
              .get('/api/mastersellometers/list')
              .then(
                (res)=>{
                  console.log('res', res);
                  const postsdata = res.data;
                  console.log('postsdata',postsdata);
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
                      
             
                })
              } 
        }).catch((error)=>{
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
    
       return(
       			<div>
					<form id="addroles" className="paddingLeftz noLRPad " >
						
               <div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-8">
                    <div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-8">
      							<label>Property Class <span className="astrick">*</span> </label>

                    <select className="stateselection col-lg-6 col-md-6 col-xs-12 col-sm-8 form-control" title="Please select class" id="propertyClass" ref="propertyClass" name="propertyClass" onChange={this.handleChange} required>
                       <option value="">-Select-</option>
                       <option value="A"> A </option>
                       <option value="B"> B </option>
                       <option value="C"> C </option>
                       <option value="D"> D </option>
                       <option value="E"> E </option>
                      {/* <option value="F"> F </option>*/}
                    </select>
                
      						</div>

                   <div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-8">
                        <label>Earning %  <span className="astrick">*</span></label>
                        {/*<input type="number" placeholder="Enter Earning %" className="rolesField form-control  inputText " value={this.state.earning} ref="earning"  name="earning" id="earning" onChange={this.handleChange}/>*/}
                      <select className="rolesField inputText col-lg-6 col-md-6 col-xs-12 col-sm-8 form-control" title="Please select Earning Rate" id="earning" ref="earning" name="earning" value={this.state.earning} onChange={this.handleChange} required>
                       <option value="">-Select-</option>
                       <option value="10"> 10 </option>
                       <option value="20"> 20 </option>
                       <option value="30"> 30 </option>
                       <option value="40"> 40 </option>
                       <option value="50"> 50 </option>
                      {/* <option value="F"> F </option>*/}
                    </select>
                   </div>


                </div>

              <div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-8">
                   {/*<div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-8">
                        <label>Property Index </label>
                        <input type="text" placeholder="index" className="rolesField form-control  inputText tmsUserAccForm" value={this.state.index} ref="index"  name="index" id="index" onChange={this.handleChange}/>
                   </div>*/}
                  <div className="form-group mar30 col-lg-12 col-md-6 col-xs-12 col-sm-8">
                     <button onClick={this.createData.bind(this)} className="btn btn-primary pull-right">&nbsp; &nbsp;Submit&nbsp; &nbsp;</button>
                  </div>          
					    </div>

					</form>
				</div>
								

	    );
	} 

}