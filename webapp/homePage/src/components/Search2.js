import React, { Component } from 'react';

export default class Search2 extends Component {

	constructor() {
    super(); 
    this.state = { showMessage: false }
  }

  _showMessage = (bool) => {
    this.setState({
      showMessage: bool
    });
  }

	render() {
		return (
			<div>
		        Click the buttons to toggle the message <br/>
		        <button onClick={this._showMessage.bind(null, true)}>show</button>
		        <button onClick={this._showMessage.bind(null, false)}>hide</button>
		        { this.state.showMessage && (<div>hello world!</div>) }
     		 </div>
		);
	}
}

