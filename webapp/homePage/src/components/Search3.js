import React, { Component } from 'react';
import axios from 'axios';

export default class Search3 extends Component {
	constructor(props){
		super(props);
		this.state={
			name:'', 
			username:'', 
			email:'', 

		}
	}
	handleChange(event){
		event.preventDefault();
		this.setState({
			name:this.refs.name.value,
			username:this.refs.username.value,
			email:this.refs.email.value,
		})		
	}
	handleSubmit(event){
		event.preventDefault();

		const user={
			name:this.state.name,
			username:this.state.username,
			email:this.state.email,
		};

		axios.post('https://jsonplaceholder.typicode.com/users',{ user })
			 .then(res =>{
			 	console.log(res);
			 	console.log(res.data);
			 });
	}
	render() {
		return (
			<form onSubmit={this.handleSubmit.bind(this)}>
				<label>
					
					<select className="form-control search-budget" ref ="name" onChange={this.handleChange.bind(this)} >
										<option> name</option>
										<option>amit</option>
										<option>dk</option>
										<option>abhi</option>
										<option>yash</option>
										<option></option>
									</select>
				</label>
				<label>
					
					<select className="form-control search-budget" ref ="username" onChange={this.handleChange.bind(this)} >
										<option>username</option>
										<option>11</option>
										<option>12</option>
										<option>13</option>
										<option>14</option>
										<option>15</option>
									</select>
				</label>
				<label>
					
					<select className="form-control search-budget" ref ="email" onChange={this.handleChange.bind(this)} >
										<option>email </option>
										<option>a@gmail.com</option>
										<option>ab@gmail.com</option>
										<option>ac@gmail.com</option>
										<option>ad@gmail.com</option>
										<option>ae@gmail.com</option>
									</select>
				</label>
				<button type="submit" className="bg-primary">search</button>
			</form>

		);
	}
}
