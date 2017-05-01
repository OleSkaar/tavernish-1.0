const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var x, y;

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

/* For Facebook Validation */
app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] && req.query['hub.verify_token'] === 'mezziah') {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.status(403).end();
  }
});

/* Handling all messenges */
app.post('/webhook', (req, res) => {
  console.log(req.body);
  if (req.body.object === 'page') {
    req.body.entry.forEach((entry) => {
      entry.messaging.forEach((event) => {
        if (event.message && event.message.text) {
          sendMessage(event, roll);
        } else if (event.postback && event.postback.payload === "GET_STARTED") {
          sendMessage(event, noRoll);
        }
      });
    });
    res.status(200).end();
  }
});

function sendMessage(event, r) {
  let sender = event.sender.id;
  let text = event.message.text;
  var msg;
    
if (r = roll) {
    roll();
    msg = 'Du trillet: ' + readDice(x) + readDice(y);
} else {
    msg = 'Hi, {{user_first_name}}! Type anything to roll a dice.'
}
    
      request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: 'EAAYJX5ZAqnfsBADSDZA3SpOvoOafZBGKN1QZCPKMWhDEvq3ZA4Ld5FpKVM307BsLxxkkXkE99s7oe9SlLo89S6P96BSHYzsyUKOFY95Ag6tkMo4YXX3zZCsJlSqMtW21vpcy1wZC7drW6PqmIJ5PwRZBSSLpTZCFxx8N1SWYrVAzZBDwZDZD'},
    method: 'POST',
    json: {
      recipient: {id: sender},
      message: {text: msg}
    }
  }, function (error, response) {
    if (error) {
        console.log('Error sending message: ', error);
    } else if (response.body.error) {
        console.log('Error: ', response.body.error);
    }
  });
}

function readDice(d) {
    if (d === -1) {
        return '[-]'; 
    } else if (d === 0) {
        return '[ ]';
    } else {
        return '[+]';
    }
}

function roll() {
    x = Math.floor(Math.random()*3)-1;
    y = Math.floor(Math.random()*3)-1;
}

