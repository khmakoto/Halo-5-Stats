if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  $(function() {
    var params = {
      // Request parameters
      "size": "256",
    };

    $.ajax({
      url: "https://www.haloapi.com/profile/h5/profiles/DBCeen/emblem",
      beforeSend: function(xhrObj){
        // Request headers
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","5b1e6cbbeb624319b76d12ea87090ee7");
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","5b1e6cbbeb624319b76d12ea87090ee7");
      },
      type: "GET",
      // Request body
      data: "",
    })
    .done(function(data) {
      alert("success");
    })
    .fail(function(errorMsg) {
      alert(errorMsg.statusText);
    });
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
