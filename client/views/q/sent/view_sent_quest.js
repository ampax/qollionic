var filename='client/views/q/qolls/view_sent_quest.js';

Template.view_sent_quest.helpers({
	qollst : function() {
		qlog.info('Called to get the qollst here ...', filename);
		console.log(QollForQuestionaireId.find());
		return QollForQuestionaireId.find({_id : Session.get('questionnaire_id')}).fetch()[0];
	},
	questId : function() {
		return Session.get('questionnaire_id');
	},
});


Template.view_sent_quest.onCreated(function(){
	Session.set('context', QollConstants.CONTEXT.READ);
	var userId = Meteor.userId();
	var _id = this._id;

	var dataContext = Template.currentData();
	
    SearchConn.subscribe('QOLL_FOR_QUESTIONAIRE_ID_PUBLISHER', 
    	{userId: userId, _id : Session.get('questionnaire_id'), context : Session.get('context')});

    SearchConn.subscribe('images');
    
    qlog.info('Loading Sent for userId/_id ====> ' + userId + '/' + _id + '/' + Session.get('questionnaire_id'), filename);

    qlog.info('Printing QollForQuestionaireId ==========> ' + JSON.stringify(QollForQuestionaireId.find().fetch()));
});


Template.view_sent_quest.onDestroyed(function () {
  // deregister from some central store
  Session.set('questionnaire_id', undefined);
});