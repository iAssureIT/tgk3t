import React , { Component }	from 'react';
import axios from 'axios';
import { withRouter}    from 'react-router-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import $	from 'jquery';

import './Financials.css';

class Financials extends Component{

  constructor(props){
    super(props);
      this.state = {
      // includecharges  : [],
      originalValues  : '',
      monthlyRent	    : '',
      depositAmount   : '',
      expectedRate    : '',
      totalPrice      : '',
      updateOperation : false,
      includeCharges    : [
                          {name:"Car Park",checked: false},
                          {name:"One Time Maintenance",checked: false},
                          {name:"Stamp Duty",checked: false},
                          {name:"Club House",checked: false},
                        ],
      prevCharges     : "",
      maintenancePer  : "month",
      maintenanceCharges : "0",


      };

      console.log("this.props.updateStatus",this.props.updateStatus);
      console.log("this.props.property_id",this.props.property_id);
      if(this.props.updateStatus === true){

           axios
          .get('/api/properties/'+this.props.property_id)
          .then( (response) =>{
           console.log("response= ",response);

           this.setState({
               originalValues: response.data.financial,
               expectedRate  : response.data.financial.expectedRate,
               totalPrice    : response.data.financial.totalPrice,
               monthlyRent   : response.data.financial.monthlyRent,
               depositAmount : response.data.financial.depositAmount,
               prevCharges   : response.data.financial.includeCharges,
               updateOperation : true,
               availableFrom  : response.data.financial.availableFrom ,
               description   :   response.data.financial.description ,
               maintenanceCharges : response.data.financial.maintenanceCharges,
               maintenancePer     : response.data.financial.maintenancePer,
          

           },()=>{
                    });


                     var includeCharges = this.state.includeCharges;
                    console.log("here includeCharges", includeCharges);
                    var includeChargesList = includeCharges.map((item,index)=>{
                      var propPresent = this.state.prevCharges.find((obj)=>{
                        return item.name === obj
                      })
                      console.log("here propPresent ", propPresent);
                      var newObj = Object.assign({},item);
                      if(propPresent){
                        newObj.checked = true
                      }else{
                        newObj.checked = false
                      }
                      return newObj;

                   })

                    this.setState({
                      includeCharges : includeChargesList,
                    },()=>{
                      console.log("here includeCharges in didmount after match result",this.state.includeCharges);

                    });



           // this.refs.availableFrom.value = response.data.financial.availableFrom ;
           // this.refs.description.value   = response.data.financial.description ;
           // this.refs.maintenanceCharges.value = response.data.financial.maintenanceCharges;
           // this.refs.maintenancePer.value = response.data.financial.maintenancePer;

          })
          .catch((error) =>{
           console.log("error = ", error);
          });

          }


}
componentDidMount(){

$('#totalAsk').keyup(function(event) {
  // skip for arrow keys
  if(event.which >= 37 && event.which <= 40) return;
  // format number
  $(this).val(function(index, value) {
    return value
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g,",")
    ;
  });
});

$('#expRate').keyup(function(event) {
  // skip for arrow keys
  if(event.which >= 37 && event.which <= 40) return;
  // format number
  $(this).val(function(index, value) {
    return value
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g,",")
    ;
  });
});

$('#monthlyRent').keyup(function(event) {
  // skip for arrow keys
  if(event.which >= 37 && event.which <= 40) return;
  // format number
  $(this).val(function(index, value) {
    return value
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g,",")
    ;
  });
});

$('#depositAmount').keyup(function(event) {
  // skip for arrow keys
  if(event.which >= 37 && event.which <= 40) return;
  // format number
  $(this).val(function(index, value) {
    return value
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g,",")
    ;
  });
});

var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("availableFrom")[0].setAttribute('min', today);
}

