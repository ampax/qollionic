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