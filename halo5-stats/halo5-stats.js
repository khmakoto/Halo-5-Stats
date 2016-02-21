if (Meteor.isClient) {

  Template.playerProfile.events({
    'click button': function () {

      var gamertag = $("#gamertag").val();

      Meteor.call("getEmblemImage", gamertag, function(err, response) {
        if(err) {
          alert("No such gamertag was found.");
        }
        else {
          var data = response.headers.location;
          $("#emblem").attr("src", data);
        }
      });

      Meteor.call("getSpartanImage", gamertag, function(err, response) {
        if(!err) {
          var data = response.headers.location;
          $("#spartanImage").attr("src", data);
        }
      });
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
      }
    });
  });
}
