import React, { Component } from 'react';

export default class Progressbar extends Component {
	 constructor(){
    super();
    this.state = {
      progress: 0,
      limit: 0,
      speed: 5,
      color: "#ff0050"
    }
    this.frame = this.frame.bind(this);
    this.green = this.green.bind(this);
    this.red = this.red.bind(this);
  }
    componentDidMount() {
      
      this.interval = setInterval(() => this.frame(), 100);
      // console.log("data",this.props.data);
      this.setState({
      		 	limit:this.props.data
      		 	});
      // console.log("state of limit",this.state.limit)
    }
    
    frame() {
      if (this.state.progress < this.state.limit){
        this.setState((prevState, props) => ({
          progress: prevState.progress + this.state.speed,
          color: "#" + this.red() + this.green() + "50"
        }));
        // console.log(this.state.color);
      }
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    green() {
      let progress = this.state.progress;
      progress *= 2.55;
      progress = Math.round(progress);
      progress = progress.toString(16);
      return progress;
    }
    red() {
      let progress = this.state.progress;
      progress *= 2.55;
      progress = Math.round(progress);
      progress = 255 - progress;
      progress = progress.toString(16);
      return progress;
    }
	render() {
		return (
			<div >
				<div id="myBar" style={{
			        width: this.state.progress + "%",
			        backgroundColor: this.state.color
			       	 }}>
		        	<div id="label">{this.state.progress}% Completed</div> 
	      		</div>
      		</div>
		);
	}
}
