var filename='client/views/q/qolls/tabsViewInboxQuest.js';

Template.tabsViewInboxQuest.helpers({
	qollst : function() {
		qlog.info('Called to get the qollst here ...', filename);
		console.log(QollForQuestionaireId.find());
		return QollForQuestionaireId.find({_id : Session.get('questionnaire_id')}).fetch()[0];
	},
	questId : function() {
		return Session.get('questionnaire_id');
	},
});


Template.tabsViewInboxQuest.onCreated(function(){
	Session.set('context', QollConstants.CONTEXT.WRITE);
	var userId = Meteor.userId();
	var _id = this._id;

	var dataContext = Template.currentData();
	
    SearchConn.subscribe('QOLL_FOR_QUESTIONAIRE_ID_PUBLISHER', 
    	{userId: userId, _id : Session.get('questionnaire_id'), context : Session.get('context')});

    SearchConn.subscribe('images');
    
    qlog.info('Loading inbox for userId/_id ====> ' + userId + '/' + _id + '/' + Session.get('questionnaire_id'), filename);

    qlog.info('Printing QollForQuestionaireId ==========> ' + JSON.stringify(QollForQuestionaireId.find().fetch()));
});


Template.tabsViewInboxQuest.onDestroyed(function () {
  // deregister from some central store
  Session.set('questionnaire_id', undefined);
});

/**Template.view_inbox_quest.rendered = function() {
	Session.set('currentTab', 'viewQoll');
};**/