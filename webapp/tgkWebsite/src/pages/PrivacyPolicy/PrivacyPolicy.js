import React, { Component }     from 'react';
import Header 					from "../../blocks/common/Header/Header.js";
import MainFooter  				from '../../blocks/common/MainFooter/MainFooter.js';
import "./PrivacyPolicy.css";
export default class PrivacyPolicy extends Component {
	componentDidMount() {
		window.scrollTo(0, 0);
	}
	render() {
		return (
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPad BoxSize1">
				<Header />
				<div className="container-fluid">
					<div className="col-lg-10 col-lg-offset-1 col-md-10 col-sm-12 col-xs-12 noPad About1 ">
						<h3 className="col-lg-3 col-lg-offset-2 col-xs-8 col-xs-offset-3  About2 ">Privacy Policy</h3>
						<hr className="col-lg-10 col-lg-offset-1 col-xs-11" />
						<div className="col-lg-8 col-lg-offset-2  policy3">
							<p>This Privacy policy is subject to the terms of the Site Policy (User agreement) of Lyvo. This policy is effective from the date and time a user registers with Lyvo by filling up the Registration form and accepting the terms and conditions laid out in the Site Policy.</p>
							<p>In order to provide a personalised browsing experience, Lyvo may collect personal information from you. Additionally some of our websites may require you to complete a registration form or seek some information from you. When you let us have your preferences, we will be able to deliver or allow you to access the most relevant information that meets your end.</p>
							<p>To extend this personalized experience Lyvo may track the IP address of a user's computer and save certain information on your system in the form of cookies. A user has the option of accepting or declining the cookies of this website by changing the settings of your browser.</p>
							<p>The personal information provided by the users to Lyvo will not be provided to third parties without previous consent of the user concerned. Information of a general nature may however be revealed to external parties</p>
							<p>Every effort will be made to keep the information provided by users in a safe manner, the information will be displayed on the website will be done so only after obtaining consent from the users. Any user browsing the site generally is not required to disclose his identity or provide any information about him/her, it is only at the time of registration you will be required to furnish the details in the registration form.</p>
							<p>A full user always has the option of not providing the information which is not mandatory. You are solely responsible for maintaining confidentiality of the User password and user identification and all activities and transmission performed by the User through his user identification and shall be solely responsible for carrying out any online or off-line transaction involving credit cards / debit cards or such other forms of instruments or documents for making such transactions and IEIL assumes no responsibility or liability for their improper use of information relating to such usage of credit cards / debit cards used by the subscriber online / off-line.</p>
							<p>You agree that IEIL may use personal information about you to improve its marketing and promotional efforts, to analyze site usage, improve the Site's content and product offerings, and customise the Site's content, layout, and services. These uses improve the Site and better tailor it to meet your needs, so as to provide you with a smooth, efficient, safe and customised experience while using the Site.</p>
							<p>You agree that IEIL may use your personal information to contact you and deliver information to you that, in some cases, are targeted to your interests, such as targeted banner advertisements, administrative notices, product offerings, and communications relevant to your use of the Site. By accepting the User Agreement and Privacy Policy, you expressly agree to receive this information. If you do not wish to receive these communications, we encourage you to opt out of the receipt of certain communications in your profile. You may make changes to your profile at any time. It is the belief of IEIL that privacy of a person can be best guaranteed by working in conjunction with the Law enforcement authorities.</p>
							<p>All IEIL websites including Lyvo fully comply with all Indian Laws applicable. IEIL has always cooperated with all law enforcement inquires. IEIL may disclose all or part of your personal details in response to a request from the law enforcement authorities or in a case of bonafide requirement to prevent an imminent breach of the law</p><br/>
							
						</div>
					</div>
				</div>
				<MainFooter />
			</div>
		);
	}
}
