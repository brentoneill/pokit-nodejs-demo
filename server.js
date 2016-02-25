// get a connection to the PokitDok Platform for the most recent version
var PokitDok = require('pokitdok-nodejs');

// express-y stuff
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');

// promise library
var Q = require('q');

// JSON saving library
var jsonfile = require('jsonfile');

var clientSecret, clientId;


// set up express application
app.use(morgan('dev'));                          // Logs every request to console

// sets up server and serves 'www' directory
app.use(express.static('www'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

if ( process.env.NODE_ENV == 'production' ) {
    clientId = process.env.POKITDOK_CLIENT_ID;
    clientSecret = process.env.POKITDOK_CLIENT_SECRET;
} else {
    var config = require('./config');
    clientId = config.pokitDok.clientId,
    clientSecret = config.pokitDok.clientSecret
}

// set up pokitDok client
var pokitdok = new PokitDok(clientId, clientSecret);

// function to return a list of providers
function getProviders(opt) {

  var deferred = Q.defer();
  // get a list of providers based on the filters provided
  pokitdok.providers(opt, function(err, res){
    if ( err ) {
        return console.log(err, res.statusCode);
    } else {
      var providerList = res.data
      deferred.resolve(providerList);
    }
  });
  return deferred.promise;

}; // end getProviders function


function getTradingPartners(){

  var deferred = Q.defer();

  // print the trading partner id's, used to identify a payer for other EDI transaction
  pokitdok.tradingPartners(function (err, res) {
    if (err) {
        return console.log(err, res.statusCode);
    }
    var tradingPartners = res.data;
    deferred.resolve(tradingPartners)
  });

  return deferred.promise;
}

function getActivities(opt){
  var options = opt ? opt : {};
  var deferred = Q.defer();

  // get a list of activities
  pokitdok.activities({}, function(err, res){
    if(err) {
        return console.log(err, res.statusCode);
    }
    deferred.resolve(res.data);
  });

  return deferred.promise;
}

function getPlans(opt) {
  var options = opt ? opt : {};
  var deferred = Q.defer();

  // fetch any plan information
  pokitdok.plans(function (err, res) {
    if (err) {
      return console.log(err, res.statusCode);
    }
    deferred.resolve(res.data);
  });

  return deferred.promise;
}

function getInsurancePrices(opt) {
  var deferred = Q.defer();
  // print the procedure code and price for a particular zip/cpt combination
  pokitdok.insurancePrices({
          zip_code: '94401',
          cpt_code: '90658'
      }, function (err, res) {
      if (err) {
          return console.log(err, res.statusCode);
      }
      deferred.resolve(res.data);
  });
  return deferred.promise;
}

app.post('/api/providers', function(req, res){

  var options = req.body;

  getProviders(options).then(function(providerList){
    res.send(providerList);
  });

}); // end '/providers' route
app.get('/api/tradingPartners', function(req, res){

  getTradingPartners().then(function(tradingPartnerList){
    res.send(tradingPartnerList);
  });

}); // end '/activities' route
app.post('/api/activities', function(req, res){

  getActivities().then(function(activitiesList){
    res.send(activitiesList);
  });

}); // end '/providers' route
app.post('/api/plans', function(req, res){

  getPlans().then(function(plansList){
    res.send(plansList);
  });

}); // end '/prices' route
app.post('/api/insurancePrices', function(req, res){

  getInsurancePrices().then(function(priceList){
    res.send(priceList);
  });

}); // end '/icdConvert' route
app.post('/api/icdConvert', function(req, res){
    var code = req.body.icd_code;
    var options = {};
    options.code = code;

    pokitdok.icdConvert(options, function(err, response) {
        if (err) {
            res.send(err);
            return console.log(err);
        }
        res.send(response.data);
    });

}); // end '/icdConvert' route
