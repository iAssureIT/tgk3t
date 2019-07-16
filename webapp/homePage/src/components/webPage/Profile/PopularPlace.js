import React, { Component }   from 'react';

import "./PopularPlace.css";

class PopularPlaces extends Component{
  
  constructor(props){
    super(props);
   
    this.state = {
    
    }
  }
  componentWillReceiveProps(nextProps){
   
  }
  componentDidMount() {
   
  }

  render() {
     
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="formWrapper"> 
             <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 " >
              <div className="row">
                <div className="headText col-lg-12 col-md-12 col-sm-12 col-xs-12 ">Properties In Most Popular Places</div>
                   <div className="col-lg-6 col-lg-offset-5 col-md-8 col-sm-8 col-xs-8 mlDotp">
                      <span className="dotDiv"> </span><span className="mainDiv"></span><span className="dotDivRight"> </span>
                    </div>
                  <div className="col-lg-12 col-md-8 col-sm-8 col-xs-8 ">
                  </div>
                  <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 mt40 ">
                  </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 imgContainer pune Sm">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 transDiv"> <h4>Pune</h4><h4>30 Properties</h4></div>
                      </div>
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 ">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainer mumbai marginRight pull-right Bg">
                         <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 transDiv"><h4>Mumbai</h4> <h4>30 Properties</h4></div>
                      </div> 
                    </div>
                    </div>
                  </div>
                  </div>
                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mT30" >
                  <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 minusLeftM">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  imgContainer aurangabad Bg">
                       <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 transDiv"><h4>Aurangabad</h4><h4>30 Properties</h4></div>
                        </div> 
                      </div>
                    </div>
                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainer nashik marginRight pull-right Sm">
                            <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 transDiv"><h4>Nashik</h4> <h4>430 Properties</h4></div>
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
    );
  }
}
export default PopularPlaces