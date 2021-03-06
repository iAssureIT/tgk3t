import React, { Component }             from 'react';
import { Link }                         from 'react-router-dom';
import { Route , Redirect, withRouter}  from 'react-router-dom';
import axios                            from 'axios';
import $                                from "jquery";
import swal                             from 'sweetalert';
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

 /*   $("#place1").addClass("mT30");*/

      axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");

             axios
              .get('/api/properties/get/locationWiseListCount/')
              .then( (res) =>{
                // console.log("here polular result",res);
                if(res.status === 200){
                  // console.log("data=>",res.data);
                  this.setState({
                      subAreaList:res.data,
                  })
                 
                }
              })
              .catch((error)=>{
                                console.log("error = ",error);
                                if(error.message === "Request failed with status code 401")
                                {
                                     swal("Your session is expired! Please login again.","", "error");
                                    localStorage.removeItem("uid");
                                    localStorage.removeItem("token");
                                     this.props.history.push("/");
                                }
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
      <div className="container-fluid noPad">
          <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12" >
              <div className="headText col-lg-12 col-md-12 col-sm-12 col-xs-12 hidden-xs hidden-sm ">Properties In Most Popular Places</div>
              {/*responsive*/}
              <div className="headText1 col-lg-12 col-md-12 col-sm-12 col-xs-12 hidden-lg hidden-md ">Properties In Most Popular Places</div>
               {/*end*/}
                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 imgContainer pune Sm">
                    <div className="">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 transDiv" subAreaName={this.state.subAreaList[0]?this.state.subAreaList[0]._id:null} onClick={this.getSubAreaName.bind(this)}>                     
                        <span>{this.state.subAreaList[0]?this.state.subAreaList[0]._id:null}</span>
                        <span>{this.state.subAreaList[0]?this.state.subAreaList[0].count:null} Properties</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 hidden-xs hidden-sm">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainer mumbai  pull-right Bg">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 transDiv" subAreaName={this.state.subAreaList[1] ? this.state.subAreaList[1]._id : null} onClick={this.getSubAreaName.bind(this)}>
                        <h4>{this.state.subAreaList[1] ? this.state.subAreaList[1]._id:null}</h4>
                        <h4>{this.state.subAreaList[1] ? this.state.subAreaList[1].count:null} Properties</h4>
                      </div>
                    </div>
                 </div>
               {/*responsive img 2*/}
                  <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 noPad hidden-lg hidden-md " id="place1">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainer mumbai1  pull-right Bg">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 transDiv" subAreaName={this.state.subAreaList[1] ? this.state.subAreaList[1]._id : null} onClick={this.getSubAreaName.bind(this)}>
                        <h4>{this.state.subAreaList[1] ? this.state.subAreaList[1]._id:null}</h4>
                        <h4>{this.state.subAreaList[1] ? this.state.subAreaList[1].count:null} Properties</h4>
                      </div>
                    </div>
                 </div> 
                {/*end*/}
                <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 noPad mT30">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  imgContainer aurangabad Bg">
                   <div className="">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 transDiv" subAreaName={this.state.subAreaList[2] ? this.state.subAreaList[2]._id:null} onClick={this.getSubAreaName.bind(this)}>
                        <h4>{this.state.subAreaList[2] ? this.state.subAreaList[2]._id:null}</h4>
                        <h4>{this.state.subAreaList[2] ? this.state.subAreaList[2].count:null} Properties</h4>
                      </div>
                    </div> 
                  </div>
                </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mT30 hidden-xs hidden-sm">
                    <div className="">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainer nashik  pull-right Sm">
                        <div className="">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 transDiv" subAreaName={this.state.subAreaList[3] ? this.state.subAreaList[3]._id:null} onClick={this.getSubAreaName.bind(this)}>
                            <h4>{this.state.subAreaList[3] ? this.state.subAreaList[3]._id : null}</h4>
                            <h4>{this.state.subAreaList[3] ? this.state.subAreaList[3].count :null} Properties</h4>
                          </div>
                        </div> 
                      </div>
                    </div>           
                  </div>
                {/*responsive img 4*/}
                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mT30 noPad hidden-lg hidden-md">
                    <div className="">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainer nashik  pull-right Sm">
                        <div className="">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 transDiv" subAreaName={this.state.subAreaList[3] ? this.state.subAreaList[3]._id:null} onClick={this.getSubAreaName.bind(this)}>
                            <h4>{this.state.subAreaList[3] ? this.state.subAreaList[3]._id : null}</h4>
                            <h4>{this.state.subAreaList[3] ? this.state.subAreaList[3].count :null} Properties</h4>
                          </div>
                        </div> 
                      </div>
                    </div>           
                  </div>
                {/*end*/}
              </div>
      </div>
      :
      null
    );
  }
}
export default withRouter(PopularPlaces);