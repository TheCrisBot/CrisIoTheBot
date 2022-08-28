"use strict";

function relativeVelocity(v1, v2){
	var relVel = vel1 - vel2;
	return relVel;
};

function v(u, t, a){
	return (u + a * t);
};

function s2(u, v, a){
	return (((u+v)/2) * t);
};

function s2(u, t, a){
	return (u * t + (1/2) * a * Math.pow(t, 2);
};

function v2(u, a, s){
	return (Math.pow(u, 2) + 2 * a * s)
};

