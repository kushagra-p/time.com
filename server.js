var express = require('express'),
   cors = require('cors');
  app = express({cors:true}),
  app.use(cors({ origin: '*'}))
  port = process.env.PORT || 3000;
  bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

  var routes = require('./api/routes/latest-router'); //importing route
  routes(app); //register the route
app.listen(port);
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });
 
console.log('Latest Stories RESTful API server started on: ' + port);