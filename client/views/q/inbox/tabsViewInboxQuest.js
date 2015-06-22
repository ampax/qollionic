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
	questionaire : function() {
		return QuestionaireForId.find({_id : Session.get('questionnaire_id')}).fetch()[0];
	},
	is_submitted : function(questionaire) {
		if(questionaire && (questionaire.qollstionnaireSubmitted === true || questionaire.qollstionnaire_closed === 'closed'))
			return true;

		return false;
	},
	is_not_submitted : function(questionaire) {
		qlog.info('=====================================', filename);
		console.log(questionaire);
		if(questionaire && (questionaire.qollstionnaireSubmitted === true || questionaire.qollstionnaire_closed === 'closed'))
			return false;

		return true;
	},
	submitted_on : function(questionaire) {
		if(!questionaire || !questionaire.qollstionnaireSubmittedOn) return '';
		else {
			// return qollstionnaireSubmittedOn;
			return "<span class='green_1'>("+moment(questionaire.qollstionnaireSubmittedOn).format('MMM Do YYYY, h:mm a')+")</span>";
		}
	},
	is_not_closed : function(questionaire) {
		if(!questionaire || !questionaire.qollstionnaireClosed) return true;
		else if(questionaire.qollstionnaireClosed === 'closed') return false;
		return true;
	},
	is_closed : function(questionaire) {
		if(!questionaire || !questionaire.qollstionnaireClosed) return false;
		else if(questionaire.qollstionnaireClosed === 'closed') return true;
		return false;
	},
});


Template.tabsViewInboxQuest.events({
	'click button#submit_questionnaire' : function(e, t) {
		e.preventDefault();

		var btn = $(e.target);

		var quest_id = btn.data('questionaire_id');
		var user_id = Meteor.userId();

		qlog.info(quest_id + '/' + user_id, filename);

		qlog.info('Submitting the questionnaire ...', filename);

		SearchConn.call('submit_questionnaire', quest_id, user_id, function(err, res){
			if(err) {
				qlog.error('Error happened while submitting the questionnaire ... ' + quest_id, filename);
				qlog.error(err, filename);
			} else {
				alert(res.msg);
			}
		});

		/** Meteor.call('submit_questionnaire', quest_id, user_id, function(err, res){
			if(err) {
				qlog.error('Error happened while submitting the questionnaire ... ' + quest_id, filename);
				qlog.error(err, filename);
			} else {
				alert(res.msg);
			}
		}); **/
	},
});

Template.tabsViewInboxQuest.onCreated(function(){
	Session.set('context', QollConstants.CONTEXT.WRITE);
	var userId = Meteor.userId();
	var _id = this._id;

	var dataContext = Template.currentData();

	SearchConn.subscribe('QUESTIONAIRE_FOR_ID_PUBLISHER', 
	    	{userId: userId, _id : Session.get('questionnaire_id'), context : Session.get('context')});
	
    SearchConn.subscribe('QOLL_FOR_QUESTIONAIRE_ID_PUBLISHER', 
    	{userId: userId, _id : Session.get('questionnaire_id'), context : Session.get('context')});

    SearchConn.subscribe('images');
    
    //qlog.info('Loading inbox for userId/_id ====> ' + userId + '/' + _id + '/' + Session.get('questionnaire_id'), filename);

    //qlog.info('Printing QollForQuestionaireId ==========> ' + JSON.stringify(QollForQuestionaireId.find().fetch()));
});


Template.tabsViewInboxQuest.onDestroyed(function () {
  // deregister from some central store
  // Session.set('questionnaire_id', undefined);
});
