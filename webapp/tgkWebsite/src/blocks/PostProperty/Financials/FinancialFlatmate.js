// import React , { Component }  from 'react';
// import axios                  from 'axios';
// import { withRouter}          from 'react-router-dom';
// import { connect }            from 'react-redux';
// import swal                   from 'sweetalert';
// import $                      from 'jquery';
// import DatePicker             from "react-datepicker";

// import './Financials.css';
// import "react-datepicker/dist/react-datepicker.css";


// class Financials extends Component{

//   constructor(props){
//     super(props);
//       this.state = {
//       // includecharges  : [],
//       originalValues  : '',
//       monthlyRent     : '',
//       depositAmount   : '',
//       expectedRate    : '',
//       totalPrice      : '',
//       updateOperation : false,
//       includeCharges    : [
//                           {name:"Car Park",checked: false},
//                           {name:"One Time Maintenance",checked: false},
//                           {name:"Stamp Duty",checked: false},
//                           {name:"Club House",checked: false},
//                         ],
//       prevCharges     : "",
//       prevShareExp     : "",
//       maintenancePer  : "Month",
//       maintenanceCharges : "0",
//       availableFrom: "",
//       // startDate : new Date(),
//       startDate : "",
//       measurementUnit : "Sq Ft",
//       sharedExpenses    : [
//                           {name:"Internet/Broadband",checked: false},
//                           {name:"Wifi",checked: false},
//                           {name:"TV DTH,",checked: false},
//                           {name:"Electricity",checked: false},
//                           {name:"Maintenance",checked: false},
//                           {name:"Maid Charges",checked: false},
//                           {name:"Cook",checked: false},
//                           {name:"Common Ration (Grocery/Dairy etc)",checked: false},
//                         ],
//       leaseDuration     : "",
//       noticePeriod      : ""
//       };

//       // console.log("this.props.updateStatus",this.props.updateStatus);
//       // console.log("this.props.property_id",this.props.property_id);
//       if(this.props.updateStatus === true){

//            axios
//           .get('/api/properties/'+this.props.property_id)
//           .then( (response) =>{
//            // console.log("response.data.financial.maintenancePer ",response.data.financial.expectedRate);

//             var availableFrom = new Date();
//             if(response.data.financial.availableFrom!=="" & response.data.financial.availableFrom!==null && response.data.financial.availableFrom!==undefined){
//               var date = response.data.financial.availableFrom.split("-")
//               console.log('date',date);
//                 availableFrom = new Date(date[2], date[1] - 1, date[0])
//             }
//            this.setState({
//                originalValues     : response.data.financial,
//                expectedRate       : response.data.financial.expectedRate,
//                totalPrice         : response.data.financial.totalPrice,
//                monthlyRent        : response.data.financial.monthlyRent,
//                depositAmount      : response.data.financial.depositAmount,
//                prevCharges        : response.data.financial.includeCharges,
//                prevShareExp       : response.data.financial.sharedExpenses,
//                updateOperation    : true,
//                startDate          : availableFrom,
//                description        : response.data.financial.description,
//                maintenanceCharges : response.data.financial.maintenanceCharges,
//                maintenancePer     : response.data.financial.maintenancePer ? response.data.financial.maintenancePer : "Month",
//                measurementUnit    : response.data.financial.measurementUnit ,
//                leaseDuration      : response.data.financial.leaseDuration ,
//                noticePeriod       : response.data.financial.noticePeriod ,
//                availableFrom      : response.data.financial.availableFrom,
//            },()=>{
//                     });
//                     //========1===========//
//                     var includeCharges = this.state.includeCharges;
//                     console.log("here includeCharges", includeCharges);
//                     var includeChargesList = includeCharges.map((item,index)=>{
//                       var propPresent = this.state.prevCharges.find((obj)=>{
//                         return item.name === obj
//                       })
//                       console.log("here propPresent ", propPresent);
//                       var newObj = Object.assign({},item);
//                       if(propPresent){
//                         newObj.checked = true
//                       }else{
//                         newObj.checked = false
//                       }
//                       return newObj;

//                    })

//                     this.setState({
//                       includeCharges : includeChargesList,
//                     },()=>{
//                       console.log("here includeCharges in didmount after match result",this.state.includeCharges);

