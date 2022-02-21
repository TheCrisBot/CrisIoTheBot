var request = require('request');

/**
 * Mail API
 * yahoo mail `christianaugustyn@yahoo.com`
 * gmail `chrisaugu61@gmail.com`
 * mymail `christianaugustyn@my.com`
 * mailinator ``
 */
module.exports = function(router){

    // Mail.prototype.forwardMessage = function() {

    router.get("/mails", function(req, res) {
        var provider = req.query.prov;
        var limit = req.query.limit;
        var email = req.query.email; // "chrisaugus61@gmail.com";
        var sort = req.query.desc;
        // fetch 5 new unread emails and show them
        switch (provider.toString()) {
            case "facebook":
                var access_token = process.env.FACEBOOK_ACCESS_TOKEN;
                new Mail(access_token).getMessages({
                    url: "https://graph.facebook.com/me/messages",
                    limit: limit,
                    sort: sort
                }).then(function (response) {
                    res.send(response.data);
                }).catch(function (error) {
                    res.send(error);
                });
                break;
            case "gmail":
                var access_token = process.env.GMAIL_ACCESS_TOKEN;
                new Mail(access_token).getGmail({
                    limit: limit,
                    sort: sort
                }).then(function (response) {
                    res.send(response.data);
                }).catch(function (error) {
                    res.status(403);
                });
                break;
            case "yahoo":
                var access_token = process.env.YAHOO_ACCESS_TOKEN;
                var mails = new Mail(access_token).getYahoo();
                res.send(mails);
                break;
            case "mymail":
                var access_token = process.env.MYMAIL_ACCESS_TOKEN;
                var mails = new Mail(access_token).getMyMail();
                res.send(mails);
                break;
            default:
                var access_token = process.env.MAILINATOR_ACCESS_TOKEN;
                var mails = new Mail(access_token).getMailinator();
                res.send(mails);
        }
    });

    var Mail = function(app_secret, app_id, access_token){
        this.client_secret = app_secret;
        this.client_id = app_id;
        this.token = access_token;
        this.address = "_address";
        this.username = "_username";

        // check token
    };

    Mail.prototype.getMessages = function(options) {
        return new Promise(function (resolve, reject) {
            request({
                url: options.url,
                method: "POST",
                body: options.method == "POST" ? {
                    access_token: this.access_token,
                    client_id: this.client_id,
                    client_secret: this.client_secret
                } : {},
                json: true
            }, function (error, response, body) {
                if (error) {
                    reject(error);
                }
                if (response && response.body) {
                    resolve({data: body});
                }
            })
        })
    };

    Mail.prototype.getGmail = function(options) {
        return new Promise(function(resolve, reject){
            request({
                url: "https://api.google.com/mail/",
                method: "POST",
                json: true,
                body: {
                    client_id: this.client_id,
                    client_secret: this.client_secret,
                    access_token: this.access_token
                },
            }, function (error, response, body) {
                if (error) {
                    reject(error)
                }
                if (response && response.body) {
                    resolve({data: body});
                }
            });
        });
    };

    Mail.prototype.getYahoo = function() {
        return new Promise(function(resolve, reject){
            request({
                url: "https://api.yahoo.com/mail/",
                qs: {
                    client_id: this.client_id,
                    client_secret: this.client_secret,
                    access_token: this.access_token
                },
                method: "POST",
                json: true,
                body: {}
            }, function (error, response, body) {
                if (error) {
                    reject(error)
                }
                if (response && response.body) {
                    resolve({data: body});
                }
            });
        });
    };

    Mail.prototype.getMyMail = function() {
        return new Promise(function(resolve, reject){
            request({
                url: "https://api.yahoo.com/mail/",
                method: "POST",
                json: true,
                body: {
                    client_id: this.client_id,
                    client_secret: this.client_secret,
                    access_token: this.access_token
                },
            }, function (error, response, body) {
                if (error) {
                    reject(error)
                }
                if (response && response.body) {
                    resolve({data: body});
                }
            });
        });
    };

    Mail.prototype.getMailinator = function() {
        return new Promise(function(resolve, reject){
            request({
                url: "https://api.yahoo.com/mail/",
                method: "POST",
                json: true,
                body: {
                    client_id: this.client_id,
                    client_secret: this.client_secret,
                    access_token: this.access_token
                }
            }, function (error, response, body) {
                if (error) {
                    reject(error)
                }
                if (response && response.body) {
                    resolve({data: body});
                }
            });
        });
    };

    // 10minute mail
    Mail.prototype.getMinuteMail = function() {
        return new Promise(function(resolve, reject){
            request({
                url: "https://api.10minute.com/",
                method: "POST",
                json: true,
                body: {
                    client_id: this.client_id,
                    client_secret: this.client_secret,
                    access_token: this.access_token
                }
            }, function (error, response, body) {
                if (error) {
                    reject(error)
                }
                if (response && response.body) {
                    resolve({data: body});
                }
            });
        });
    };

    return router;
};