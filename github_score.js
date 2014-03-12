var https = require("https");
var Q = require("q");

function ProfileEvents(userName, data) {
  this.userName = userName;
  this.data = data;

  this.hasEvents = function(){
    return data.length > 0;
  };

  this.numberOfEvents = function(type){
    return data.filter(function(event){
      return event.type == type
    }).length
  };
}

function fetchProfileEvents(userName){
  var url = 'https://github.com/' + userName + '.json';

  var deferred = Q.defer();
  var eventsData = '';

  https.get(url, function (res) {
    res.setEncoding('utf8');

    res.on('data', function (chunk) {
      eventsData += chunk;
    });

    res.on('end', function(){
      deferred.resolve(new ProfileEvents(userName, JSON.parse(eventsData)));
    });
  });

  return deferred.promise;
}

function calculateScore(profileEvents){
  var points = [
    {type: "ForkEvent", points: 2},
    {type: "WatchEvent", points: 3}
  ];
  return points.reduce(function(memo, current){
    return profileEvents.numberOfEvents(current.type) * current.points + memo;
  }, 0);
}

exports.ProfileEvents = ProfileEvents;
exports.fetchProfileEvents = fetchProfileEvents;
exports.calculateScore = calculateScore;
