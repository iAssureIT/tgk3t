/* detect url in a message and add a link tag */
function detectURL(message) {
	var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
	return message.replace(urlRegex, function(urlMatch) {
		return '<a href="' + urlMatch + '">' + urlMatch + '</a>';
	})
}

/* ========== */
/* Title component */

/* end Title component */
/* ========== */

/* ========== */
/* InputMessage component - used to type the message */
class InputMessage extends React.Component {}
/* end InputMessage component */
/* ========== */

/* ========== */
/* TypingIndicator component */
class TypingIndicator extends React.Component {}
/* end TypingIndicator component */
/* ========== */

/* ========== */
/* MessageList component - contains all messages */
class MessageList extends React.Component {}
/* end MessageList component */
/* ========== */

/* ========== */
/* MessageItem component - composed of a message and the sender's avatar */
class MessageItem extends React.Component {}
/* end MessageItem component */
/* ========== */

/* ========== */
/* ChatBox component - composed of Title, MessageList, TypingIndicator, InputMessage */
class ChatBox extends React.Component {}
/* end ChatBox component */
/* ========== */

/* ========== */
/* ChatRoom component - composed of multiple ChatBoxes */
class ChatRoom extends React.Component {}
/* end ChatRoom component */
/* ========== */

/* render the chatroom */
setTimeout(() => {
	ReactDOM.render(<ChatRoom />, document.getElementById("chatApp"));
}, 400);