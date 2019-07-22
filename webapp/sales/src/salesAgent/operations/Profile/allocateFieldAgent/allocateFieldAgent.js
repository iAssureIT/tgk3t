import React, { Component }   from 'react';
import axios                  from 'axios';
import $                      from 'jquery';


import "./allocateFieldAgent.css";





axios.defaults.baseURL = 'http://apitgk3t.iassureit.com/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

class allocateFieldAgent extends Component{
  
  constructor(props){
    super(props);

  }
  componentWillReceiveProps(nextProps){
   
  }
  componentDidMount() {

  }


  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12  ">
              <div className="col-lg-4 col-lg-offset-3 col-md-4 col-xs-4 col-sm-4 allocateFA">
                  <div className="button-4 ">
                    <div className="eff-4 "></div>
                    <a href="#"> Verify & List </a>
                  </div>
              </div>
              <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4 allocateFA"> 
                <div className="button-4 ">
                    <div className="eff-5 "></div>
                    <a href="#" data-toggle="modal" data-target="#myModal"> Allocated To Field Agent </a>
                  </div>
            </div>  
          </div>
        </div>
      </div>
    );
  }
}
export default allocateFieldAgent