  
import React , { Component }  from 'react';


// import 'bootstrap/js/tab.js';
import "bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap/js/modal.js';
import './Footer.css';
/*var formValues=[];*/
export default class Footer extends Component {

  render() {
    return (

      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mainHeader">
        <div className="col-lg-5 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 listContainer ">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                <ul className="menuBar">
                  <li>Features</li>
                  <li>Video</li>
                  <li>Nearby</li>
                  <li>Location</li>
                  <li>Contact</li>
                </ul>
            </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 copyRight  ">
          @ 2019 WP Pro Real Estate 7 Preminum WordPress Theme,All Rights Reserved <a href="#">Back to Top</a>
        </div>
      </div>
    
    );
  }
}

















  