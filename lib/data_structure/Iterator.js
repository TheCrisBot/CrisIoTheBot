function Iterator() {
	this.dataStore = [];
	this.move = function() {
		if (0 == this.dataStore.length) return false;
		else return true;
	}
	this.pos = function() {
		return pos;
	}
}