//                     });
//                     //

//                     //====2=====//
//                     var sharedExpenses = this.state.sharedExpenses;
//                     console.log("here sharedExpenses", sharedExpenses);
//                     var sharedExpensesList = sharedExpenses.map((item,index)=>{
//                       var sharePropPresent = this.state.prevShareExp.find((obj)=>{
//                         return item.name === obj
//                       })
//                       console.log("here sharePropPresent ", sharePropPresent);
//                       var newObj = Object.assign({},item);
//                       if(sharePropPresent){
//                         newObj.checked = true
//                       }else{
//                         newObj.checked = false
//                       }
//                       return newObj;

//                    })

//                     this.setState({
//                       sharedExpenses : sharedExpensesList,
//                     },()=>{
//                       console.log("here sharedExpenses in didmount after match result",this.state.includeCharges);

//                     });
//                     //
//            // this.refs.availableFrom.value = response.data.financial.availableFrom ;
//            // this.refs.description.value   = response.data.financial.description ;
//            // this.refs.maintenanceCharges.value = response.data.financial.maintenanceCharges;
//            // this.refs.maintenancePer.value = response.data.financial.maintenancePer;
//           })
//           .catch((error)=>{
//                           console.log("error = ",error);
//                           if(error.message === "Request failed with status code 401")
//                           {
//                                swal("Your session is expired! Please login again.","", "error");
// localStorage.removeItem("uid");
// localStorage.removeItem("token");
//                                this.props.history.push("/");
//                           }
//                       })
//           }
// }
// componentDidMount(){

// $('#totalAsk').keyup(function(event) {
//   // skip for arrow keys
//   if(event.which >= 37 && event.which <= 40) return;
//   // format number
//   $(this).val(function(index, value) {
//     return value
//     .replace(/\D/g, "")
//     .replace(/\B(?=(\d{3})+(?!\d))/g,",")
//     ;
//   });
// });

// $('#expRate').keyup(function(event) {
//   // skip for arrow keys
//   if(event.which >= 37 && event.which <= 40) return;
//   // format number
//   $(this).val(function(index, value) {
//     return value
//     .replace(/\D/g, "")
//     .replace(/\B(?=(\d{3})+(?!\d))/g,",")
//     ;
//   });
// });

// $('#monthlyRent').keyup(function(event) {
//   // skip for arrow keys
//   if(event.which >= 37 && event.which <= 40) return;
//   // format number
//   $(this).val(function(index, value) {
//     return value
//     .replace(/\D/g, "")
//     .replace(/\B(?=(\d{3})+(?!\d))/g,",")
//     ;
//   });
// });

// $('#depositAmount').keyup(function(event) {
//   // skip for arrow keys
//   if(event.which >= 37 && event.which <= 40) return;
//   // format number
//   $(this).val(function(index, value) {
//     return value
//     .replace(/\D/g, "")
//     .replace(/\B(?=(\d{3})+(?!\d))/g,",")
//     ;
//   });
// });

// $('#maintenanceCharges').keyup(function(event) {
//   // skip for arrow keys
//   if(event.which >= 37 && event.which <= 40) return;
//   // format number
//   $(this).val(function(index, value) {
//     return value
//     .replace(/\D/g, "")
//     .replace(/\B(?=(\d{3})+(?!\d))/g,",")
//     ;
//   });
// });

// // var today = new Date().toISOString().split('T')[0];
// //     document.getElementsByName("availableFrom")[0].setAttribute('min', today);
// }

// updateUser(event){
//   event.preventDefault();
//   // console.log("this.state.expectedRate",this.state.expectedRate);
   
//   // console.log("Financials req = ",formValues);
//   console.log("updateOperation",this.state.updateOperation);

//   if( this.state.totalPrice!="" || this.state.monthlyRent!="" ){

//     if(this.state.updateOperation!=true)
//     {
//       //==========1==========//
//         var includeChargesData = this.state.includeCharges;
//         var includeChargesDataList =[];     
//             includeChargesData.map((item,index)=>{
//               if(item.checked == true)
//               {
//                 includeChargesDataList.push(item.name);
//               }
//             })

//             // console.log("includeChargesDataList true",includeChargesDataList);
//             // console.log("this.state.availableFrom",this.state.availableFrom);

