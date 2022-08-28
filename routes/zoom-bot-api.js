const router = require('express').Router();
const request = require('request');
require('dotenv').config();

router.get('/', (req, res) => {
  res.send('Welcome to the Unsplash Chatbot for Zoom!')
});

router.get('/authorize', (req, res) => {
  res.redirect('https://zoom.us/launch/chat?jid=robot_' + process.env.zoom_bot_jid)
});

router.post('/deauthorize', (req, res) => {
  if (req.headers.authorization === process.env.zoom_verification_token) {
    res.status(200)
    
    res.send();
    
    request({
      url: 'https://api.zoom.us/oauth/data/compliance',
      method: 'POST',
      json: true,
      body: {
        'client_id': req.body.payload.client_id,
        'user_id': req.body.payload.user_id,
        'account_id': req.body.payload.account_id,
        'deauthorization_event_received': req.body.payload,
        'compliance_completed': true
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(process.env.zoom_client_id + ':' + process.env.zoom_client_secret).toString('base64'),
        'cache-control': 'no-cache'
      }
    }, (error, httpResponse, body) => {
      if (error) {
        console.log(error)
      } else {
        console.log(body)
      }
    })
  } else {
    res.status(401)
    res.send('Unauthorized request to Unsplash Chatbot for Zoom.')
  }
});

router.get('/support', (req, res) => {
  res.send('See Zoom Developer Support  for help.')
});

router.get('/privacy', (req, res) => {
  res.send('The Unsplash Chatbot for Zoom does not store any user data.')
});

router.get('/terms', (req, res) => {
  res.send('By installing the Unsplash Chatbot for Zoom, you are accept and agree to these terms...')
});

router.get('/documentation', (req, res) => {
  res.send('Try typing "island" to see a photo of an island, or anything else you have in mind!')
});

router.get('/zoomverify/verifyzoom.html', (req, res) => {
  res.send(process.env.zoom_verification_token)
});

router.post('/unsplash', (req, res) => {
  console.log(req.body);
  res.send('Chat received');
});

router.post('/crisbot', (req, res) => {
  console.log(req.body);
  res.send('Chat received');
});

router.post('/messages', (req, res) => {
  if (req.headers.authorization === process.env.zoom_verification_token) {
    res.status(200)
    
    res.send();
    
    request({
      url: 'https://api.zoom.us/v2/im/chat/messages',
      method: 'POST',
      json: true,
      body: {
        'client_id': req.body.payload.client_id,
        'user_id': req.body.payload.user_id,
        'account_id': req.body.payload.account_id,
        'deauthorization_event_received': req.body.payload,
        'compliance_completed': true,
        "content": {
          "head": {
            "text": "Hello World"
          }
        },
        "robot_jid": "v1pky3tyBBB5pl8q@xmpp.zoom.us",
        "to_jid": "xghfd@shj.zoom.us",
        "account_id": "ABCDE12345",
        "content": { },
        "visible_to_user": "FGHIJ67890@xmpp.zoom.us",
        "user_jid": "jnrgfjp6w@xmpp.zoom.us",
        "is_markdown_support": true
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(process.env.zoom_client_id + ':' + process.env.zoom_client_secret).toString('base64'),
        'cache-control': 'no-cache'
      }
    }, (error, httpResponse, body) => {
      if (error) {
        console.log(error)
      } else {
        console.log(body)
      }
    })
  } else {
    res.status(401)
    res.send('Unauthorized request to Unsplash Chatbot for Zoom.')
  }
});

// getChatbotToken();

function getChatbotToken() {
  request({
    url: `https://zoom.us/oauth/token?grant_type=client_credentials`,
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(process.env.zoom_client_id + ':' + process.env.zoom_client_secret).toString('base64')
    }
  }, (error, httpResponse, body) => {
    if (error) {
      console.log('Error getting chatbot_token from Zoom.', error)
    } else {
      body = JSON.parse(body)
      console.log(body);
      sendChat(body.access_token)
    }
  })
}

let req = {
  body: {
    payload: {
      accountId: '',
      toJid: '',
      cmd: ''
    }
  }
}

function sendChat(chatbotToken) {
  request({
    url: 'https://api.zoom.us/v2/im/chat/messages',
    method: 'POST',
    json: true,
    body: {
      'robot_jid': process.env.zoom_bot_jid,
      'to_jid': req.body.payload.toJid,
      'account_id': req.body.payload.accountId,
      'content': {
        'head': {
          'text': 'Unsplash'
        },
        'body': [{
          'type': 'message',
          'text': 'You sent ' + req.body.payload.cmd
        }]
      }
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + chatbotToken
    }
  }, (error, httpResponse, body) => {
    if (error) {
      console.log('Error sending chat.', error)
    } else {
      console.log(body)
    }
  })
}

function getPhoto(chatbotToken) {
  request(`https://api.unsplash.com/photos/random?query=${req.body.payload.cmd}&orientation=landscape&client_id=${process.env.unsplash_access_key}`, (error, body) => {
    if (error) {
      console.log('Error getting photo from Unsplash.', error)
      var errors = [
          {
            'type': 'section',
            'sidebar_color': '#D72638',
            'sections': [{
              'type': 'message',
              'text': 'Error getting photo from Unsplash.'
            }]
          }
        ]
        sendChat(errors, chatbotToken)
    } 
    else {
      body = JSON.parse(body.body)
      if (body.errors) {
        var errors = [
          {
            'type': 'section',
            'sidebar_color': '#D72638',
            'sections': body.errors.map((error) => {
              return { 'type': 'message', 'text': error }
            })
          }
        ]
        sendChat(errors, chatbotToken)
      } else {
        var photo = [
          {
            'type': 'section',
            'sidebar_color': body.color,
            'sections': [
              {
                'type': 'attachments',
                'img_url': body.urls.regular,
                'resource_url': body.links.html,
                'information': {
                  'title': {
                    'text': 'Photo by ' + body.user.name
                  },
                  'description': {
                    'text': 'Click to view on Unsplash'
                  }
                }
              }
            ]
          }
        ]
        sendChat(photo, chatbotToken);
      }
    }
  });
}

module.exports = router;