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