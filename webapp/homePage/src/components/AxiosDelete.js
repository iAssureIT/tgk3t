import React, { Component } from 'react';
import axios from 'axios';

export default class AxiosDelete extends Component {
	constructor(props){
		super(props);
		this.state={
			id:'', 

		}
	}
	handleChange(event){
		event.preventDefault();
		this.setState({id:event.target.value})		
	}
	handleSubmit(event){
		event.preventDefault();

		axios.delete('https://jsonplaceholder.typicode.com/users/$(this.state.id')
			 .then(res =>{
			 	console.log(res);
			 	console.log(res.data);
			 });
	}
	render() {
		return (
			<form onSubmit={this.handleSubmit.bind(this)}>
				<label>
					person ID:
					<input type="text" name="id" onChange={this.handleChange.bind(this)}/>
				</label>
				<button type="submit">Delete</button>
			</form>

		);
	}
}
