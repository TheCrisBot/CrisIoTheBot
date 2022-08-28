var fetch = require('isomorphic-fetch');

// make a request
fetch(
  'https://api.wit.ai/message?q=Turn%20on%20the%20lights',
  {
    method: 'GET',
    headers: {Authorization: `Bearer ${MY_WIT_TOKEN}`}
  }
)
.then(response => response.json())
.then(json => console.log(json));

var apiai = require('apiai');

var app = apiai("<your client access token>");

var request = app.textRequest('<Your text query>', {
    sessionId: '<unique session id>'
});

request.on('response', function(response) {
    console.log(response);
});

request.on('error', function(error) {
    console.log(error);
});

request.end();
