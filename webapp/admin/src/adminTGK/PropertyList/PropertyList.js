import React, { Component, PropTypes } from 'react';
import {withRouter, Link}              from 'react-router-dom';
import swal                            from 'sweetalert';
import $                               from "jquery";
import axios 						   from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/js/modal.js';

import './propertyList.css'

class PropertyList extends Component {
    

    constructor(props) {
        super(props);
        	this.state = {
                inputData       :[],
                propertyType    :"Residential",
                transactionType :"Sell"
		}
    }

    componentDidMount(){
      axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");
          var formValues = {
            propertyType    : this.state.propertyType,
            transactionType : this.state.transactionType,
            startRange      : 0,
            limitRange      : 100,
            listing:false
          }

         console.log("formValues = ", formValues);
         axios
            .post('/api/properties/admin/post/list',formValues)
            .then(resultData =>{
                console.log("resultData",resultData);
                this.setState({
                    inputData : resultData.data,
                })
            })
            .catch((error)=>{
                console.log("error = ",error);
                if(error.message === "Request failed with status code 401")
                {
                     swal("Your session is expired! Please login again.","", "error");
                     this.props.history.push("/login");
                }
            });             

        $(".dropdown").hover(            
        function() {
            $('.dropdown-menu', this).stop( true, true ).fadeIn("fast");
            $(this).toggleClass('open');
            $('b', this).toggleClass("caret caret-up");                
        },
        function() {
            $('.dropdown-menu', this).stop( true, true ).fadeOut("fast");
            $(this).toggleClass('open');
            $('b', this).toggleClass("caret caret-up");                
        });
    }


    handlePropertyType(event)
    {
        console.log("event.target.value",event.target.value);
        this.setState({
            propertyType:event.target.value
        },()=>{
           var formValues = {
            propertyType : this.state.propertyType,
            transactionType : this.state.transactionType,
            startRange:0,
            limitRange:100,
            listing:false
        }
            console.log("formValues",formValues)

          axios
            .post('/api/properties/admin/post/list',formValues)
            .then(resultData =>{
                console.log("resultData",resultData);
                this.setState({
                    inputData : resultData.data,
                })
            })
            .catch((error)=>{
                console.log("error = ",error);
                if(error.message === "Request failed with status code 401")
                {
                     swal("Your session is expired! Please login again.","", "error");
                     this.props.history.push("/login");
                }
            });             

        }) 
         
    }
     handleTransactionType(event)
    {
        this.setState({
            transactionType:event.target.value
        },()=>{
           var formValues = {
            propertyType    : this.state.propertyType,
            transactionType : this.state.transactionType,
            startRange      :0,
            limitRange      :100,
            listing:false
        }
            console.log("formValues",formValues)
          axios
            .post('/api/properties/admin/post/list',formValues)
            .then(resultData =>{
                console.log("resultData",resultData);
                this.setState({
                    inputData : resultData.data,
                })
            })
            .catch((error)=>{
                console.log("error = ",error);
                if(error.message === "Request failed with status code 401")
                {
                     swal("Your session is expired! Please login again.","", "error");
                     this.props.history.push("/login");
                }
            });             

        })    
    }

    convertNumberToRupees(totalPrice) 
      {
        return Math.abs(Number(totalPrice)) >= 1.0e+7

        ? Math.abs(Number(totalPrice)) / 1.0e+7 + " Cr"

        : Math.abs(Number(totalPrice)) >= 1.0e+5

        ? Math.abs(Number(totalPrice)) / 1.0e+5 + " Lac"

        : Math.abs(Number(totalPrice)) >= 1.0e+3

        ? Math.abs(Number(totalPrice)) / 1.0e+3 + " K"

        : Math.abs(Number(totalPrice));
    }

