var lr = 1;
var bias = 1;
var weights = [Math.random(), Math.random(), Math.random()];

function Perceptron(input1, input2, output) {
	var outputP = input1*weights[0]+input2*weights[1]+bias*weights[2];
	// outputP = 1/(1+Math.exp(-outputP));
	if (outputP > 0) {
		outputP = 1;
	} else {
		outputP = 0;
	}
	var error = output - outputP;
	weights[0] += error * input1 * lr;
	weights[1] += error * input2 * lr;
	weights[2] += error * bias * lr;
	console.log(input1, "or", input2, "is : ", outputP);
}

for (var i = 0; i < 50; i++) {
	Perceptron(1,1,1); // true or true
	Perceptron(1,0,1); // true or false
	Perceptron(0,1,1); // false or true
	Perceptron(0,0,0); // false or false
}