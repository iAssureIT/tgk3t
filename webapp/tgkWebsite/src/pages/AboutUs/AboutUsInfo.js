import React, { Component } from 'react';
import './AboutUsInfo.css';

export default class AboutUsInfo extends Component {
	render() {
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad About1 ">
				<h3 className="col-lg-3 About2">About Us</h3>
				<hr className="col-lg-10 col-lg-offset-1" />
				<div className="col-lg-10 col-lg-offset-1 noPad About3">
					<p>Welcome to The Golden Key!</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad </p>
					<p>"Sed ut perspiciatis unde omnis iste natus error
					   sit voluptatem accusantium doloremque laudantium,
					   totam rem aperiam, eaque ipsa quae ab illo inventore 
					   veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
					   Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
					   sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
					   Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, 
					   adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et 
					   dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
					   exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
					   consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
					   quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas
					   nulla pariatur?"</p>
					<ul>
						<li>Pellentesque ullamcorper risus sagittis, imperdiet purus ac, tincidunt justo.</li>
						<li>Nullam ut nisi sed purus fringilla dapibus.</li>
						<li>Pellentesque fermentum eros id quam fringilla eleifend.</li>
					</ul>
					<p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>

				</div>
			</div>
		);
	}
}
