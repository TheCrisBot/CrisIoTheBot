;(function(){
	var StuckWanYah;
	(function(StuckWanYah){
		var StuckWanYah = /* @class */ function(){};

		StuckWanYah.prototype.init = function(first_argument) {
			this.onLoad();
		};

		StuckWanYah.prototype.initFacebookSDK = function(first_argument) {
			return FB.init({
				appId		: '1791165357568831',
				cookie	: true,
				xfbml		: true,
				version	: 'v2.12'
			});
		};

		StuckWanYah.prototype.onLoad = function(first_argument) {
			StuckWanYah.initFacebookSDK();
		};

		StuckWanYah.prototype.fbLogin = function(first_argument) {
			FB.login().then(function(response){
				if (response) {
					var access_token = response.getAccessToken();
					$.post("/api/v1/auth/facebook/token", {
						'access_token': access_token
					}, function(error, body, response) {
						if (error) {return new Error("Error occurred during authetication process");};
					});
				}
			}).catch(function(error){
				throw new Error("Provide ")
			})
		};

		StuckWanYah.prototype.ajaxRequest = function(method, url, data, callback) {
			var param = JSON.stringify({
				'access_token': "this_is_my_token"
			});
			var xhr = new XMLHttpRequest();
			xhr.withCredentials = true;
			xhr.addEventListener('readystatechange', function () {
				if (this.readyState === 4) {
					console.log(this.responseText);
				}
			});
			xhr.open(method, url);
			xhr.setRequestHeader('content-type', 'application/json');
			xhr.send(param);
		};

	}(StuckWanYah || (StuckWanYah = {})));

	var Facebook = function(){};
	Facebook.prototype.logger = function() {
		console.log("hello world");
	};
	function sendMessage(){
		var user = document.getElementById('userId');
		var msg = document.getElementById('msg');
		var sendBtn = document.getElementById('sendbtn');
	}

	function sayHelloTo(name){
		alert("Hi, " + name);
	}

	function sayHello(name, age){
		document.write(name + "is " + age + " years old");
	}
	sayHello("John ", 20);

	function person(name, age, gender, color){
		this.name = name;
		this.age = age;
		this.favColor = color;
		this.gender = gender;
		this.changeName = function(name){
			this.name = name;
		}
		this.yearOfBirth = bornYear;
	}

	function bornYear(){
		return 2017 - this.age;
	}

	var John = new person("John", 25);
	var James = new person("James", 21);
	var Cris = new person("Cris", 18);
	Cris.changeName("Kitten");

	function connected(){
		var connected = document.getElementByClass("state");
	}

	var f = function s(e, t, n) {
		t.userKey = null, 
		t.logout = function(t){
			t === undefine && (t = !0),
				e.removeCookie("_pbSession"),
				e.cookie("playgroundcookie", 111),
				e.cookie("pbextauth", 111)
		},
		t.login = function(n,r) {
			var i = t.f.get("loginDialog");
		}
		n === undefined && (n = !0),
		i.find(".signinButton").click(function(s) {
			e.removeCookie("playgroundcookie"),
				e.removeCookie("pbextauth");
			var o = i.find('input[name="login"]').val(),
				u = i.find('input[name="password"]').val();
			t.api.post({
				url: "/account/signIn",dataType:"json"
			},{
				username: o,
				password:u,
				rememberMe:""
			})
		});
		
		function goFeedback(){
			try {
				client;
				var i = client.getDeviceInfo();
				var oi = JSON.parse(i);

				if(oi.app_id == 'com.lenovo.anyshare.gps' && parseInt(oi.app_ver) >= 4030500){
					client.handleAction("Help from Feedback", 8, "15")
				}
			}
			catch(e) {
				$('feedback_btn').removeAttribute("onclick");
				$('feedback_btn').setAttribute("href","https://www.facebook.com/bestSHAREit");
				console.log(e)
			}
		}

		function collect(e, bl) {
			var hr = window.location.href;
			var arr = hr.split('/');
			var filename = arr[arr.length-1];
			var idarr = filename.split('.');
			var pid = idarr[0];

			if(e == 'btn_1') {
				$('btn_1').className = "btn " + 'click';
				$('btn_2').className = "btn " + 'unclick';
				$('btn_2').removeAttribute("onclick")
			}
			else {
				$('btn_2').className="btn "+'click';
				$('btn_1').className="btn "+'unclick';
				$('btn_1').removeAttribute("onclick")
			}
			try {
				client;
				if(bl == true){
					client.analyticsEvent('UF_WHUseful', pid)
				}
				else if(bl == false) {
					client.analyticsEvent('UF_WHNoUseful',pid)
				}
			}
			catch(e){
				console.log(e)
			}
		}

		function $_(id){
			return document.getElementById(id)
		}
	}

	/*window.onload*/ var d = function(){
		var cont = document.getElementById("content");
		var listItem = getByClass(cont,'listitem');
		for (var i= 0; i<listItem.length;i++) {
			cont.removeChild(listItem[i]);
		}
		var browser = {
			versions: function() {
				var u = navigator.userAgent,app = navigator.appVersion;
				return {
					ios: !!u.match(/\(i[^;]+;( U;) ? CPU.+Mac OS X/),
					android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
					iPhone: u.indexOf('iPhone') > -1,
					iPad: u.indexOf('iPad') > -1
				};
			}(),
		};

		if (browser.versions.android) {
			var bar = document.getElementById("bar");
			bar.style.display='block';
		}
	
		var w = window.screen.width;
		ajax("wslist", function(data){
			console.log(data);
			var obj = JSON.parse(data);
			for(var i = 0;i<obj.length;i++){
				console.log(obj[i].type);
				var odivlist =document.createElement('div');
				odivlist.className = 'listitem';
				cont.appendChild(odivlist);
				var odivtitle = document.createElement('div');
				odivtitle.className = 'title';
				odivtitle.innerHTML = obj[i].type +"&nbsp;<span>( "+ obj[i].items.length +" )</span> ";
				odivlist.appendChild(odivtitle);
				for(var j= 0; j<obj[i].items.length;j++){
					var item = obj[i].items;
					odivlist.innerHTML += "<div class='item'><img src='"+item[j].thumb_url+"'/><div class='cont'> <p>"+ item[j].name    +"</p><p>"+item[j].size+"</p> </div> <a class='down' href='"+item[j].url+"'></a> </div> ";
				}
			}
		});
	};

	function getByClass(oParent, sClass) {
		var aEle = oParent.getElementsByTagName('*');
		var aResult = [];
		for(var i = 0; i < aEle.length; i++) {
			if(aEle[i].className == sClass) {
				aResult.push(aEle[i]);
			}
		}
		return aResult;
	};

	function ajax(url, fnSucc, fnFaild) {
		var oAjax = null;
		if (window.XMLHttpRequest) {
			oAjax = new XMLHttpRequest();
		} else {
			oAjax = new ActiveXObject("Microsoft.XMLHTTP");
		}
		oAjax.open('GET', url, true);
		oAjax.send();

		oAjax.onreadystatechange = function() {
			if (oAjax.readyState == 4) {
				if (oAjax.status == 200) {
					console.log('success');
					fnSucc(oAjax.responseText);
				} else {
					if (fnFaild) {
						fnFaild(oAjax.status);
					}
				}
			}
		};
	}

	var options = {
		'method': 'GET',
		'url': 'http://localhost:3000/api/v1/',
		'headers': {
			'cache-control': 'no-cache',
			'authorization': 'Basic a2l0dGVuOnNlY3IzdA=='
		}
	};


	$("#weather").on("submit", function(e){
		e.preventDefault();
		var _url = "/api/v1/weather?" + $(e).serialize();
		ajax(_url, (response) => {
			// console.log(response)
		});
	});

	$("#sms").on("submit", function(e){
		e.preventDefault();
		var url = $(e).attr('action');
		ajax(url, (response) => {
			console.log(response)
		});
	});

})();