//             // console.log("maintenanceCharges",this.state.maintenanceCharges);
//       //==============//

//       //=================2=================//
//         var sharedExpensesData = this.state.sharedExpenses;
//         var sharedExpensesDataList =[];     
//             sharedExpensesData.map((item,index)=>{
//               if(item.checked == true)
//               {
//                 sharedExpensesDataList.push(item.name);
//               }
//             })
//       //==================================//
//         const formValues = {
//         "expectedRate"        : this.state.expectedRate.replace(/,/g, ''),
//         "totalPrice"          : this.state.totalPrice.replace(/,/g, ''),
//         "monthlyRent"         : this.state.monthlyRent.replace(/,/g, ''),
//         "depositAmount"       : this.state.depositAmount.replace(/,/g, ''),
//         "availableFrom"       : this.state.availableFrom,
//         "description"         : this.state.description,
//         "includeCharges"      : includeChargesDataList,
//         "sharedExpenses"      : sharedExpensesDataList,
//         "maintenanceCharges"  : this.state.maintenanceCharges.replace(/,/g, ''),
//         "maintenancePer"      : this.state.maintenancePer,
//         "measurementUnit"     : this.state.measurementUnit,  
//         "leaseDuration"       : this.state.leaseDuration,  
//         "noticePeriod"        : this.state.noticePeriod,  
//         "property_id"         : localStorage.getItem("propertyId"),
//         "uid"                 : localStorage.getItem("uid"),

//         };

//         console.log("Financials formValues",formValues);
//          axios
//         .patch('/api/properties/patch/financials',formValues)
//         .then( (res) =>{
//           console.log("Financials res = ",res);
//           if(res.status === 200){
//           this.props.redirectToAvailability(this.props.uid,this.props.property_id);
//           }
//         })
//        .catch((error)=>{
//                           console.log("error = ",error);
//                           if(error.message === "Request failed with status code 401")
//                           {
//                                swal("Your session is expired! Please login again.","", "error");
// localStorage.removeItem("uid");
// localStorage.removeItem("token");
//                                this.props.history.push("/");
//                           }
//                       })
//       }else{
//         console.log("update fun");
//         var ov = this.state.originalValues;
//         //========1==============//
//         var includeChargesData = this.state.includeCharges;
//         var includeChargesDataList =[];     
//             includeChargesData.map((item,index)=>{
//               if(item.checked == true)
//               {
//                 includeChargesDataList.push(item.name);
//               }
//             })

//             // console.log("includeChargesDataList true",includeChargesDataList);
//             // console.log("here result amenity",ov.includeCharges);
//         //======================//

//         //===========2===========//
//           var sharedExpensesData = this.state.sharedExpenses;
//           var sharedExpensesDataList =[];     
//             sharedExpensesData.map((item,index)=>{
//               if(item.checked == true)
//               {
//                 sharedExpensesDataList.push(item.name);
//               }
//             })
//         //======================//


//             // compare chcekbox data
//             //===============1=============//
//             var eq =true;
//             if(includeChargesDataList.length != ov.includeCharges.length )
//             {
//               eq = false;
//                console.log("equal not",eq);
//             }else{
              
//               for (var i = 0; i < includeChargesDataList.length; i++)
//               { 
//                       if (includeChargesDataList[i] != ov.includeCharges[i]){
//                   eq = false;
//                       }else{
//                   eq = true;  
//                       }
//                  }
//                   console.log("equal yes but same",eq); 
//             }
//             console.log("outside eq",eq);
//             //============================//

//             //=============2===============//
//                var eq =true;
//             if(sharedExpensesDataList.length != ov.sharedExpenses.length )
//             {
//               eq = false;
//                console.log("equal not",eq);
//             }else{
              
//               for (var i = 0; i < sharedExpensesDataList.length; i++)
//               { 
//                       if (sharedExpensesDataList[i] != ov.sharedExpenses[i]){
//                   eq = false;
//                       }else{
//                   eq = true;  
//                       }
//                  }
//                   console.log("equal yes but same",eq); 
//             }
//             console.log("outside eq",eq);
//             //============================//


