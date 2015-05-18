Template.qoll_tabs_layout.rendered = function () {
  Session.set('currentTab', 'tabs.inbox');
};

Template.qoll_inbox_tabs_layout.rendered = function() {
	Session.set('currentTab', 'tabs.viewInboxQuest');
};

Template.qoll_sent_tabs_layout.rendered = function() {
	Session.set('currentTab', 'tabs.viewSentQuest');
}


Template.qoll_groups_tabs_layout.rendered = function() {
	Session.set('currentTab', 'tabs.groupsOwned');
}


Template.qoll_tabs_layout.events({
  'click [data-action=showActionSheet]': function (event, template) {
  	var selected_qoll_ids = Session.get('selected_qoll_ids');
  	var enable_actions = selected_qoll_ids && selected_qoll_ids.length > 0;
    
    var buttons = [];
  	if(enable_actions) {
  		buttons = [
        { text: 'Share <i class="icon ion-share"></i>' },
        { text: 'New Questionnaire <i class="icon ion-plus"></i>' },
        { text: 'Delete <i class="icon ion-android-delete"></i>' },
      ];
  	}


    IonActionSheet.show({
      titleText: selected_qoll_ids.length + ' Qolls Selected',
      buttons: buttons,
      // destructiveText: 'Delete',
      cancelText: 'Cancel',
      cancel: function() {
        console.log('Cancelled!');
      },
      buttonClicked: function(index) {
        if (index === 0) {
          console.log('Clicked to share qolls ...');
          Router.go('shareQolls');
        }
        if (index === 1) {
          console.log('Clicked to create a new questionnaire ...');
          Router.go('createQuestionnaire');
        }
        if (index === 2) {
        	console.log('Clicked to delete the selected qolls ...');
        }
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('Destructive Action!');
        return true;
      }
    });
  },
});





// Forward to a new router to create a new Questionnaire

// Call a method on the server and delete the qolls

// Forward to a new router and share questionnaire with someone