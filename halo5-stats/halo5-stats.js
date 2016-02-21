if (Meteor.isClient) {

  Template.playerProfile.events({
    'click button': function () {

      var gamertag = $("#gamertag").val();

      Meteor.call("getEmblemImage", gamertag, function(err, response) {
        if(err) {
          alert("No such gamertag was found.");
          console.log("Error in emblem image.");
        }
        else {
          var data = response.headers.location;
          $("#emblem").attr("src", data);
          $("#stats").removeClass("statsNotShown");
          $("#stats").addClass("stats");
          $("#gamertagTitle").html(gamertag);
        }
      });

      Meteor.call("getSpartanImage", gamertag, function(err, response) {
        if(!err) {
          var data = response.headers.location;
          $("#spartanImage").attr("src", data);
        }
        else {
          console.log("Error in spartan image.");
        }
      });

      Meteor.call("getArenaInfo", gamertag, function(err, response) {
        if(!err) {
          var data = JSON.parse(response.content).Results[0].Result.ArenaStats;
          console.log(response.content);
          $("#totalKills").html(data.TotalKills);
          $("#totalHeadshots").html(data.TotalHeadshots);
        }
        else {
          console.log("Error in arena info.");
        }
      });

      $("#gamertag").val("");
    }
  });

}

if (Meteor.isServer) {

  Meteor.startup(function () {
    Meteor.methods({
      getEmblemImage: function(gamertag) {
        var image = HTTP.call("GET", "https://www.haloapi.com/profile/h5/profiles/" + gamertag + "/emblem",
          {headers: {"Ocp-Apim-Subscription-Key": "5b1e6cbbeb624319b76d12ea87090ee7"}, followRedirects: false});
        return image;
      },
      getSpartanImage: function(gamertag) {
        var image = HTTP.call("GET", "https://www.haloapi.com/profile/h5/profiles/" + gamertag + "/spartan",
          {headers: {"Ocp-Apim-Subscription-Key": "5b1e6cbbeb624319b76d12ea87090ee7"}, followRedirects: false});
        return image;
      },
      getArenaInfo: function(gamertag) {
        var info = HTTP.call("GET", "https://www.haloapi.com/stats/h5/servicerecords/arena?players=" + gamertag,
          {headers: {"Ocp-Apim-Subscription-Key": "5b1e6cbbeb624319b76d12ea87090ee7"}});
        return info;
      }
    });
  });
}