//             if(eq === true && this.state.expectedRate === ov.expectedRate && this.state.totalPrice === ov.totalPrice &&
//               this.state.monthlyRent === ov.monthlyRent && this.state.depositAmount === ov.depositAmount && 
//               this.state.availableFrom === ov.availableFrom && this.state.description === ov.description &&
//                this.state.maintenanceCharges === ov.maintenanceCharges &&  this.state.maintenancePer === ov.maintenancePer)
//             {
//               console.log("same data");
//               this.props.redirectToAvailability(this.props.uid,this.props.property_id);

//             }else{
//               console.log("diff data");
//                 // console.log("this.state.expectedRate",this.state.expectedRate);
//                 console.log("this.state.expectedRate",this.state.expectedRate);
//                 var expectedRate        = "";
//                 var totalPrice          = "";
//                 var monthlyRent         = "";
//                 var depositAmount       = "";
//                 var maintenanceCharges  = "";

//                 if(this.state.totalPrice && this.state.totalPrice!="" && this.state.totalPrice!==null)
//                 {
//                   if(this.state.totalPrice!==ov.totalPrice &&this.state.totalPrice.indexOf(',') !== -1){
//                    totalPrice = this.state.totalPrice.replace(/,/g, '');
//                   }else{
//                    totalPrice = this.state.totalPrice;
//                   }
//                 }else{
//                    totalPrice = this.state.totalPrice;
//                 }
//                 // --------------
//                 if(this.state.expectedRate && this.state.expectedRate!="" && this.state.expectedRate!==null ){
//                   if(this.state.expectedRate!== ov.expectedRate && this.state.expectedRate.indexOf(',')!== -1){
//                    expectedRate = this.state.expectedRate.replace(/,/g, '');
//                   }else{
//                    expectedRate = this.state.expectedRate;
//                   }
//                 }else{
//                    expectedRate = this.state.expectedRate;
//                 }

//                 // ---------------------
//                 if(this.state.monthlyRent && this.state.monthlyRent!=="" && this.state.monthlyRent!==null){
//                   if( this.state.monthlyRent!== ov.monthlyRent &&this.state.monthlyRent.indexOf(',') !== -1){
//                      monthlyRent = this.state.monthlyRent.replace(/,/g, '');
//                   }else{
//                     monthlyRent = this.state.monthlyRent;
//                   }
//                 }else{
//                     monthlyRent = this.state.monthlyRent;
//                 }

//                 // -----------------------
//                  if(this.state.depositAmount && this.state.depositAmount!= "" && this.state.depositAmount!== null){
//                   if(this.state.depositAmount!== ov.depositAmount &&this.state.depositAmount.indexOf(',') !== -1){
//                     depositAmount = this.state.depositAmount.replace(/,/g, '');
//                   }else{
//                     depositAmount = this.state.depositAmount;
//                   }
//                  }else{
//                     depositAmount = this.state.depositAmount;
//                  }


//                 // ----------------------
//                 if(this.state.maintenanceCharges && this.state.maintenanceCharges!="" && this.state.maintenanceCharges!== null)
//                 {
//                    if(this.state.maintenanceCharges!== ov.maintenanceCharges &&this.state.maintenanceCharges.indexOf(',') !== -1){
//                    maintenanceCharges = this.state.maintenanceCharges.replace(/,/g, '');
//                   }else{
//                    maintenanceCharges = this.state.maintenanceCharges;
//                   }
//                 }else{
//                    maintenanceCharges = this.state.maintenanceCharges;
//                 }

//                 // ---------------------------------
//                 const updateFormValues = {
//                 "expectedRate"        : expectedRate ,
//                 "totalPrice"          : totalPrice,
//                 "monthlyRent"         : monthlyRent ,
//                 "depositAmount"       : depositAmount ,
//                 "availableFrom"       : this.state.availableFrom,
//                 "description"         : this.state.description,
//                 "includeCharges"      : includeChargesDataList,
//                 "sharedExpenses"      : sharedExpensesDataList,
//                 "maintenanceCharges"  : maintenanceCharges,
//                 "maintenancePer"      : this.state.maintenancePer,
//                 "measurementUnit"     : this.state.measurementUnit,  
//                 "leaseDuration"       : this.state.leaseDuration,  
//                 "noticePeriod"        : this.state.noticePeriod,  
//                 "property_id"         : localStorage.getItem("propertyId"),
//                 "uid"                 : localStorage.getItem("uid"),

