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
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 " >
              <div className="headText col-lg-12 col-md-12 col-sm-12 col-xs-12 ">Properties In Most Popular Places</div>
                <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                  <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 ">
                    <div className=" hrLine col-lg-offset-9 col-lg-1 col-md-1 col-sm-1 col-xs-1 "></div>
                  </div>
                </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                  <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 imgContainer Sm">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 transDiv"> <h4>Pune</h4> <br/> <h6>30 Properties</h6></div>
                    </div>
                  </div>
                  <div className="col-lg-9 col-md-8 col-sm-12 col-xs-12 ">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainer marginRight pull-right Bg">
                       <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 transDiv"><h4>Mumbai</h4> <br/> <h6>30 Properties</h6></div>
                    </div> 
                  </div>
                  </div>
                </div>
               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mT30" >
                <div className="col-lg-9 col-md-8 col-sm-12 col-xs-12 minusLeftM">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  imgContainer Bg">
                   <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 transDiv"><h4>Aurangabad</h4> <br/> <h6>30 Properties</h6></div>
                    </div> 
                  </div>
                </div>
                  <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 ">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 imgContainer marginRight pull-right Sm">
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 transDiv"><h4>Nashik</h4> <br/> <h6>30 Properties</h6></div>
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