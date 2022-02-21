function Database(dbLayer) {
	return require("../config/dbLayer/"+dbLayer);
	// throw new Error("DB Layer not defined!");
}

// Export the Mongoose connection instance
module.exports = Database;