//                 };

//                 console.log("Financials req updateFormValues= ",updateFormValues);
//                   // console.log("update function");
//                   axios
//                   .patch('/api/properties/patch/financials',updateFormValues)
//                   .then( (res) =>{
//                     console.log("Financials res = ",res);
//                     if(res.status === 200){
//                     this.props.redirectToAvailability(this.props.uid,this.props.property_id);
//                     }
//                   })
//                   .catch((error)=>{
//                           console.log("error = ",error);
//                           if(error.message === "Request failed with status code 401")
//                           {
//                                swal("Your session is expired! Please login again.","", "error");
// localStorage.removeItem("uid");
// localStorage.removeItem("token");
//                                this.props.history.push("/");
//                           }
//                       })
//             }
//       }
    
//   }else{
//                 swal("Please enter mandatory fields", "", "warning");
//                 console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
//   }

// }

// totalInclude(event){

//   console.log("event.target.getAttribute('value')",event.target.getAttribute('value'));
//       var checkedPropAskType=[];
//       if(event.target.checked){
//         checkedPropAskType = event.target.getAttribute('value');
//       var includeCharges=this.state.includeCharges;
//       for(let i=0; i <includeCharges.length; i++){
//         for (let j=0; j < checkedPropAskType.length; j++) {
//           if(includeCharges[i].name === checkedPropAskType){
//             includeCharges[i].checked = true;
//           }
//         }
//       }
//       this.setState({
//         includeCharges : includeCharges,
//       },()=>{
//         console.log("here includeCharges in function check ", this.state.includeCharges);
//       });

        
//       }else{

//         checkedPropAskType = event.target.getAttribute('value');
//         var includeCharges=this.state.includeCharges;
//         for(let i=0; i <includeCharges.length; i++){
//           for (let j=0; j < checkedPropAskType.length; j++){
//             if(includeCharges[i].name === checkedPropAskType){
//               includeCharges[i].checked = false;
//             }
//           }
//         }
//         this.setState({
//           includeCharges : includeCharges,
//         },()=>{
//           console.log("here includeCharges in function uncheck ", this.state.includeCharges);

//         });

       
//       }

// }
// sharedExpense(event){

//   console.log("event.target.getAttribute('value')",event.target.getAttribute('value'));
//       var checkedPropShareExpense=[];
//       if(event.target.checked){
//         checkedPropShareExpense = event.target.getAttribute('value');
//       var sharedExpenses=this.state.sharedExpenses;
//       for(let i=0; i <sharedExpenses.length; i++){
//         for (let j=0; j < checkedPropShareExpense.length; j++) {
//           if(sharedExpenses[i].name === checkedPropShareExpense){
//             sharedExpenses[i].checked = true;
//           }
//         }
//       }
//       this.setState({
//         sharedExpenses : sharedExpenses,
//       },()=>{
//         console.log("here sharedExpenses in function check ", this.state.sharedExpenses);
//       });

        
//       }else{

//         checkedPropShareExpense = event.target.getAttribute('value');
//         var sharedExpenses=this.state.sharedExpenses;
//         for(let i=0; i <sharedExpenses.length; i++){
//           for (let j=0; j < checkedPropShareExpense.length; j++){
//             if(sharedExpenses[i].name === checkedPropShareExpense){
//               sharedExpenses[i].checked = false;
//             }
//           }
//         }
//         this.setState({
//           sharedExpenses : sharedExpenses,
//         },()=>{
//           console.log("here sharedExpenses in function uncheck ", this.state.sharedExpenses);

//         });
//       }
// }

//   backToPropertyDetails(){
//     this.props.backToPropertyDetails(this.props.uid,localStorage.getItem("propertyId"));

//   }

//     handleChange(event){
//       const target = event.target.value;
//       const name   = event.target.name;
//       console.log(name + "=" +target);
//       this.setState({
//       [name]       : target
//       });
//     }

//     handleDate = date => {
//       var newDate = new Date(date),
//       mnth = ("0" + (newDate.getMonth() + 1)).slice(-2),
//       day = ("0" + newDate.getDate()).slice(-2);
//       var availableFrom = [day, mnth, newDate.getFullYear()].join("-");
//       this.setState({
//         availableFrom: availableFrom,
//         startDate    : date
//       });
//     };


