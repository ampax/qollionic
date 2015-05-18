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


ViewQuestionnaireController_READ = RouteController.extend({
	findOptions : function() {
		return { sort : { submittedOn : -1 }, _id : this.params._id };
	},
	waitOn : function() {
		console.log(this.params);
		Session.set('questionnaire_id', this.params._id);

		Session.set('context', QollConstants.CONTEXT.READ);
		var userId = Meteor.userId();
		var _id = this._id;

		SearchConn.subscribe('QOLL_FOR_QUESTIONAIRE_ID_PUBLISHER', 
	    	{userId: userId, _id : Session.get('questionnaire_id'), context : Session.get('context')});
	},
	data : function() {
		return { _id : this.params._id };
	}
});

ViewQuestionnaireController_WRITE = RouteController.extend({
	findOptions : function() {
		return { sort : { submittedOn : -1 }, _id : this.params._id };
	},
	waitOn : function() {
		console.log(this.params);
		Session.set('questionnaire_id', this.params._id);

		Session.set('context', QollConstants.CONTEXT.WRITE);
		var userId = Meteor.userId();
		var _id = this._id;

		SearchConn.subscribe('QOLL_FOR_QUESTIONAIRE_ID_PUBLISHER', 
	    	{userId: userId, _id : Session.get('questionnaire_id'), context : Session.get('context')});
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
		controller : ViewQuestionnaireController_READ
	});

	/** this.route('viewSentQuestionnaire', {
		template : 'view_sent_quest',
		path : '/view_sent_quest/:_id',
		controller : ViewQuestionnaireController
	}); **/

	/** tabs for sent here **/
	this.route('tabs.viewSentQuest', {path : '/tabs/sent/quest/:_id', layoutTemplate: 'qoll_sent_tabs_layout', controller : ViewQuestionnaireController_READ});
	this.route('tabs.sentQollResult', {path : '/tabs/sent/quest_result/:_id', layoutTemplate: 'qoll_sent_tabs_layout', controller : ViewQuestionnaireController_READ});
	this.route('tabs.sentQollTrend', {path : '/tabs/sent/quest_trend/:_id', layoutTemplate: 'qoll_sent_tabs_layout', controller : ViewQuestionnaireController_READ});


	/** this.route('viewInboxQuestionnaire', {
		template : 'tabsViewInboxQuest',
		path : '/tabs/view_inbox_quest/:_id',
		controller : ViewQuestionnaireController
	}); **/

	/** tabs for inbox here **/
	this.route('tabs.viewInboxQuest', { path: '/tabs/inbox/quest/:_id', layoutTemplate: 'qoll_inbox_tabs_layout', controller : ViewQuestionnaireController_WRITE});
	this.route('tabs.inboxQollResult', {path: '/tabs/inbox/quest_result/:_id', layoutTemplate: 'qoll_inbox_tabs_layout', controller : ViewQuestionnaireController_WRITE});
  	

  	this.route('tabs.groupsOwned', { path: '/tabs/groups/owned', layoutTemplate: 'qoll_groups_tabs_layout'});
  	this.route('tabs.groupsSubscribed', { path: '/tabs/groups/subscribed', layoutTemplate: 'qoll_groups_tabs_layout'});
	
  	this.route('shareQolls', {
		template : 'qolls_share',
		path : '/qolls_share',
		layoutTemplate: 'qoll_tabs_layout'
	});

	this.route('createQuestionnaire', {
		template : 'qolls_create_questionnaire',
		path : '/create_quest',
		layoutTemplate: 'qoll_tabs_layout'
	});

	

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