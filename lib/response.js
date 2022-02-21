function Event() {
	// body...
};
function EventDispatcher() {
	return {
		attach: function() {},
		notify: function() {}
	}
};
function Effector() {};
function Receptor() {};
function Response(message, medium, receiver) {
	this.message = message;
	this.medium = medium;
	this.receiver = receiver;
};