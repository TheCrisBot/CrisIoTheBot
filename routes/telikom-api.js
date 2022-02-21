"use strict";
let request = require('request');

/**
 * Telikom PNG API
 * @param api
 * @returns {*}
 */
module.exports = function(api) {
	/**
	 *
	 */
	api.get('/telikom', function(req, res, next) {
		res.send('Telikom\'s public API available');
	});

	/**
	 * GET /telikom/directory?name=christian&prov=madang&street=dwu-dca
	 */
	api.get('/telikom/directory', function(req, res, next) {
		const {street, name, state, prov, exchange, processt, type} = req.query;
		//http://www.telikompng.com.pg/directory/modules/mod_tpngdsearch/serverside.php?button=all&tvalue=CHRISTIAN***&exchng=&stype=&processt=&xprov=*&xstate=*&xstreet=*

		let options = {
			method: 'GET',
			uri: 'http://www.telikompng.com.pg/directory/modules/mod_tpngdsearch/serverside.php',
			headers: {
				'cache-control': 'no-cache',
				'content-type': 'application/json'
			},
			qs: {
				button: 'all'
			}
		};
		options['qs']['tvalue'] =  !!name ? name.toUpperCase() + '***' : '';
		options['qs']['exchng'] = !!exchange ? exchange.toUpperCase() : '';
		options['qs']['stype'] = !!type ? type.toUpperCase() : '';
		options['qs']['processt'] = !!processt ? processt.toUpperCase() : '';
		options['qs']['xprov'] = !!prov ? prov.toUpperCase() : '*';
		options['qs']['xstate'] = !!state ? state.toUpperCase() : '*';
		options['qs']['xstreet'] = !!street ? street.toUpperCase() : '*';

		console.log("Sending request to telikompng.com.pg");
		
		return new Promise(function(resolve, reject) {
			request(options, function(error, response, body) {
				if (error) reject(error.error);
				
				if (response && body && Array.isArray(body)) {
					res.json(body);
				} else {
					res.send("Search for people with name: " + name.toUpperCase());
				}
				resolve(true);
			});
		});
	});

	return api;
};