    deleteProperty(event)
    {
        event.preventDefault();
        var id=event.currentTarget.id;
        var formValues = {
            propertyType    : this.state.propertyType,
            transactionType : this.state.transactionType,
            startRange      :0,
            limitRange      :100,
            listing:false

        }
         swal({
          title: "Are you sure?",
          text: "You will not be able to recover this record!",
          icon: "warning",
          className: "confirmSwal",
          buttons: [
            'No, cancel it!',
            'Yes, I am sure!'
          ],
          dangerMode: true,
        })
        .then(isConfirm =>{
          if(isConfirm) {
            axios
            .delete('/api/properties/'+id)
            .then(res =>{
                 if(res){
                    axios
                    .post('/api/properties/admin/post/list',formValues)
                    .then(resultData =>{
                        console.log("resultData",resultData);
                        if(resultData.data){
                            this.setState({
                                inputData : resultData.data,
                            });
                            swal({
                              title: 'Deleted!',
                              text: 'Property successfully deleted!',
                              icon: 'success'
                            }) 
                        }
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
                swal("Cancelled", "Record is safe!", "error");
          }
        })
    }

    listed(event){
        var listedData = {
            property_id:event.target.id,
            listing:true
        }
        var formValues = {
            propertyType    : this.state.propertyType,
            transactionType : this.state.transactionType,
            startRange      :0,
            limitRange      :100,
            listing         :false,
            status          : "Listed"
        }
          console.log("listedData",listedData)
          console.log("formValues",formValues)
        swal({
          title: "Are you sure?",
          text: "You want to list this property!",
          icon: "warning",
          className: "confirmSwal",
          buttons: [
            'No, cancel it!',
            'Yes, I am sure!'
          ],
          dangerMode: true,
        })
        .then(isConfirm =>{
          if(isConfirm) {  

                  axios
                    .patch('/api/properties/patch/updateListing',listedData)
                    .then(resultData =>{
                        axios
                            .post('/api/properties/admin/post/list',formValues)
                            .then(resultData =>{
                                console.log("resultData",resultData);
                                if(resultData.data){
                                    this.setState({
                                        inputData : resultData.data,
                                    });
                                    swal({
                                      title: 'Listed!',
                                      text: 'Property listed successfully!',
                                      icon: 'success'
                                    }) 
                                }
                            })
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
                swal("Cancelled", "Property not listed!", "error");
          }
        })    
    }

    render() {
        return (
        	<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 noPad">
                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 text-center noPad">
                    <h2>List of Properties</h2>
                </div>
                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 dropHeader noPad">
                    <div className="col-lg-6 col-lg-offset-3 col-md-12 col-xs-12 col-sm-12 pDrop">
                	   <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12">
                            <div className="dropdown col-lg-12 col-md-12 col-xs-12 col-sm-12 noPad">
                                <button className="btn dropdown-toggle pLabel bg-primary" type="button" data-toggle="dropdown">Property Type
                                    <b className="caret pull-right"></b>
                                </button>
                                <ul className="dropdown-menu">
                                    <span className="col-lg-12 inputStyledbtn"><input type="radio" name="propertyType" id="Residential" className="" value="Residential" onChange={this.handlePropertyType.bind(this)} defaultChecked/>&nbsp; <label htmlFor="Residential">Residential</label><br /><span className="radioBoxBlock"></span></span>
                                    <span className="col-lg-12 inputStyledbtn"><input type="radio" name="propertyType" id="Commercial" className="" value="Commercial" onChange={this.handlePropertyType.bind(this)} />&nbsp; <label htmlFor="Commercial">Commercial</label><br /><span className="radioBoxBlock"></span></span>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12">
                            <div className="dropdown col-lg-12 col-md-12 col-xs-12 col-sm-12 noPad">
                                <button className="btn dropdown-toggle pLabel bg-primary" type="button" data-toggle="dropdown">Transaction Type
                                    <b className="caret pull-right"></b>
                                </button>
                                <ul className="dropdown-menu">
                                    <span className="col-lg-12 inputStyledbtn"><input type="radio" name="transactionType" id="Sell" className="" value="Sell" onChange={this.handleTransactionType.bind(this)} defaultChecked/>&nbsp; <label htmlFor="Sell">Sell</label><br /><span className="radioBoxBlock"></span></span>
                                    <span className="col-lg-12 inputStyledbtn"><input type="radio" name="transactionType" id="Rent" className="" value="Rent" onChange={this.handleTransactionType.bind(this)} />&nbsp; <label htmlFor="Rent">Rent</label><br /><span className="radioBoxBlock"></span></span>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 noPad listPadding">
                     {this.state.inputData && this.state.inputData.length >0 ?
                        this.state.inputData.map((result,index)=>{
                        return(
                            <div key={index} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 propertyBox">           
                                <div className="row pull-right topRightTriangle" id="triangle-topright"> 
                                </div>  
                                <div className="row">
                                    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 noPad">
                                    {
                                        result && result.gallery && result.gallery.Images && result.gallery.Images.length > 0 ?
                                        <img alt=""  className="propertyImgDiv" src={result.gallery.Images[0].imgPath} />
                                        :
                                        <img alt=""  className="propertyImgDiv" src="/images/loading_img.jpg" />
                                    }                                                           
                                </div>
                                <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 noPad">               
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 myPropertiesInternal">              
                                        <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 propertySubText1">                
                                            <i className="fa fa-inr"></i>&nbsp;
                                            <span>
                                                {result && result.financial && result.transactionType == "Sell" ?
                                                    result.financial && result.financial.totalPrice? this.convertNumberToRupees(result.financial.totalPrice) : "-"
                                                :
                                                    result.financial && result.financial.monthlyRent ? this.convertNumberToRupees(result.financial.monthlyRent) : "-"
                                                }
                                            </span>
                                        </div>

                                            <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 propertySubText1">                
                                                {
                                                    result.propertyType === "Residential" ? 
                                                         <span>
                                                         {result.propertyDetails && result.propertyDetails.bedrooms ? result.propertyDetails.bedrooms : "-"} BHK  &nbsp;&nbsp;
                                                         </span>
                                                    :
                                                    null
                                                }
                                                <i className="fa fa-map-marker text-warning"/>
                                                &nbsp;
                                                {result.propertyLocation  &&  result.propertyLocation.city && result.propertyLocation.society
                                                    ? 
                                                    result.propertyLocation.society +", "+result.propertyLocation.subArea +", "+result.propertyLocation.city 
                                                    :
                                                     "-"
                                                }
                                            </div>
                                        
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 noPad pull-right">      
                                                {result.transactionType && result.transactionType === "Sell" ?
                                                    <span className="pull-right text-right col-lg-8  noPad transactionLabel">Sale</span>
                                                    :
                                                    result.transactionType ==="Rent" ?
                                                    <span className="pull-right text-right col-lg-8 noPad transactionLabel">{result.transactionType}</span>
                                                    :
                                                    null
                                                
                                                }
                                            </div>  
                                            

                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 myPropertiesInternal">              
                                            <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 ">                
                                            {
                                                result.propertyType ==="Residential" ?
                                                <span className="propertySubText1">
                                                <img alt=""  src="/images/Icons/bed.png" className="imgIcon"/>&nbsp;
                                                    {result.propertyDetails && result.propertyDetails.bedrooms }
                                                    <br/><p style={{fontWeight:"100"}}>Bedrooms</p>
                                                </span>
                                                :
                                                <span className="propertySubText1">
                                                <img alt=""  src="/images/Icons/bath.png" className="imgIcon"/>&nbsp;
                                                {result.propertyDetails && result.propertyDetails.washrooms}
                                                <br/><p style={{fontWeight:"100"}}>Washrooms</p>
                                                </span>
                                            }
                                            </div>
                                            <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 ">                
                                                {
                                                    result.propertyType ==="Residential" ?
                                                    <span className="propertySubText1">
                                                    <img alt=""  src="/images/Icons/bath.png" className="imgIcon"/>&nbsp;
                                                        {result.propertyDetails && result.propertyDetails.bathrooms }
                                                        <br/><p style={{fontWeight:"100"}}>Bathrooms</p>
                                                    </span>
                                                    :
                                                    <span className="propertySubText1">
                                                    <img alt=""  src="/images/Icons/coffee.png" className="imgIcon" style={{width:"27px"}}/>&nbsp;
                                                    {result.propertyDetails && result.propertyDetails.pantry}
                                                    <br/><p style={{fontWeight:"100"}}>Pantry</p>
                                                    </span>
                                                }
                                            </div>
                                            <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 ">                
                                                <img alt=""  src="/images/Icons/floor.png" className="imgIcon"/>&nbsp;
                                                <span className="propertySubText1">{result.propertyDetails.floor? result.propertyDetails.floor :"-"}  /  {result.propertyDetails.floor? result.propertyDetails.totalFloor :"-"}</span><br/>Floor / Total Floor
                                            </div>
                                            <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 ">                
                                                <img alt=""  src="/images/Icons/face.png" className="imgIcon"/>&nbsp;
                                                <span className="propertySubText1">{result.propertyDetails? result.propertyDetails.facing :"-"}</span><br/>Facing
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 myPropertiesInternal mt20">             
                                            <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 ">                
                                                Super Area : <b>{result.propertyDetails ? result.propertyDetails.superArea : "-"}&nbsp;Sqft</b>
                                            </div>
                                            <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 noPad ">                
                                                Possession by : <span className="propertySubText2">{result.financial ? result.financial.availableFrom : "-"}</span>
                                            </div>
                                            <div className="col-lg-2 col-md-4 col-sm-12 col-xs-12">              
                                                <Link to={"/PropertyProfile/"+result._id} target="_blank">
                                                    <button className="btn pull-right btnDetails">Details &nbsp;<img alt=""  className="btnImg" src="/images/TGK-key.png"/></button>
                                                </Link>
                                            </div>
                                                <div className="col-lg-2 col-md-4 col-sm-12 col-xs-12">              
                                                    <button className="btn bg-red pull-right" id={result._id} onClick={this.listed.bind(this)}>Approve & List</button>
                                            </div>
                                            <div className="col-lg-2 col-md-4 col-sm-12 col-xs-12">              
                                                <button className="btn bgDelete pull-right" id={result._id} onClick={this.deleteProperty.bind(this)}><i className="fa fa-trash"></i> Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )   
                        })
                        :
                        <div className="boxmsg col-lg-8 col-lg-offset-2">
                            <p> 
                                Properties for this search options could not be found. <br/> 
                                Please change the search filters and try again. 
                            </p>
                        </div>
                    }
                </div>    
        	</div>
        );
    }
}

export default PropertyList;
