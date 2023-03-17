const express = require('express');
const app = express();
// Lesson 1
const helmet = require("helmet")

// Lesson 2
app.use(helmet.hidePoweredBy())

// Lesson 3
app.use(helmet.frameguard({ action: "deny" }))

// Lesson 4
app.use(helmet.xssFilter())

// Lesson 5
app.use(helmet.noSniff())

// Lesson 6
app.use(helmet.ieNoOpen())

// Lesson 7
const ninetyDaysInSeconds = 90 * 24 * 60 * 60;

app.use(helmet.hsts({ maxAge: ninetyDaysInSeconds, force: true }))

// Lesson 8
app.use(helmet.dnsPrefetchControl())

// Lesson 9
app.use(helmet.noCache());

// Lesson 10
app.use(helmet.contentSecurityPolicy({
      directives: {
        "defaultSrc": ["'self'"],
        "scriptSrc": ["'self'", 'trusted-cdn.com'],
      }
    })
);

// Lesson 11
app.use(helmet({
  frameguard: {         // configure
    action: 'deny'
  },
  contentSecurityPolicy: {    // enable and configure
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ['style.com'],
    }
  },
  dnsPrefetchControl: false     // disable
}))







































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