updateUser(event){
  event.preventDefault();
  console.log("this.state.expectedRate",this.state.expectedRate);
   
  // console.log("Financials req = ",formValues);
  console.log("updateOperation",this.state.updateOperation);

  if( this.state.totalPrice!="" || this.state.monthlyRent!="" ){

    if(this.state.updateOperation!=true)
    {
        var includeChargesData = this.state.includeCharges;
        var includeChargesDataList =[];     
            includeChargesData.map((item,index)=>{
              if(item.checked == true)
              {
                includeChargesDataList.push(item.name);
              }
            })

            console.log("includeChargesDataList true",includeChargesDataList);
            console.log("this.state.availableFrom",this.state.availableFrom);

            console.log("maintenanceCharges",this.state.maintenanceCharges);

        const formValues = {
        "expectedRate"        : this.state.expectedRate.replace(/,/g, ''),
        "totalPrice"          : this.state.totalPrice.replace(/,/g, ''),
        "monthlyRent"         : this.state.monthlyRent.replace(/,/g, ''),
        "depositAmount"       : this.state.depositAmount.replace(/,/g, ''),
        "availableFrom"       : this.state.availableFrom,
        "description"         : this.state.description,
        "includeCharges"      : includeChargesDataList,
        "maintenanceCharges"  : this.state.maintenanceCharges.replace(/,/g, ''),
        "maintenancePer"      : this.state.maintenancePer,
        "property_id"         : localStorage.getItem("propertyId"),
        "uid"                 : localStorage.getItem("uid"),

        };

         axios
        .patch('/api/properties/patch/financials',formValues)
        .then( (res) =>{
          console.log("Financials res = ",res);
          if(res.status === 200){
          this.props.redirectToAvailability(this.props.uid,this.props.property_id);
          }
        })
        .catch((error) =>{
          console.log("error = ", error);
        }); 
      }else{
        console.log("update fun");
        var ov = this.state.originalValues;


        var includeChargesData = this.state.includeCharges;
        var includeChargesDataList =[];     
            includeChargesData.map((item,index)=>{
              if(item.checked == true)
              {
                includeChargesDataList.push(item.name);
              }
            })

            console.log("includeChargesDataList true",includeChargesDataList);
            console.log("here result amenity",ov.includeCharges);

            // compare chcekbox data
            var eq ="";
            if(includeChargesDataList.length != ov.includeCharges.length )
            {
              eq = false;
               console.log("equal not",eq);
            }else{
              
              for (var i = 0; i < includeChargesDataList.length; i++)
              { 
                      if (includeChargesDataList[i] != ov.includeCharges[i]){
                  eq = false;
                      }else{
                  eq = true;  
                      }
                 }
                  console.log("equal yes but same",eq); 
            }

            console.log("outside eq",eq);
             
            if(eq === true && this.state.expectedRate === ov.expectedRate && this.state.totalPrice === ov.totalPrice &&
              this.state.monthlyRent === ov.monthlyRent && this.state.depositAmount === ov.depositAmount && 
              this.state.availableFrom === ov.availableFrom && this.state.description === ov.description &&
               this.state.maintenanceCharges === ov.maintenanceCharges &&  this.state.maintenancePer === ov.maintenancePer)
            {
              console.log("same data");
              this.props.redirectToAvailability(this.props.uid,this.props.property_id);

            }else{
              console.log("diff data");
                console.log("this.state.maintenancePer",this.state.maintenancePer);
                console.log("this.state.availableFrom",this.state.availableFrom);
                const updateFormValues = {
                "expectedRate"        : this.state.expectedRate,
                "totalPrice"          : this.state.totalPrice,
                "monthlyRent"         : this.state.monthlyRent,
                "depositAmount"       : this.state.depositAmount,
                "availableFrom"       : this.state.availableFrom,
                "description"         : this.state.description,
                "includeCharges"      : includeChargesDataList,
                "maintenanceCharges"  : this.state.maintenanceCharges,
                "maintenancePer"      : this.state.maintenancePer,
                "property_id"         : localStorage.getItem("propertyId"),
                "uid"                 : localStorage.getItem("uid"),

                };

                console.log("Financials req updateFormValues= ",updateFormValues);
                  // console.log("update function");
                  axios
                  .patch('/api/properties/patch/financials',updateFormValues)
                  .then( (res) =>{
                    console.log("Financials res = ",res);
                    if(res.status === 200){
                    this.props.redirectToAvailability(this.props.uid,this.props.property_id);
                    }
                  })
                  .catch((error) =>{
                    console.log("error = ", error);
                  }); 
            }
      }
    
  }else{
                swal("Please enter mandatory fields", "", "warning");
                console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
  }

}

