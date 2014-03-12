var score = require("../github_score");

describe("ProfileEvents", function(){
  it("should returns the number of events of a particular type", function(){
    var profileEvents = new score.ProfileEvents("somename", [
      {"type":"WatchEvent"},
      {"type":"WatchEvent"},
      {"type":"ForkEvent"}
    ]);

    expect(profileEvents.numberOfEvents("WatchEvent")).toEqual(2);
  });
});

describe("calculateScore", function(){
  it("should assign two points for each ForkEvent", function(){
    var profile = new score.ProfileEvents("somename", [
      {"type":"ForkEvent"}
    ]);
    expect(score.calculateScore(profile)).toEqual(2);
  });

  it("assigns three points for each WatchEvent", function(){
    var profile = new score.ProfileEvents("somename", [
      {"type":"WatchEvent"}
    ]);
    expect(score.calculateScore(profile)).toEqual(3);
  });
});

describe("IntergrationTests", function(){
  it("should return my score", function(done){
    score.fetchProfileEvents("ViktoriyaSavkina").then(function(profileEvents){
      expect(score.calculateScore(profileEvents)).toBeGreaterThan(1);
      done();
    });
  });

  describe("fetchProfileEvents", function(){
    it("should fetch profile events", function(done){
      score.fetchProfileEvents("ViktoriyaSavkina").then(function(profileEvents){
        expect(typeof profileEvents).toEqual("object");
        expect(profileEvents.userName).toEqual("ViktoriyaSavkina");
        expect(profileEvents.hasEvents()).toBeTruthy();
        done();
      });
    });
  });
});
