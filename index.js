var path = require('path')
var fs = require('fs');
var exec = require('child_process').exec;
var os = require('os');
var _ = require('lodash');
var terminalTab = require('terminal-tab');
var BigRedButton = require('big-red-button');
var request = require('request');
var Q = require('q');

function start() {
  var mediaFiles = [];
  var mediaDir = '/media/';
  var p = path.resolve(path.join(__dirname, mediaDir))

  fs.readdir(p, function(err, files) {
    mediaFiles = _.map(_.filter(files, function(f, i) {
      return /mp3/.test(f);
    }), function(f, i) {
      return [p, f].join('/');
    });
  });

  function randomMediaFile() {
    return mediaFiles[_.random(0,mediaFiles.length)];
  }

  function getJoke() {
    var deferred = Q.defer();

    request('http://api.yomomma.info/', function(err, res, body) {
        try {
          var joke = JSON.parse(body.match(/({"j.*(.*).*})/gi)[0]).joke;
          deferred.resolve(joke);
        } catch(e) {
          deferred.reject(e);
        }
    });

    return deferred.promise;
  }

  var bigRedButtons = [];

  for (var i = 0; i < BigRedButton.deviceCount(); i++) {
    console.log('opening BigRedButton', i);

    bigRedButtons.push(new BigRedButton.BigRedButton(i));

    bigRedButtons[i].on('buttonPressed', function () {
      console.log('Button pressed');

      exec(['afplay', randomMediaFile()].join(' '), function(error, stdout, stderr) {});
    });

    bigRedButtons[i].on('buttonReleased', function () {
      console.log('Button released');
    });

    bigRedButtons[i].on('lidRaised', function () {
      console.log('Lid raised');
    });

    bigRedButtons[i].on('lidClosed', function () {
      console.log('Lid closed');
    });

  }
}

module.exports = {start}
