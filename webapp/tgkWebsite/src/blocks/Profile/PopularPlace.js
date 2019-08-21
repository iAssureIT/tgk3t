import React, { Component }   from 'react';
import { Link }       from 'react-router-dom';
import { Route , Redirect, withRouter}  from 'react-router-dom';
import axios                  from 'axios';
import $                      from "jquery";

import "./PopularPlace.css";

class PopularPlaces extends Component{
  
  constructor(props){
    super(props);
   
    this.state = {
      subAreaList : []
    }
  }
  componentWillReceiveProps(nextProps){
   
  }
  componentDidMount() {

             axios
              .get('/api/properties/get/locationWiseListCount/')
              .then( (res) =>{
                if(res.status === 200){
                  console.log("data=>",res.data);
                  this.setState({
                      subAreaList:res.data,
                  })
                 
                }
              })
              .catch((error) =>{
                console.log("error = ", error);
              });
  }

  getSubAreaName(event){
    event.preventDefault();
    if($(event.target).attr('subAreaName'))
    {
        const formValues = {
        transactionType : "",
        location        : $(event.target).attr('subAreaName'),
        budget          : 0,
        propertyType    : "",
        propertySubType : [],
        floor           : "",
        furnishedStatus : "",
        flatType        : "",
        propertyAge     : "",
        availability    : "",

      }
      var searchData = JSON.stringify(formValues);
      console.log("searchData",formValues);
      localStorage.setItem("searchData",searchData);
      this.props.history.push("/SearchResults");
    }

  }

  render() {
    return (
      this.state.subAreaList.length > 0 ?
      <div className="container-fluid">
        <div className="row">
          <div className="formWrapper"> 
             <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 noPad" >
              <div className="row">
                   <div className="col-lg-6 col-lg-offset-5 col-md-8 col-sm-8 col-xs-8 mlDotp">
                      <span className="dotDiv"> </span><span className="mainDiv"></span><span className="dotDivRight"> </span>
                    </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad">
                  <div className="row">
                    <div className="headText col-lg-12 col-md-12 col-sm-12 col-xs-12 ">Properties In Most Popular Places</div>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 imgContainer pune Sm">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 transDiv" subAreaName={this.state.subAreaList[0]._id} onClick={this.getSubAreaName.bind(this)}>                     
                          <h4>{this.state.subAreaList[0]._id}</h4>
                          <h4>{this.state.subAreaList[0].count} Properties</h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 ">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainer mumbai marginRight pull-right Bg">
                         <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 transDiv" subAreaName={this.state.subAreaList[1]._id} onClick={this.getSubAreaName.bind(this)}>
                          <h4>{this.state.subAreaList[1]._id}</h4>
                          <h4>{this.state.subAreaList[1].count} Properties</h4>
                        </div>
                      </div> 
                    </div>
                    </div>
                  </div>
                  </div>
                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mT30 noPad">
                  <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 minusLeftM">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  imgContainer aurangabad Bg">
                       <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 transDiv" subAreaName={this.state.subAreaList[2]._id} onClick={this.getSubAreaName.bind(this)}>
                            <h4>{this.state.subAreaList[2]._id}</h4>
                            <h4>{this.state.subAreaList[2].count} Properties</h4>
                          </div>
                        </div> 
                      </div>
                    </div>
                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainer nashik marginRight pull-right Sm">
                            <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 transDiv" subAreaName={this.state.subAreaList[3]._id} onClick={this.getSubAreaName.bind(this)}>
                                <h4>{this.state.subAreaList[3]._id}</h4>
                                <h4>{this.state.subAreaList[3].count} Properties</h4>
                              </div>
                            </div> 
                          </div>
                        </div>           
                      </div>
                    </div>
                  </div>
                 </div> 
              </div>
            </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 hrLineD"></div>
        </div>
      </div>
      :
      null
    );
  }
}
export default withRouter(PopularPlaces);