import React, { Component } from 'react';
import { Link}              from 'react-router-dom';
import { Redirect }         from 'react-router';
import swal                 from 'sweetalert';
import $                    from "jquery";
import WebSignupForm        from '../../components/WebSignup/WebSignupForm.js';
import LoginMobNum          from '../../components/LoginMobNum/LoginMobNum.js';

import LoginOtp from '../../components/LoginOtp/LoginOtp.js';
import Form1 from '../../components/Form1/Form1.js';
import Form2 from '../../components/Form2/Form2.js';
import Form3 from '../../components/Form3/Form3.js';
import Form4 from '../../components/Form4/Form4.js';
import Form5 from '../../components/Form5/Form5.js';
import Form6 from '../../components/Form6/Form6.js';
import WebSignupFlow from '../../components/WebSignup/WebSignupFlow.js';
import CongratsPage from '../../components/CongratsPage/CongratsPage.js';
import TransactionPage from '../../components/TransactionPage/TransactionPage.js';
import Location from '../../components/Location/Location.js';

import {browserHistory} from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';
import './ModalBackground.css';
/*import Form1 from '../../components/Form1/Form1.js';*/

export default class ModalBackground extends Component {
  constructor(props) {
   super(props);
    this.state = {}
  }
   
  componentDidMount(){
          $("#xyz").show();
          $("#xyz").addClass('in');
  }

  render(){
    var windowWidth = $(window).width();
    // console.log('ww',windowWidth);
      if(windowWidth>=320&&windowWidth<=992){
        var backImage = "visible-xs col-xs-12 visible-sm col-sm-12 noBackImage"
        }else{
        var backImage = "backImageModal hidden-xs hidden-sm"
      }


    var winHeight = window.innerHeight;
    var divHeight = 760 +'px';
    
    return(

     <div className={backImage} style={{"height": winHeight}}> 
        {/*  <LoginMobNum /> 
          */} 
    
      <LoginMobNum />

    </div>
    );
  }
}