// [[["6498318","CHRISTIAN REVIVAL CRUSADE CHURCH",null," 44%","WESTERN ",""],["9857361","CHRISTIAN PAUL",null," 78%","WEST NEW BRITAIN ",""],["3113361","CHRISTIAN CHILDRENS FUND",null," 55%","NCD ",""],["5322730","CHRISTIAN RADIO MISSIONARY FELLOWSHIP",null," 39%","EASTERN HIGHLANDS ",""],["4563332","CHRISTIAN BOOKS MELANESIA INC",null," 47%","EAST SEPIK ",""],["9837022","CHRISTIAN BROTHERS VUNAKANAU",null," 49%","EAST NEW BRITAIN ",""],["5321105","CHRISTIAN BROTHERS",null," 67%","EASTERN HIGHLANDS ",""],["5323922","CHRISTIAN BROTHERS",null," 67%","EASTERN HIGHLANDS ",""],["9827285","CHRISTIAN BROTHERS VUVU",null," 56%","EAST NEW BRITAIN ",""],["9827385","CHRISTIAN BROTHERS VUVU",null," 56%","EAST NEW BRITAIN ",""],["3281727","CHRISTIAN BUEHLER",null," 69%","CENTRAL ",""],["9828896","CHRISTIAN BOOKS MELANESIA INC",null," 47%","EAST NEW BRITAIN ",""],["9829894","CHRISTIAN BOOKS MELANESIA INC",null," 47%","EAST NEW BRITAIN ",""],["4221696","CHRISTIAN BOOKS MELANESIA INC",null," 47%","MADANG ",""],["4572888","CHRISTIAN BOOKS MELANESIA INC",null," 47%","WEST SEPIK ",""],["3230583","CHRISTIAN MISSION FELLOWSHIP POM",null," 44%","NCD ",""],["5461001","CHRISTIAN LEADERS TRAINING COLLEGE",null," 42%","WESTERN HIGHLANDS ",""],["5461002","CHRISTIAN LEADERS TRAINING COLLEGE",null," 42%","WESTERN HIGHLANDS ",""],["5461003","CHRISTIAN LEADERS TRAINING COLLEGE",null," 42%","WESTERN HIGHLANDS ",""],["5461004","CHRISTIAN LEADERS TRAINING COLLEGE",null," 42%","WESTERN HIGHLANDS ",""],["5461005","CHRISTIAN LEADERS TRAINING COLLEGE",null," 42%","WESTERN HIGHLANDS ",""],["4562335","CHRISTIAN BRETHREN CHURCH",null," 53%","EAST SEPIK ",""],["5461081","CHRISTIAN LEADERS TRAINING COLLEGE",null," 42%","WESTERN HIGHLANDS ",""],["3108383","CHRISTIAN RAPHAEL",null," 69%","NCD ",""],["3232563","CHRISTIAN CHILDRENS FUND",null," 55%","NCD ",""],["3232562","CHRISTIAN CHILDRENS FUND",null," 55%","NCD ",""],["3232544","CHRISTIAN CHILDRENS FUND",null," 55%","NCD ",""],["3113363","CHRISTIAN CHILDRENS FUND",null," 55%","NCD ",""],["3113362","CHRISTIAN CHILDRENS FUND",null," 55%","NCD ",""],["3113360","CHRISTIAN CHILDRENS FUND",null," 55%","NCD ",""],["3261038","CHRISTIAN JEREMY MARSH",null," 58%","NCD ",""],["3255257","CHRISTIAN BROTHERS ERIMA",null," 55%","NCD ",""],["3252864","CHRISTIAN BROTHERS ERIMA",null," 55%","NCD ",""],["4720047","CHRISTIAN BOOKS MELANESIAN",null," 51%","MOROBE ",""],["4723796","CHRISTIAN BOOKS MELANESIAN",null," 51%","MOROBE ",""],["5321099","CHRISTIAN LIFE CENTRE",null," 60%","EASTERN HIGHLANDS ",""],["5321798","CHRISTIAN YOUTH CENTRE",null," 58%","EASTERN HIGHLANDS ",""],["4561019","CHRISTIAN BRETHREN CHURCH(PROPERTY TRUST)",null," 36%","EAST SEPIK ",""],["4563448","CHRISTIAN BRETHREN CHURCH(PROPERTY TRUST)",null," 36%","EAST SEPIK ",""],["4561332","CHRISTIAN BRETHREN CHURCH",null," 53%","EAST SEPIK ",""],["4561210","CHRISTIAN BRETHREN CHURCH",null," 53%","EAST SEPIK ",""],["4562635","CHRISTIAN BRETHREN CHURCH",null," 53%","EAST SEPIK ",""],["4562634","CHRISTIAN BRETHREN CHURCH",null," 53%","EAST SEPIK ",""],["4561998","CHRISTIAN BOOKS MELANESIA INC",null," 47%","EAST SEPIK ",""],["4562273","CHRISTIAN BOOKS MELANESIA INC",null," 47%","EAST SEPIK ",""],["4562300","CHRISTIAN BOOKS MELANESIA INC",null," 47%","EAST SEPIK ",""],["4562007","CHRISTIAN BOOKS MELANESIA INC",null," 47%","EAST SEPIK ",""],["4221905","CHRISTIAN BOOKS MELANESIA INC",null," 47%","MADANG ",""],["6297359","CHRISTIAN BOOKS MELANESIA INC",null," 47%","ORO ",""],["4562676","CHRISTIAN BOOKS MELANESIA INC",null," 47%","EAST SEPIK ",""],["4571324","CHRISTIAN BRETHAN CHURCH",null," 55%","WEST SEPIK ",""],["4571572","CHRISTIAN BOOKS MELANESIA INC",null," 47%","WEST SEPIK ",""],["4571574","CHRISTIAN BOOKS MELANESIA INC",null," 47%","WEST SEPIK ",""],["9841814","CHRISTIAN VALALAUN",null," 67%","NEW IRELAND ",""],["3217306","CHRISTIAN GOA",null," 82%","NCD ",""],["3234077","CHRISTIAN WORKERS ASSISTANCE LTD",null," 44%","NCD ",""],["4727574","CHRISTIAN LEADER TRAINING COLL",null," 46%","MOROBE ",""],["4728690","CHRISTIAN REVIVAL CRUSADE",null," 53%","MOROBE ",""]],null]