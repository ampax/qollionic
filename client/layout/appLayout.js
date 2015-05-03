Template.layout.helpers({
  environment: function() {
    return Meteor.isCordova ? "mobile" : "mobile"; //web";
  }
});