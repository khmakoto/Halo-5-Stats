var image;

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
      console.log(image);
    }
  });

}

if (Meteor.isServer) {

  image = HTTP.call("GET", "https://www.haloapi.com/profile/h5/profiles/DBCeen/emblem",
        {headers: {"Ocp-Apim-Subscription-Key": "5b1e6cbbeb624319b76d12ea87090ee7"}});


  Meteor.startup(function () {
    // code to run on server at startup
  });
}
