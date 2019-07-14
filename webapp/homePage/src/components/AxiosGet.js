import React, { Component } from 'react';
import axios from 'axios';

export default class AxiosGet extends Component {
	constructor(props){
		super(props);
		this.state={
			persons:[]

		}
	}
	componentDidMount() {
		axios.get('https://jsonplaceholder.typicode.com/users')
			 .then(res=>{
			 	console.log(res.data);

			 	this.setState({persons:res.data});
			 })
	}
	render() {
		return (
			<div>
				
					{this.state.persons.map(person =>
					  <ul key={person.id}>	
						<li >Name:{person.name}</li>
						<li >Email:{person.email}</li>
						<li >City:{person.address.city}</li>
					  </ul> 	
					)}
				
			</div>
		);
	}
}
