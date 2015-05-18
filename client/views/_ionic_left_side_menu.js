
Template._ionic_left_side_menu.events({
  'click [data-action=sign-out]': function (event, template) {
    Meteor.logout(function () {
      //IonModal.close();
      Router.go('/');
    });
  }
});