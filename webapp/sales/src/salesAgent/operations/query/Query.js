import React, { Component } from 'react';
import { Link }             from 'react-router-dom';
import './Query.css';

export default class Query extends Component {
	render() {
		return (
			<div className="col-lg-12 qBoxSize pageBox noPad">
				<div className="col-lg-2" >
				<img src="images/profile.png" className="rounded-circle qImgSize" alt=""  /> 
				</div>
				<div className="col-lg-10" >
					<div className="row mt-8">
					<span><b>Mr Avinash Gaikwad </b>for</span>
					<Link to="/propertyDetails"> 3 BHK Flat, Magarpatta City, Pune</Link>
					<span className="time ">23-Nov-2019 3:30 PM</span>
						<div className="col-lg-10 mt-8 row" data-toggle="modal" data-target="#exampleModalCenter">
							<p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text <br/>used in laying out print,
							graphic or web designs.</p>
						</div>
						<div className="col-lg-1">
						<i className="fa fa-angle-right fa-4x " aria-hidden="true"></i>
						</div>
						<div className="notification pull-right">
						6
						</div>
					</div>

				</div>
				{/*<!-- Modal -->*/}
				<div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
				  <div className="modal-dialog modal-dialog-centered" role="document">
				    <div className="modal-content">
				      <div className="modal-header headerBg">
				        <div className="col-lg-2" >
							<img src="images/profile.png" className="rounded-circle qImgSize" alt=""  /> 
						</div>
						<div className="col-lg-10 " >
							<div className="">
								<span><b>Mr Avinash Gaikwad </b></span><br/>
								<span> 3 BHK Flat, Magarpatta City, Pune</span><br/>
								<span>23-Nov-2019 3:30 PM</span>
							</div>
							<img src="images/cancel.png" className="qImgSize1" data-dismiss="modal"/>
				        </div>
				      </div>
				      <div className="modal-body col-lg-12">
				        <div className="col-lg-7 bg-info">lorem ipsum</div>
				        <div className="col-lg-6 bg-success pull-right mt-8">lorem ipsum</div>
				      </div>
				      <div className="modal-footer">
				      <div className="">
				      	<textarea rows="4" cols="40" className="textA col-lg-10" placeholder="Reply" >
							 
						</textarea>
						<div className="col-lg-12">
				        <button type="button" className="btn btn-primary pull-right mt-8">Send</button>
				        </div>
				        </div>
				      </div>
				    </div>
				  </div>
				</div>
			</div>
		);
	}
}
