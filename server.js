// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

let resObject = {};
let date_string = '';

app.get('/api/:date_string', (req, res)=> {
  date_string = req.params.date_string;

    if(date_string.includes('-')){
      //Date String
      resObject['unix'] = new Date(date_string).getTime();
      resObject['utc'] = new Date(date_string).toUTCString();
    } else {
      //timestamp

      if(date_string.match(/\d{5,}/)){
        date_string = +date_string;
      }
      
      resObject['unix'] = new Date(date_string).valueOf();
      resObject['utc'] = new Date(date_string).toUTCString();
    }

    if(!resObject['unix'] || !resObject['utc']){
      res.json({ error : "Invalid Date" })
    }
    res.json(resObject);
})

app.get('/api', (req,res)=> {
  resObject['unix'] = new Date().getTime()
  resObject['utc'] = new Date().toUTCString();
  
  res.json(resObject);
})