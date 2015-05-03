ViewQollController = RouteController.extend({
	findOptions : function() {
		return { sort : { submittedOn : -1 }, _id : this.params._id };
	},
	waitOn : function() {
		console.log(this.params);
		Session.set('qoll_id', this.params._id);
	},
	data : function() {
		return { _id : this.params._id };
	}
});


ViewQuestionnaireController = RouteController.extend({
	findOptions : function() {
		return { sort : { submittedOn : -1 }, _id : this.params._id };
	},
	waitOn : function() {
		console.log(this.params);
		Session.set('questionnaire_id', this.params._id);
	},
	data : function() {
		return { _id : this.params._id };
	}
});


Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  

  // if (Meteor.isCordova) {
    this.route('landing_signin', {
		template : 'ionic_login',
		path: '/',
	});
	this.route('landing_register', {
		template : 'ionic_new_account',
		path: '/register',
	});
	this.route('landing_forgot_password', {
		template : 'ionic_forgot_passwd',
		path: '/passwd_recover',
	});
	this.route('go_home_cordova', {
		template : 'nav_cordova',
		path: '/home_cordova',
	});

	this.route('tabs.inbox', {path: '/tabs/inbox', layoutTemplate: 'qoll_tabs_layout'});
	this.route('tabs.sentqolls', {path: '/tabs/sentqolls', layoutTemplate: 'qoll_tabs_layout'});
	this.route('tabs.draftqolls', {path: '/tabs/draftqolls', layoutTemplate: 'qoll_tabs_layout'});
	this.route('tabs.allqolls', {path: '/tabs/allqolls', layoutTemplate: 'qoll_tabs_layout'});


	// navigations
	this.route('viewQoll', {
		template : 'view_qoll',
		path : '/view/qoll/:_id',
		controller : ViewQollController,
		layoutTemplate: 'qoll_inbox_tabs_layout'
	});

	this.route('viewDraftQuestionnaire', {
		template : 'view_draft_quest',
		path : '/view_draft_quest/:_id',
		controller : ViewQuestionnaireController
	});

	this.route('viewSentQuestionnaire', {
		template : 'view_sent_quest',
		path : '/view_sent_quest/:_id',
		controller : ViewQuestionnaireController
	});

	/** this.route('viewInboxQuestionnaire', {
		template : 'tabsViewInboxQuest',
		path : '/tabs/view_inbox_quest/:_id',
		controller : ViewQuestionnaireController
	}); **/

	/** tabs for inbox here **/
	this.route('tabs.viewInboxQuest', { path: '/tabs/inbox/quest/:_id', layoutTemplate: 'qoll_inbox_tabs_layout', controller : ViewQuestionnaireController});
	this.route('tabs.inboxQollResult', {path: '/tabs/inbox/quest_result/:_id', layoutTemplate: 'qoll_inbox_tabs_layout', controller : ViewQuestionnaireController});
  /** } else {

  	template: 'tabsViewInboxQuest',
  	template: 'tabsInboxQollResult', 



  	this.route('landing_signin', {
		template : 'ionic_login',
		path: '/',
	});
	this.route('landing_register', {
		template : 'ionic_new_account',
		path: '/register',
	});
	this.route('landing_forgot_password', {
		template : 'ionic_forgot_passwd',
		path: '/passwd_recover',
	});
	this.route('go_home_cordova', {
		template : 'nav_cordova',
		path: '/home_cordova',
	});
  } **/

});