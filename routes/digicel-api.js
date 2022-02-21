"use strict";
// let api = exports = module.exports = require('express').Router();
const request = require('request-promise');

module.exports = function(api) {
	const DIGICEL_URL = "https://mydigicel.digicelgroup.com";
	const DIGICEL_ = "";
	// https://mydigicel.digicelgroup.com/giftPlan/get?countryCode=675&msisdn=70321596
	// https://mydigicel.digicelgroup.com/callAndCreditMe/creditMe?msisdn=70523228&amount=25

	/**
	 * GET /digicel/
	 */
	api.get('/digicel', function(req, res, next) {
		// res.send('Digicel\'s public API is available');
		// /managePlan/*
		// /giftPlan/*
		// /myPlans/*
		request({
			url: DIGICEL_URL + "/retrieveUserAccounts",
			method: 'GET',
		}, function(response){
			res.json(response);
		});
	});

	/**
	 * GET /digicel/plans
	 * @params msisdn, status{active,activate,deactivate}, planId, countryCode, userGuid
	 */
	api.get('/digicel/plans', function(req, res, next) {
		const {status, msisdn, subscriptionId, planId, accept} = req.query;

		let options = {
			url: DIGICEL_URL + "/managePlan",
			method: 'POST',
		};

		let s = status.toString();
		if (s === 'active') {
			options['url'] += "/active";
		} else if (s === 'activate') {
			options['url'] += "/activate";
		} else if (s === 'deactivate') {
			options['url'] += "/deactivate";
			options['url'] += "/";
		} else {
			options['url'] += "/";
		}

		request(options).then(function(response, body){
			if (response.status === 'SUCCESS') {
				res.send("SUCCESS").json(body);
			}
		}).catch(function (error) {
			throw new Error(error);
		})
	});

	/**
	 * GET /digicel/plans/offers
	 */
	api.get('/digicel/plans/offers', function(req, res, next) {
		request({
			url: DIGICEL_URL + "/managePlan/activate",
			method: 'GET'
		}).then(function(response){
			res.json(response);
		}).catch(function(error){
			throw new Error(error);
		});
	});

	return api;
};