totalInclude(event){

  console.log("event.target.getAttribute('value')",event.target.getAttribute('value'));
      var checkedPropAskType=[];
      if(event.target.checked){
        checkedPropAskType = event.target.getAttribute('value');
      var includeCharges=this.state.includeCharges;
      for(let i=0; i <includeCharges.length; i++){
        for (let j=0; j < checkedPropAskType.length; j++) {
          if(includeCharges[i].name === checkedPropAskType){
            includeCharges[i].checked = true;
          }
        }
      }
      this.setState({
        includeCharges : includeCharges,
      },()=>{
        console.log("here includeCharges in function check ", this.state.includeCharges);
      });

        
      }else{

        checkedPropAskType = event.target.getAttribute('value');
        var includeCharges=this.state.includeCharges;
        for(let i=0; i <includeCharges.length; i++){
          for (let j=0; j < checkedPropAskType.length; j++){
            if(includeCharges[i].name === checkedPropAskType){
              includeCharges[i].checked = false;
            }
          }
        }
        this.setState({
          includeCharges : includeCharges,
        },()=>{
          console.log("here includeCharges in function uncheck ", this.state.includeCharges);

        });

       
      }

}
  backToAmenities(){
    // this.props.backToAmenities();
    this.props.backToAmenities(this.props.uid,localStorage.getItem("propertyId"));

  }

    handleChange(event){
    // event.preventDefault();
    // var monthlyRent = this.refs.monthlyRent.value;
    // var depositAmount = this.refs.depositAmount.value;
    // var monthlyRent = this.refs.monthlyRent.value;
    // var totalAsk = this.refs.totalAsk.value;
    // this.setState({
     //  "monthlyRent"  : monthlyRent,
     //  "depositAmount": depositAmount,
     //  "monthlyRent": monthlyRent,
     //  "totalAsk": totalAsk
   //  });
      const target = event.target.value;
      const name   = event.target.name;
      console.log(name + "=" +target);
      this.setState({
      [name]       : target
      });

   
    }


