var exec = require('child_process').exec
var BigRedButton = require('big-red-button')

var mediaFiles = [
  'https://user-images.githubusercontent.com/168240/39896148-d6efe748-5461-11e8-9579-1fc447538ac8.jpg',
  'https://user-images.githubusercontent.com/168240/39896149-d70bbc84-5461-11e8-9426-b69346904ee7.jpg',
  'https://user-images.githubusercontent.com/168240/39896150-d7265940-5461-11e8-896b-ec0c1ad30a5b.jpg',
  'https://user-images.githubusercontent.com/168240/39896151-d73c12b2-5461-11e8-96f3-3e9c9b3fbf7f.jpg',
  'https://user-images.githubusercontent.com/168240/39896152-d7541808-5461-11e8-9dba-df899fd9e5a3.jpg',
  'https://user-images.githubusercontent.com/168240/39896153-d76d8d2e-5461-11e8-9edd-2d578676fb4b.jpg',
  'https://user-images.githubusercontent.com/168240/39896154-d785d5c8-5461-11e8-9c6d-7a1c4765c8e5.jpg',
  'https://user-images.githubusercontent.com/168240/39896155-d79d9776-5461-11e8-8a24-a02776a1bb9b.jpg',
]

function randomMediaFile() {
  return mediaFiles[random(0,mediaFiles.length)]
}

function random(min, max) {
  return Math.floor(min + Math.random()*(max+1 - min))
}

function run() {
  var bigRedButtons = []
  for (var i = 0; i < BigRedButton.deviceCount(); i++) {
    console.log('opening BigRedButton', i)

    bigRedButtons.push(new BigRedButton.BigRedButton(i))
    bigRedButtons[i].on('buttonPressed', function () {
      console.log('Button pressed')
      exec(['curl','-s', randomMediaFile(),'|', 'mpg321','-'].join(' '), function(error, stdout, stderr) {})
    });
    bigRedButtons[i].on('buttonReleased', function () {
      console.log('Button released')
    })
    bigRedButtons[i].on('lidRaised', function () {
      console.log('Lid raised')
    })
    bigRedButtons[i].on('lidClosed', function () {
      console.log('Lid closed')
    })
  }
}

module.exports = {
  run
}
