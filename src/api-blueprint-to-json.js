module.exports = {
  process: processAll
};

var async = require('async');
var q = require('q');
var request = require('request');
var protagonist = require('protagonist');
var fs = require('fs');

function processAll(resources, callback) {
  callback = callback || function() {};
  async.each(resources, processOne, callback);
}

function processOne(resource, done) {
  getBlueprint(resource)
    .then(JSON.parse)
    .then(getCode)
    .then(parseBlueprint)
    .then(JSON.stringify)
    .then( saveFile(resource.savePath) )
    .catch(function(err) {
      console.log(err);
    })
    .finally(function(){
      done();
    });
}

function getBlueprint(resource) {
  var deferred = q.defer();

  var requestOptions = {
    url: resource.url,
    headers: {
      authentication: 'Token ' + resource.token
    }
  };

  var responseCallback = function(err, res, body) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(body);
    }
  };

  request.get(requestOptions, responseCallback);

  return deferred.promise;
}

function getCode(body) {
  return body.code;
}

function parseBlueprint(blueprint) {
  var deferred = q.defer(blueprint);

  var parseCallback = function(err, json) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(json);
    }
  };

  protagonist.parse(blueprint, parseCallback);

  return deferred.promise;
}

function saveFile(path) {

  return function(contents) {
    var deferred = q.defer();

    var writeCallback = function(err) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve();
      }
    };

    fs.writeFile(path, contents, writeCallback);

    return deferred.promise;
  };

}