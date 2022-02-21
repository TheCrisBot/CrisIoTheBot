var arr = [11, 23, 8, 14, 30, 9, 6, 17, 22, 28, 25, 15, 7, 10, 19];
var a = 0;
var b = 0;

for(var i = 0; i < arr.length; i++) {
	if (arr[i] < arr[i+1]) {
		swap(arr[i], arr[i+1]);
	}
	if (arr[i] < arr[i+2]) {
		swap(arr[i], arr[i+2]);
	}
	if (arr[i+2] < arr[i+1]) {
		swap(arr[i+2], arr[i+1]);
	}
	if (arr[i+2] < arr[i]) {
		swap(arr[i+2], arr[i]);
	}
}

function swap(a, b) {
	var temp = a;
	a = b;
	b = temp;
	return [a, b];
}