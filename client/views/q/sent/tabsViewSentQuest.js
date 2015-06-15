var filename='client/views/q/qolls/tabsViewSentQuest.js';

Template.tabsViewSentQuest.helpers({
	qollst : function() {
		qlog.info('Called to get the qollst here ...', filename);
		console.log(QollForQuestionaireId.find());
		return QollForQuestionaireId.find({_id : Session.get('questionnaire_id')}).fetch()[0];
	},
	questId : function() {
		return Session.get('questionnaire_id');
	},
	can_close : function(questionnaire) {
		if(questionnaire && questionnaire.status === 'sent' && questionnaire.qollstionnaireClosed != 'closed') {
			return true;
		} else {
			return false;
		}
	},
	is_closed : function(questionnaire) {
		if(questionnaire && questionnaire.qollstionnaireClosed === 'closed') {
			return true;
		}
	},
	closed_on : function(questionnaire) {
		if(questionnaire && questionnaire.qollstionnaireClosed === 'closed') {
			// return qollstionnaireSubmittedOn;
			return "(Closed On: "+moment(questionnaire.qollstionnaireClosedOn).format('MMM Do YYYY, h:mm a')+")";
		}
	},
});

Template.tabsViewSentQuest.events({
	'click button#close_questionnaire' : function(e, l) {
		e.preventDefault();

		var btn = $(e.target);

		var quest_id = btn.data('questionaire_id');
		var user_id = Meteor.userId();

		SearchConn.call('close_questionnaire', quest_id, user_id, function(err, res){
			if(err) {
				qlog.error('Error happened while submitting the questionnaire ... ' + quest_id, filename);
				qlog.error(err, filename);
			} else {
				alert(res.msg);
			}
		});
	}
});


Template.tabsViewSentQuest.onCreated(function(){
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


Template.tabsViewSentQuest.onDestroyed(function () {
  // deregister from some central store
  Session.set('questionnaire_id', undefined);
});