render() {

return (
  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <form id="form">
        <div className=" row"></div>
        {
        this.props.transactionType == "Rent" ?
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
              <span>Monthly Rent</span>
              <div className="form-group" id="">
                  <div className="input-group inputBox-main " id="">
                    <div className="input-group-addon inputIcon">
                                   <i className="fa fa-rupee iconClr"></i>
                                  </div>
              <input type="" className="form-control" ref="monthlyRent" name="monthlyRent" value={this.state.monthlyRent} onChange={this.handleChange.bind(this)} id="monthlyRent" placeholder="Monthly Rent" min="0"/>
                   </div>
              </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <span>Deposit Amount</span>
            <div className="form-group" id="">
                <div className="input-group inputBox-main " id="">
                  <div className="input-group-addon inputIcon">
                                 <i className="fa fa-rupee iconClr"></i>
                                </div>
            <input type="" className="form-control" ref="depositAmount" name="depositAmount" value={this.state.depositAmount} onChange={this.handleChange.bind(this)}   id="depositAmount" placeholder="Deposit Amount" min="0"/>
                 </div>
            </div>

          </div>
      </div>
      :
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <span>Expected Rate</span>
          <div className="form-group" id="expectedrate">
              <div className="input-group inputBox-main " id="">
                <div className="input-group-addon inputIcon">
                               <i className="fa fa-rupee iconClr"></i>
                              </div>
                     <input type="" className="form-control" ref="expectedrate" name="expectedRate" value={this.state.expectedRate} onChange={this.handleChange.bind(this)} id="expRate" placeholder="Expected Rate" min="0"/>
               <div className="input-group-addon inputIcon">
                               /Sq ft
                              </div>
              </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
        <span>Total Ask</span>
          <span className="asterisk1">*</span>
          <div className="form-group" id="">
              <div className="input-group inputBox-main " id="">
                <div className="input-group-addon inputIcon">
                               <i className="fa fa-rupee iconClr"></i>
                              </div>
                 <input type="" className="form-control" ref="totalprice" name="totalPrice" value={this.state.totalPrice} onChange={this.handleChange.bind(this)} id="totalAsk" placeholder="Total Ask" min="0" />
               </div>
          </div>

        </div>
      </div>
        }


        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
           <label>My Total Ask includes</label>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm">
          {this.state.includeCharges && this.state.includeCharges.length > 0 ?
            this.state.includeCharges.map((data,index)=>{
              return (
                    <div className="col-lg-6 marTopBtm">
                      
                      <label className="container1 checkbox-inline"><span className="fs1">{data.name}</span>
                      <input type="checkbox"
                          value={data.name}
                          id={index}
                          name="userCheckbox"
                          onChange={this.totalInclude.bind(this)} 
                          checked={data.checked}
                          />
                      <span className="checkmark1"></span>
                      </label>

                    </div>

                );
            })
            :
            null
          }

          {/*<label className="container1 checkbox-inline col-lg-2"><span className="fs1">Car Park</span>
            <input type="checkbox"
            value="Car Park"
                id="1"
                name="userCheckbox"
                onChange={this.totalInclude.bind(this)} />
            <span className="checkmark1"></span>

          </label>
          <label className="container1 checkbox-inline col-lg-4 row"><span className="fs2">One Time Maintenance</span>
            <input type="checkbox"
            value="One Time Maintenance"
                id="2"
                name="userCheckbox"
                onChange={this.totalInclude.bind(this)} />
            <span className="checkmark1"></span>

          </label>
          <label className="container1 checkbox-inline col-lg-3 row"><span className="fs2">Stamp Duty</span>
            <input type="checkbox"
            value="Stamp Duty"
                id="3"
                name="userCheckbox"
                onChange={this.totalInclude.bind(this)} />
            <span className="checkmark1"></span>

          </label>
          <label className="container1 checkbox-inline col-lg-3"><span className="fs2">Club House</span>
            <input type="checkbox"
            value="Club House"
                id="4"
                name="userCheckbox"
                onChange={this.totalInclude.bind(this)} />
            <span className="checkmark1"></span>

          </label>*/}
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <span>Maintenance</span>
           
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <span>Per</span>
          </div>
      </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm">
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className="form-group" id="">
                  <div className="input-group inputBox-main " id="">
                                   <div className="input-group-addon inputIcon">
                                     <i className="fa fa-rupee iconClr"></i>
                                    </div>
                      {/*<span className="asterisk">*</span>*/}
                      <input type="number" className="form-control" ref="maintenanceCharges" name="maintenanceCharges" value={this.state.maintenanceCharges} onChange={this.handleChange.bind(this)} id="" placeholder="Maintenance Charge" min="0" defaultValue="0"/>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <div className="form-group"  id="" >
                    <div className="input-group inputBox-main " id="">
                      <div className="input-group-addon inputIcon">
                                     <i className="fa fa-building iconClr"></i>
                                    </div>
                                    <select className="custom-select form-control " name="maintenancePer" ref="maintenancePer" value={this.state.maintenancePer} onChange={this.handleChange.bind(this)} placeholder="select" >
                                        <option className="hidden" disabled>--Select--</option>
                                        <option value="month">Month</option>
                                        <option value="year">Year</option>
                                    </select>
                  </div>
                </div>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm_5">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <b>My Apartment is Available From</b>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margBtm_30">
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className="form-group margBtm_5" id="date">
                  <span htmlFor="exampleFormControlInput1">Date</span>
                  <div className="input-group inputBox-main " id="">
                    <div className="input-group-addon inputIcon">
                                <i className="fa fa-building iconClr"></i>
                            </div>
                    <input type="date" className="form-control" name="availableFrom" ref="availableFrom" value={this.state.availableFrom} onChange={this.handleChange.bind(this)} id="" min="1900-01-01" max="2100-12-31"/>
                  </div>
                </div>
            </div>
          </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="form-group" id="">
                  <label htmlFor="exampleFormControlInput1">Description</label>
                  <textarea className="form-control" rows="3" cols="5" ref="description" name="description" value={this.state.description} onChange={this.handleChange.bind(this)}  id="" />
                </div>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          {
            <div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4 pull-left">
               <button className="btn btn-danger col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.backToAmenities.bind(this)}> &lArr; &nbsp; &nbsp; Back </button>
            </div>
             
           }
            <div className="form-group col-lg-3	col-md-3 col-sm-4 col-xs-4 pull-right">
                 <button type="submit " className="btn nxt_btn col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={this.updateUser.bind(this)} >Save & Next  &nbsp; &nbsp; &rArr;</button>
            </div>
          </div>
      </form>
  </div>
);
}
}
const mapStateToProps = (state)=>{
  return {
          property_id : state.property_id,
          uid	: state.uid,
          transactionType	: state.transactionType,
          updateStatus    : state.updateStatus,   

  }
};
const mapDispatchToProps = (dispatch)=>{
  return {
    redirectToAvailability  : (uid,property_id)=> dispatch({type: "REDIRECT_TO_AVAILABILITY",
                                                          uid:  uid,
                                                          property_id:property_id
                                                          }),
    backToAmenities      : (uid,property_id)=> dispatch({type: "BACK_TO_AMENITIES",
                                                        uid:  uid,
                                                        property_id:property_id
                                                        }),

  }
};
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Financials));

