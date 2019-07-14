import React, { Component } from 'react';
import './Chat.css';
import  detectURL from './S1.js';
import ChatBox from './Chat/ChatBox.js';
import Title from './Chat/Title.js';
import MessageList from './Chat/MessageList.js';
import MessageItem from './Chat/MessageItem.js';
import TypingIndicator from './Chat/TypingIndicator.js';
import InputMessage from './Chat/InputMessage.js';


export default class ChatRoom extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			messages: [],
			isTyping: [],
		};
		this.sendMessage = this.sendMessage.bind(this);
		this.typing = this.typing.bind(this);
		this.resetTyping = this.resetTyping.bind(this);
	}
	
	/* adds a new message to the chatroom */
	sendMessage(sender, senderAvatar, message) {

		setTimeout(() => {
			let messageFormat = detectURL(message);
			let newMessageItem = {
				id: this.state.messages.length + 1,
				sender: sender,
				senderAvatar: senderAvatar,
				message: messageFormat
			};
			this.setState({ messages: [...this.state.messages, newMessageItem] });
			this.resetTyping(sender);
		}, 400);
	}
	/* updates the writing indicator if not already displayed */
	typing(writer) {
		if( !this.state.isTyping[writer] ) {
			let stateTyping = this.state.isTyping;
			stateTyping[writer] = true;
			this.setState({ isTyping: stateTyping });
		}
	}
	/* hide the writing indicator */
	resetTyping(writer) {
		let stateTyping = this.state.isTyping;
		stateTyping[writer] = false;
		this.setState({ isTyping: stateTyping });
	}
	render() {
		let users = {};
		let chatBoxes = [];
		let messages = this.state.messages;
		let isTyping = this.state.isTyping;
		let sendMessage = this.sendMessage;
		let typing = this.typing;
		let resetTyping = this.resetTyping;

		/* user details - can add as many users as desired */
		users[0] = { name: 'Shun', avatar: 'https://i.imgur.com/6rlfZY0.png' };
		users[1] = { name: 'Gabe', avatar: 'https://i.imgur.com/19JiCFi.png' };
		/* test with two other users :)
		users[2] = { name: 'Kate', avatar: 'https://i.imgur.com/kyV8WUW.png' };
		users[3] = { name: 'Patrick', avatar: 'https://i.imgur.com/lc296J8.png' };
		*/
		
		/* creation of a chatbox for each user present in the chatroom */
		Object.keys(users).map(function(key) {
			var user = users[key];
			chatBoxes.push(
				<ChatBox
					key={key}
					owner={user.name}
					ownerAvatar={user.avatar}
					sendMessage={sendMessage}
					typing={typing}
					resetTyping={resetTyping}
					messages={messages}
					isTyping={isTyping}
				/>
			);
		});
		return (
			<div className={"chatApp__room"}>
				{chatBoxes}
			</div>
		);
	}
}
