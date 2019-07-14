import React, { Component } from 'react';

/* Title component */
export default class Title extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<div className={"chatApp__convTitle"}>{this.props.owner} screen</div>
			
		);
	}
}
