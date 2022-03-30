const router = require('express').Router();
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
  console.log(req.body)
  res.send('Chat received')

  // getChatbotToken()

  // function getChatbotToken () {
  //   request({
  //     url: `https://zoom.us/oauth/token?grant_type=client_credentials`,
  //     method: 'POST',
  //     headers: {
  //       'Authorization': 'Basic ' + Buffer.from(process.env.zoom_client_id + ':' + process.env.zoom_client_secret).toString('base64')
  //     }
  //   }, (error, httpResponse, body) => {
  //     if (error) {
  //       console.log('Error getting chatbot_token from Zoom.', error)
  //     } else {
  //       body = JSON.parse(body)
  //       sendChat(body.access_token)
  //     }
  //   })
  // }

  // function sendChat (chatbotToken) {
  //   request({
  //     url: 'https://api.zoom.us/v2/im/chat/messages',
  //     method: 'POST',
  //     json: true,
  //     body: {
  //       'robot_jid': process.env.zoom_bot_jid,
  //       'to_jid': req.body.payload.toJid,
  //       'account_id': req.body.payload.accountId,
  //       'content': {
  //         'head': {
  //           'text': 'Unsplash'
  //         },
  //         'body': [{
  //           'type': 'message',
  //           'text': 'You sent ' + req.body.payload.cmd
  //         }]
  //       }
  //     },
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + chatbotToken
  //     }
  //   }, (error, httpResponse, body) => {
  //     if (error) {
  //       console.log('Error sending chat.', error)
  //     } else {
  //       console.log(body)
  //     }
  //   })
  // }

});

router.post('/echo', (req, res) => {
  // using (var streamReader = new StreamReader(context.Request.Body, Encoding.UTF8))
  //   {
  //       var requestPayload = await streamReader.ReadToEndAsync();
  //       Console.WriteLine(requestPayload);
  //       var requestBody = JsonSerializer.Deserialize<dynamic>(requestPayload);
  //   }

    // var cmd = string.Empty;
    // var accountId = string.Empty;
    // var toId = string.Empty;
    // using (var streamReader = new StreamReader(context.Request.Body, Encoding.UTF8))
    // {
    //     var requestPayload = await streamReader.ReadToEndAsync();
    //     Console.WriteLine(requestPayload);
    //     var requestPayloadObject = JObject.Parse(requestPayload);
    //     cmd = requestPayloadObject["payload"]["cmd"].Value<string>();
    //     accountId = requestPayloadObject["payload"]["accountId"].Value<string>();
    //     toId = requestPayloadObject["payload"]["toJid"].Value<string>();
    // }

    // var clientId = configuration["zoom_client_id"];
    // var clientSecret = configuration["zoom_client_secret"];
    // var url = "https://api.zoom.us/oauth/token?grant_type=client_credentials";
    // var accessToken = string.Empty;
    // using (var httpClient = httpClientFactory.CreateClient())
    // {
    //     httpClient.DefaultRequestHeaders.Authorization =
    //         new AuthenticationHeaderValue("Basic", 
    //         Convert.ToBase64String(Encoding.Default.GetBytes($"{clientId}:{clientSecret}")));
    //     var responseMessage = await httpClient.PostAsync(url, null);
    //     responseMessage.EnsureSuccessStatusCode();
    //     var tokenResponse = await responseMessage.Content.ReadAsStringAsync();
    //     var tokenResponseObject = JObject.Parse(tokenResponse);
    //     accessToken = tokenResponseObject["access_token"].Value<string>();
    // }

    // var messageUrl = "https://api.zoom.us/v2/im/chat/messages";
    // using (var httpClient = httpClientFactory.CreateClient())
    // {
    //     httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
    //     httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
    //     var echoMessage = new JObject();
    //     echoMessage["account_id"] = accountId;
    //     echoMessage["robot_jid"] = configuration["zoom_bot_jid"];
    //     echoMessage["to_jid"] = toId;

    //     var content = new JObject()
    //     {
    //         ["head"] = new JObject()
    //         {
    //             ["text"] = "Echo"
    //         },
    //         ["body"] = new JArray()
    //         {
    //             new JObject()
    //             {
    //                 ["type"] = "message",
    //                 ["text"] = $"You sent {cmd}"
    //             }
    //         }
    //     };
    //     echoMessage["content"] = content;
    //     Console.WriteLine(echoMessage.ToString());
    //     var messageContent = new StringContent(echoMessage.ToString(), Encoding.UTF8, "application/json");
    //     await httpClient.PostAsync(messageUrl, messageContent);
    // }
    
});

module.exports = router;