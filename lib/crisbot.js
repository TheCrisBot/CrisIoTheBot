var aiml = require('aiml');
var aimlHigh = require('aiml-high');
var fs = require('fs-extra');
var read = require('fs-readdir-recursive')

var files = read('modules/Cris/aiml');
var fFiles = [];

files.forEach(function(file) {
	if (file.indexOf('aiml') > 1) {
		fFiles.push("modules/Cris/aiml/" + file);
	}
});

var botAttributes = {name: 'J.A.R.V.I.S.', type:'AI Personal Assistance'};

aiml.parseDir("lib/Cris/aiml", function(err, topics){
	var engine = new aiml.AiEngine('Default', topics, botAttributes);
	// read line from sender
	var responce = engine.reply({name: 'Kitten'}, "look like", function(err, responce){
		console.log(responce);
	});
});

// var interpreter = new aimlHigh(botAttributes, 'Goodbye');
// interpreter.loadFiles(['./modules/sample.aiml']);

// var callback = function(answer, wildCardArray, input){
// 	console.log(answer);
// };

// interpreter.findAnswer('What is your name?', callback);
// interpreter.findAnswer('My name is Ben.', callback);
// interpreter.findAnswer('What is my name?', callback);