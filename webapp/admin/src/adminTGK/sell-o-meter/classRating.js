import React, { Component, PropTypes } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios               from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/js/modal.js';
import swal                       from 'sweetalert';
import $ from "jquery";
import Add_classRating              from './add_classRating.js';
/*import Add_dataTable           from './add_dataTable.js';*/

class classRating extends Component {
    

    constructor(props) {
        super(props);
          this.state = {
        allPosts : [],
        propclass : "",
        earning   : "",
    }

    this.handleChange = this.handleChange.bind(this);
    
    }

    componentDidMount(){
      axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");
     
    axios
      .get('/api/mastersellometers/list')
      .then(
        (res)=>{
          console.log('res', res);
          const postsdata = res.data;
          console.log('postsdata',postsdata);
          this.setState({
            allPosts : postsdata,
          });
        }
      )
     .catch((error)=>{
                        console.log("error = ",error);
                        if(error.message === "Request failed with status code 401")
                        {
                             swal("Your session is expired! Please login again.","", "error");
                             this.props.history.push("/login");
                        }
              });    
  }

  selectedData(data){
    this.setState({
      allPosts : data,
    })

    console.log("here full data in props ______________________________",this.state.allPosts);
  }
  

      deleteData(event){
        event.preventDefault();
      var id = event.target.id;
      console.log("id",id);
      const token = '';
      const url = '/api/mastersellometers/'+id ;
      const headers = {
            "Authorization" : token,
            "Content-Type"  : "application/json",
        };

        axios({
          method: "DELETE",
          url : url,
          headers: headers,
          timeout: 3000,
          data: null,
        })
        .then((response)=> {
            console.log('delete response',response);
            swal("Property class deleted successfully","", "success");


             axios
            .get('/api/mastersellometers/list')
            .then(
              (res)=>{
                console.log('res', res);
                const postsdata = res.data;
                console.log('postsdata',postsdata);
                this.setState({
                  allPosts : postsdata,
                });
              }
            )
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

      }

      ClearData(event){
        this.setState({
          propclass : "",
          earning : "",
        });

      }

      editData(event){

        event.preventDefault();
      var id = event.target.id;
      console.log("edit id",id);

      const formValues = {
          "class"     : this.state.propclass,
          "earnings"   : this.state.earning,
          }
          console.log("formValues",formValues);
      if(this.state.propclass!=""&& this.state.earning!="")
      {
        axios.put('/api/mastersellometers/'+id, formValues)
          .then( (res)=>{
              console.log("submit ");
              swal("Property class Updated successfully", "", "success");
              
              this.setState({
                propclass : "",
                earning   : "",

              });


               axios
                .get('/api/mastersellometers/list')
                .then(
                  (res)=>{
                    console.log('res', res);
                    const postsdata = res.data;
                    console.log('postsdata',postsdata);
                    this.setState({
                      allPosts : postsdata,
                    });

                    $('.modal').remove();
                    $('.modal-backdrop').remove();
                    $('body').removeClass( "modal-open" );
                     window.location.reload();
                  }
                )
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
        swal("Please enter mandatory fields", "", "warning");

        }    
        
      }

    handleChange=(event)=>{
      const target = event.target;
      const name   = target.name;
      this.setState({
        [name]: event.target.value,
      });
    }

    getData(event){
      event.preventDefault();
      var id = event.target.id;
      console.log("here id",id);

       axios.get('/api/mastersellometers/'+ id)
        .then( (res)=>{
          console.log("here data_______________",res.data);
          this.setState({
            propclass: res.data[0].class,
            earning  : res.data[0].earnings,
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


    }

    render() {
        return (
            <div> 

              <section className="">
              <div className="">
                  <div className="">
                          <div className="">
                              <div className="box col-lg-12 col-md-12 col-xs-12 col-sm-12">
                                <div className=" col-lg-1 col-md-1 col-xs-1 col-sm-1 box-header with-border text-center">
                                         <h4 className="weighttitle"><a href="/"><i className="cursorpointer fa fa-chevron-circle-left"></i></a></h4>
                                    </div>
                                    <div className=" col-lg-11 col-md-11 col-xs-11 col-sm-11 box-header with-border">
                                         <h4 className="weighttitle">Sell-O-Meter Rating</h4>
                                    </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addRolesInWrap">
                      <Add_classRating selectedData={this.selectedData.bind(this)} />
                    <div className="table-responsive col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <table className="table iAssureITtable-bordered table-striped table-hover">
                        <thead className="tempTableHeader">
                          <tr className="">
                            <th className="umDynamicHeader srpadd textAlignCenter">  Class Rating </th>
                            <th className="umDynamicHeader srpadd textAlignCenter">  Earning </th>
                            <th className="umDynamicHeader srpadd textAlignCenter">  Actions </th>
                          </tr>
                        </thead>
                        <tbody>
                        {this.state.allPosts.map( (Data, index)=>{
                          // console.log('Data',Data);
                           return( 
                          <tr>
                            <td className="textAlignLeft">{Data.class}</td>
                            <td className="textAlignLeft">{Data.earnings}%</td> 
                            <td className="roleTextCenter pointerCls">             
                              <i className="fa fa-pencil editTcon editIcon pointerCls"  data-toggle="modal" title="Edit" id={Data._id} onClick={this.getData.bind(this)} data-target={`#${Data._id}-edit`} title="Edit" ></i>
                              &nbsp;&nbsp;
                              <i className="deleteIcon roleDelete  redFont fa fa-trash delIcon detailsCenter"  id="" title="Delete" data-toggle="modal" title="Delete" data-target={`#${Data._id}-rm`} ></i>
                            </td>

                                  <div className="modal fade col-lg-12 col-md-12 col-sm-12 col-xs-12" id={`${Data._id}-rm`}  role="dialog">
                                        <div className=" modal-dialog adminModal adminModal-dialog">
                                             <div className="modal-content adminModal-content col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                    <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                          <h4 className="CreateTempModal col-lg-11 col-md-11 col-sm-11 col-xs-11" id="exampleModalLabel"></h4>
                                          <div className="adminCloseCircleDiv pull-right  col-lg-1 col-md-1 col-sm-1 col-xs-1 NOpadding-left NOpadding-right">
                                            <button type="button" className="adminCloseButton" data-dismiss="modal" aria-label="Close">
                                              <span aria-hidden="true">&times;</span>
                                            </button>
                                          </div>
                                        </div>
                                                  <div className="modal-body adminModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                                     <h4 className="blackFont textAlignCenter col-lg-12 col-md-12 col-sm-12 col-xs-12 examDeleteFont">Are you sure you want to delete this Property Class Data?</h4>
                                                  </div>
                                                  
                                                  <div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                       <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                            <button type="button" className="btn adminCancel-btn col-lg-4 col-lg-offset-1 col-md-4 col-md-offset-1 col-sm-8 col-sm-offset-1 col-xs-10 col-xs-offset-1" data-dismiss="modal">CANCEL</button>
                                                       </div>
                                                       <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                            <button id={Data._id} onClick={this.deleteData.bind(this)} type="button" className="btn examDelete-btn col-lg-4 col-lg-offset-7 col-md-4 col-md-offset-7 col-sm-8 col-sm-offset-3 col-xs-10 col-xs-offset-1" data-dismiss="modal">DELETE</button>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>


                                   <div className="modal fade col-lg-12 col-md-12 col-sm-12 col-xs-12" id={`${Data._id}-edit`}  role="dialog">
                                        <div className=" modal-dialog adminModal adminModal-dialog">
                                             <div className="modal-content adminModal-content col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                    <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                          <h4 className="CreateTempModal col-lg-11 col-md-11 col-sm-11 col-xs-11" id="exampleModalLabel"></h4>
                                          <div className="adminCloseCircleDiv pull-right  col-lg-1 col-md-1 col-sm-1 col-xs-1 NOpadding-left NOpadding-right">
                                            <button type="button" className="adminCloseButton" data-dismiss="modal" aria-label="Close">
                                              <span aria-hidden="true">&times;</span>
                                            </button>
                                          </div>
                                        </div>
                                                  <div className="modal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                     <div className="modal-body adminModal-body col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                        <label className="textAlignLeft"> Property class <span className="astrick">*</span></label>
                                                       {/* <input type="text" ref="propclass" className="form-control rolesField" required/>*/}
                                                         <select className="stateselection col-lg-6 col-md-6 col-xs-12 col-sm-8 form-control" title="Please select class" id="propclass" ref="propclass" name="propclass" value={this.state.propclass} onChange={this.handleChange} required>
                                                             <option value="">-Select-</option>
                                                             <option value="A"> A </option>
                                                             <option value="B"> B </option>
                                                             <option value="C"> C </option>
                                                             <option value="D"> D </option>
                                                             <option value="E"> E </option>
                                                         </select>

                                                    </div>
                                                    <div className="modal-body adminModal-body col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                        <label className="textAlignLeft">  Earning %<span className="astrick">*</span></label>
                                                        {/*<input type="number" ref="earning" name="earning" id="earning" value={this.state.earning} onChange={this.handleChange} className="form-control rolesField" required/>*/}
                                                        <select className="rolesField col-lg-6 col-md-6 col-xs-12 col-sm-8 form-control" title="Please select Earning Rate" id="earning" ref="earning" name="earning" value={this.state.earning} onChange={this.handleChange} required>
                                                             <option value="">-Select-</option>
                                                             <option value="10"> 10 </option>
                                                             <option value="20"> 20 </option>
                                                             <option value="30"> 30 </option>
                                                             <option value="40"> 40 </option>
                                                             <option value="50"> 50 </option>
                                                        </select>
                                                    </div>

                                                  </div>
                                                  
                                                  <div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                       <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                            <button type="button" onClick={this.ClearData.bind(this)} className="btn adminCancel-btn col-lg-4 col-lg-offset-1 col-md-4 col-md-offset-1 col-sm-8 col-sm-offset-1 col-xs-10 col-xs-offset-1" data-dismiss="modal">CANCEL</button>
                                                       </div>
                                                       <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                            <button id={Data._id} onClick={this.editData.bind(this)} type="button" className="btn examDelete-btn col-lg-4 col-lg-offset-7 col-md-4 col-md-offset-7 col-sm-8 col-sm-offset-3 col-xs-10 col-xs-offset-1" >SUBMIT</button>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>


                          

                          </tr>
                          )
                          
                          })
                        }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
            </div>
        );
    }
}

export default classRating;
