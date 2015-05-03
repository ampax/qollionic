Template.qoll_tabs_layout.rendered = function () {
  Session.set('currentTab', 'tabs.inbox');
};

Template.qoll_inbox_tabs_layout.rendered = function() {
	Session.set('currentTab', 'tabs.viewInboxQuest');
};