//     isNumberKey(event)
//    {

//    var charCode = (event.which) ? event.which : event.keyCode

//    if (charCode > 31 && (charCode < 48 || charCode > 57)  && (charCode < 96 || charCode > 105))
//    {
//     event.preventDefault();
//       return false;
//     }
//     else{
//       return true;
//     }
//   }
//   checkValue1(){
//     var expRate = parseInt(this.state.expectedRate.replace(/,/g, ''));
//     var total = parseInt(999999999);
//     // console.log("expRate",expRate);
//     // console.log("total",total);
//     if (expRate > total){
//         // swal("Sorry, Amount should not exceed 99 Cr ", "", "warning");
//         swal("Sorry !", "Amount should not exceed 99 Cr");
//         this.setState({
//           expectedRate:""
//         });
//     }
//   }
//   checkValue2(){
//       var totalAsk = parseInt(this.state.totalPrice.replace(/,/g, ''));
//       var total = parseInt(999999999);
      
//       if (totalAsk > total){
//         // swal("Sorry, Amount should not exceed 99 Cr", "", "warning");
//         swal("Sorry !", "Amount should not exceed 99 Cr");


//         this.setState({
//           totalPrice:""
//         });
//       };
//     }


// render() {

// return (
//   console.log("this.props.transactionType",this.props.transactionType),
//     console.log("this.props.propertyType",this.props.propertyType),
//   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//       <form id="form">
//         <div className=" row"></div>
//         {
//         this.props.transactionType == "Rent" ?
//         <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//           <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
//               <span>Monthly Rent</span>
//               <span className="astrick">*</span>
//               <div className="form-group" id="">
//                   <div className="input-group inputBox-main " id="">
//                     <div className="input-group-addon inputIcon">
//                                    <i className="fa fa-rupee iconClr"></i>
//                                   </div>
//               <input type="text" className="form-control" ref="monthlyRent" name="monthlyRent" value={this.state.monthlyRent} onChange={this.handleChange.bind(this)} onKeyDown={this.isNumberKey.bind(this)} id="monthlyRent" placeholder="Monthly Rent" min="0"/>
//                    </div>
//               </div>
//           </div>
//           <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
//             <span>Deposit Amount</span>
//             <div className="form-group" id="">
//                 <div className="input-group inputBox-main " id="">
//                   <div className="input-group-addon inputIcon">
//                                  <i className="fa fa-rupee iconClr"></i>
//                                 </div>
//             <input type="text" className="form-control" ref="depositAmount" name="depositAmount" value={this.state.depositAmount} onChange={this.handleChange.bind(this)} onKeyDown={this.isNumberKey.bind(this)}  id="depositAmount" placeholder="Deposit Amount" min="0"/>
//                  </div>
//             </div>

//           </div>
//       </div>
//       :
//       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//         <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
//           <span>Expected Rate</span>
//           <div className="form-group" id="expectedrate">
//               <div className="input-group inputBox-main " id="">
//                   <div className="input-group-addon inputIcon">
//                    <i className="fa fa-rupee iconClr"></i>
//                   </div>
//                   {console.log("here",this.state.expectedRate)}
//                   <input type="text" className="form-control" ref="expectedrate" name="expectedRate" value={this.state.expectedRate} onChange={this.handleChange.bind(this)} onKeyDown={this.isNumberKey.bind(this)} onBlur={this.checkValue1.bind(this)} id="expRate" placeholder="Expected Rate" min="0"/>
//                  <div className="input-group-addon inputIcon">
//                     <select value={this.state.measurementUnit} name="measurementUnit" onChange={this.handleChange.bind(this)} >
//                         <option value="Sq Ft">Sq Ft</option>
//                         <option value="Sq Meter">Sq Meter</option>
//                         <option value="Guntha">Guntha</option>
//                         <option value="Acre">Acre</option>
//                         <option value="Sq Yard">Sq Yard</option>
//                         <option value="Bigha">Bigha</option>
//                         <option value="Hectare">Hectare</option>
//                         <option value="Marla">Marla</option>
//                         <option value="Kanal">Kanal</option>
//                     </select>
//                 </div>
//               </div>
//           </div>
//         </div>
//         <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
//         <span>Total Ask</span>
//           <span className="asterisk1">*</span>
//           <div className="form-group" id="">
//               <div className="input-group inputBox-main " id="">
//                 <div className="input-group-addon inputIcon">
//                  <i className="fa fa-rupee iconClr"></i>
//                 </div>
//                 <input type="text" className="form-control" ref="totalprice" name="totalPrice" value={this.state.totalPrice} onChange={this.handleChange.bind(this)} onKeyDown={this.isNumberKey.bind(this)} onBlur={this.checkValue2.bind(this)} id="totalAsk" placeholder="Total Ask" min="0"  />
//               </div>
//           </div>

