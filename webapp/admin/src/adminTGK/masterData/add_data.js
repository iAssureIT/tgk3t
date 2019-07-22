import React, { Component, PropTypes } from 'react';
import { render } 					   from 'react-dom';
import swal                       	   from 'sweetalert';
import axios 						   from 'axios';

class add_data extends Component {
    
    // constructor(props) {
    //     super(props);
    // }

     createData(event){
    event.preventDefault();
    const formValues = {
      "amenity"     : this.refs.Amenities.value,
      }
      console.log("formValues",formValues);
      
    axios.post('/api/masteramenities', formValues)
      .then( (res)=>{
          console.log("submit ");
          swal("Amenities added successfully", "", "success");
          this.refs.Amenities.value = '';       

          axios
          .get('/api/masteramenities/list')
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
            // alert("Something went wrong! Please check Get URL.");
             });      
          
      })
      .catch((error)=>{
        console.log("error = ",error);
        // alert("Something went wrong! Please check Get URL.");
      });  
    }


    render() {
        return (

        	<div>
        		<form id="addroles" className="paddingLeftz noLRPad " onSubmit={this.createData.bind(this)} >
						<div className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-lg-offset-3 col-xs-12 col-sm-8">
							<label className="">Enter Amenities </label><span className="astrick">*</span>
							<span className="blocking-span leftmar">
								<input type="text" id= "" className="rolesField form-control UMname inputText tmsUserAccForm" ref="Amenities"  name="Amenities" id="Amenities"/>
							</span>
						</div>
					
					</form>
        	</div>
            
        );
    }
}

export default add_data;
