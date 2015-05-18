var filename='client/views/q/sent/tabsSentQollResult.js';

Template.tabsSentQollResult.helpers({
	qollst : function() {
		qlog.info('Called to get the qollst for owner here ...', filename);
		/** var qollst = QollForQuestionaireId.find({_id : Session.get('questionnaire_id')}).fetch()[0];

		if(qollst)
		qollst.qolls.map(function(q){
			qlog.info("==========================");
			console.log(q);
            if(q.qoll_response) console.log(q.qoll_response.iscorrect);
		}); **/
		// console.log(QollForQuestionaireId.find());
		return QollForQuestionaireId.find({_id : Session.get('questionnaire_id')}).fetch()[0];
	},
	questId : function() {
		return Session.get('questionnaire_id');;
	},
	stats : function() {
		var qollst = QollForQuestionaireId.find({_id : Session.get('questionnaire_id')}).fetch()[0];
		if(qollst) {
			var stats = qollst.questionaire.questResponse.stats;
			return stats;
		}

		// return [];
	},
	resp_qoll : function(questionaire_id, qid, responder_id) {
		console.log("#######################=#######################");
		var userId = Meteor.userId();
		console.log( questionaire_id + '/' + qid + '/' + responder_id);
		var qlls = SearchConn.call("findQollForRespondend", userId, questionaire_id, qid, responder_id, QollConstants.CONTEXT.READ, function(err, qolls) {
		  if(err) throw err;
		  console.log("here is list of qolls ------>", qolls);
		  console.log(qolls);
		  console.log("---------------------------->");

		  return qolls;
		});

		return qlls;
	},
});

Template.tabsSentQollResult.onCreated(function(){
	/** Session.set('context', QollConstants.CONTEXT.READ);
	var userId = Meteor.userId();
	var _id = this._id;

	var dataContext = Template.currentData();
	
    SearchConn.subscribe('QOLL_FOR_QUESTIONAIRE_ID_PUBLISHER', 
    	{userId: userId, _id : Session.get('questionnaire_id'), context : Session.get('context')});

    SearchConn.subscribe('images'); **/
});