//         </div>
//       </div>
//         }


        
//         {
//           this.props.transactionType == "Rent" && this.props.propertyType == "Commercial" ?
//           null
//           :

//           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm">
//             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//              <label>My Total Ask includes</label>
//             </div>
//           {this.state.includeCharges && this.state.includeCharges.length > 0 ?
//             this.state.includeCharges.map((data,index)=>{
//               return (
//                     <div className="col-lg-6 marTopBtm" key={index}>
                      
//                       <label className="container1 checkbox-inline"><span className="fs1">{data.name}</span>
//                       <input type="checkbox"
//                           value={data.name}
//                           id={index}
//                           name="userCheckbox"
//                           onChange={this.totalInclude.bind(this)} 
//                           checked={data.checked}
                         
//                           />
//                       <span className="checkmark1"></span>
//                       </label>

//                     </div>

//                 );
//             })
//             :
//             null
//           }

//         </div>
//         }

//         {
//           this.props.propertyHolder ==="Flatmate" ?
//             /*==========================flatmate================================*/
//             <div>
//               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm">
//                   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//                    <label>My Shared Expenses includes</label>
//                   </div>
//                 {this.state.sharedExpenses && this.state.sharedExpenses.length > 0 ?
//                   this.state.sharedExpenses.map((data,index)=>{
//                     return (
//                           <div className="col-lg-6 marTopBtm" key={index}>
                            
//                             <label className="container1 checkbox-inline"><span className="fs1">{data.name}</span>
//                             <input type="checkbox"
//                                 value={data.name}
//                                 id={index}
//                                 name="userCheckbox"
//                                 onChange={this.sharedExpense.bind(this)} 
//                                 checked={data.checked}
                               
//                                 />
//                             <span className="checkmark1"></span>
//                             </label>

//                           </div>

//                       );
//                   })
//                   :
//                   null
//                 }

