import React, { Component } from 'react';
import axios from 'axios';


export default class Search1 extends Component {

	constructor(props){
		super(props);
		this.state={
			users: [],
    isLoading: true,
    errors: null

		}
    
  };

  getUsers() {
    axios
      .get("https://randomuser.me/api/?results=5")
      .then(response =>
        response.data.results.map(user => ({
          name: `${user.name.first} ${user.name.last}`,
          username: `${user.login.username}`,
          email: `${user.email}`,
          image: `${user.picture.thumbnail}`
        }))
      )
      .then(users => {
        this.setState({
          users,
          isLoading: false
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getUsers();
  }
	render() {
		const { isLoading, users } = this.state;
		return (
			<div>

    
    
      
        <h2>Random User</h2>
        <div>
          {!isLoading ? (
            users.map(user => {
              const { username, name, email, image } = user;
              return (


                <div id="index" className=" mt10 col-lg-4 col-lg-offset-2">
                                <div  className="col-lg-12 oneProp">
                                  <div className="row">
                                    <div id=" bgImg" className="imgZoom" >
                                       <img src={image} alt={name} className="col-lg-12 noPad imgSize zoom" />
                                    </div>
                                    <div id="info1" >
                                      RESIDENTIAL TOWER
                                    </div>
                                    <div id="info2" >
                                      FOR SALE
                                    </div>
                                    <div id="priceDisplay">
                                      <i className="fa fa-inr pr8" aria-hidden="true"></i><p>{name}</p>
                                    </div>
                                  </div>
                                  <div className="col-lg-5 mt10 row ">
                                    <i className="fa fa-map-marker"></i> <p>{email}</p>
                                  </div>
                                  <div className="pull-left col-lg-12 row ">
                                    <h4><b> <p>{name}</p> </b></h4>
                                  </div>
                                  <div className=" col-lg-12 row">
                                    <div className=" col-lg-9 row">
                                      <h4 className="pull-left"><span> Bed {name}</span> <span>Baths {email}</span> </h4>
                                      <div className="pull-left col-lg-12 row"> <b> Apartment </b></div>
                                      <div className="pull-left mt10"> <p>{name}</p> </div>
                                    </div>
                                    <div className=" col-lg-3 ">
                                      <div className="col-lg-10 col-lg-offset-1">
                                        <button className="btn-primary btn mt30">Details <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-12 bBottom mt10"></div>
                                  <div className=" col-lg-12 row ">
                                    <div className="col-lg-6 noPad mt10">
                                    <i className="fa fa-inr pr8" aria-hidden="true"></i><p>{name}</p>
                                    </div>
                                    <div className="col-lg-6 pull-right row mt10">
                                    </div>
                                  </div>
                                </div>
                              </div>



              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      
  
  
			</div>
		);
	}
}