//               </div>
//               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//                 <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
//                     <div className="form-group"  id="" >
//                        <span>Lease Duration Preferred:</span>
//                       <div className="input-group inputBox-main " id="">
//                         <div className="input-group-addon inputIcon">
//                            <i className="fa fa-building iconClr"></i>
//                           </div>
//                           <select className="custom-select form-control " name="leaseDuration" ref="leaseDuration" value={this.state.leaseDuration} onChange={this.handleChange.bind(this)} placeholder="select" >
//                               <option className="hidden" >--Select--</option>
//                               <option value="Short Term">Short Term (1-6 Months)</option>
//                               <option value="Mid Term">Mid Term</option>
//                               <option value="Long Term">Long Term</option>
//                           </select>
//                       </div>
//                     </div>
//                 </div>
//                 <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
//                     <div className="form-group"  id="" >
//                        <span>Notice Period:</span>
//                       <div className="input-group inputBox-main " id="">
//                         <div className="input-group-addon inputIcon">
//                            <i className="fa fa-building iconClr"></i>
//                           </div>
//                           <select className="custom-select form-control " name="noticePeriod" ref="noticePeriod" value={this.state.noticePeriod} onChange={this.handleChange.bind(this)} placeholder="select" >
//                               <option className="hidden" >--Select--</option>
//                               <option value="2 Weeks">2 Weeks</option>
//                               <option value="1 Month">1 Month</option>
//                               <option value="Others">Others</option>
//                           </select>
//                       </div>
//                     </div>
//                 </div>
//               </div>
//             </div>
//           //*===================flatmate end================================*//
//             :
//             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm">
//                   <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
//                     <div className="form-group" id="">
//                       <span>Maintenance</span>
//                       <div className="input-group inputBox-main " id="">
//                                        <div className="input-group-addon inputIcon">
//                                          <i className="fa fa-rupee iconClr"></i>
//                                         </div>
//                           {/*<span className="asterisk">*</span>*/}
//                           <input type="" className="form-control" ref="maintenanceCharges" name="maintenanceCharges" value={this.state.maintenanceCharges} onChange={this.handleChange.bind(this)} onKeyDown={this.isNumberKey.bind(this)} id="maintenanceCharges" placeholder="Maintenance Charge" min="0" />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
//                       <div className="form-group"  id="" >
//                          <span>Per</span>
//                           <div className="input-group inputBox-main " id="">
//                             <div className="input-group-addon inputIcon">
//                                <i className="fa fa-building iconClr"></i>
//                             </div>
//                             <select className="custom-select form-control " name="maintenancePer" ref="maintenancePer" value={this.state.maintenancePer} onChange={this.handleChange.bind(this)} placeholder="select" >
//                                 <option className="hidden" disabled>--Select--</option>
//                                 <option value="Month">Month</option>
//                                 <option value="Year">Year</option>
//                             </select>
//                         </div>
//                       </div>
//                     </div>
//             </div>
//         }
//           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm_5">
//             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//             <b>My Apartment is Available From</b>
//             </div>
//           </div>
//           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm_30 dateIndex">
//               <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
//                 <div className="form-group margBtm_5" id="date">
//                   <div className="input-group inputBox-main " id="">
//                     <div className="input-group-addon inputIcon">
//                         <i className="fa fa-building iconClr"></i>
//                     </div>
//                     {/*<input type="date" className="form-control" name="availableFrom" ref="availableFrom" value={this.state.availableFrom} onChange={this.handleChange.bind(this)} id="" min="1900-01-01" max="2100-12-31"/>*/}
//                    <DatePicker
//                       selected={this.state.startDate}
//                       onChange={this.handleDate}
//                       dateFormat="dd-MM-yyyy"
//                       className="form-control col-lg-12 "
//                       minDate={(new Date())}
//                       name="availableFrom"
//                       ref="availableFrom"
//                       // value={this.state.availableFrom}
//                       max="2100-12-31"
//                       onKeyDown={e=>e.preventDefault()}

//                     />
//                   </div>
//                 </div>
//             </div>
//           </div>
//             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//                 <div className="form-group" id="">
//                   <label htmlFor="exampleFormControlInput1">Description</label>
//                   <textarea className="form-control" rows="3" cols="5" ref="description" name="description" value={this.state.description} onChange={this.handleChange.bind(this)}  id="" />
//                 </div>
//             </div>
//           </div>
//           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//           {
//             <div className="form-group col-lg-3 col-md-3 col-sm-6 col-xs-6 pull-left">
//                <button className="btn btn-danger col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.backToPropertyDetails.bind(this)}> &lArr; &nbsp; &nbsp; Back </button>
//             </div>
             
//            }
//             <div className="form-group col-lg-3 col-md-3 col-sm-6 col-xs-6 pull-right">
//                  <button type="submit " className="btn nxt_btn col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.updateUser.bind(this)} >Save & Next  &nbsp; &nbsp; &rArr;</button>
//             </div>
//           </div>
//       </form>
//   </div>
// );
// }

// }
// const mapStateToProps = (state)=>{
//   return {
//           property_id     : state.property_id,
//           uid             : state.uid,
//           transactionType : state.transactionType,
//           propertyType    : state.propertyType,
//           propertyHolder  : state.propertyHolder,
//           updateStatus    : state.updateStatus,   

//   }
// };
// const mapDispatchToProps = (dispatch)=>{
//   return {
//     redirectToAvailability  : (uid,property_id)=> dispatch({type: "REDIRECT_TO_AVAILABILITY",
//                                                           uid:  uid,
//                                                           property_id:property_id
//                                                           }),
//     // backToAmenities      : (uid,property_id)=> dispatch({type: "BACK_TO_AMENITIES",
//     //                                                     uid:  uid,
//     //                                                     property_id:property_id
//     //                                                     }),
//     backToPropertyDetails       : (uid,property_id)=> dispatch({type: "BACK_TO_PROPERTY_DETAILS",
//                             uid:  uid,
//                             property_id: property_id
//                     }),

//   }
// };
// export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Financials));
