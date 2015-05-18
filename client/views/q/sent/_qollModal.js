

Template._qollModal.helpers({
	resp_qoll : function() {
		var userId = Meteor.userId();
		// console.log( this.questionaire_id + '/' + this.qid + '/' + this.responder_id);
		return SearchConn.call("findQollForRespondend", userId, this.questionaire_id, this.qid, this.responder_id, QollConstants.CONTEXT.READ, function(err, qolls) {
		  if(err) throw err;
		  console.log("here is list of qolls ------>", qolls);
		  console.log(qolls);
		  console.log("---------------------------->");

		  return qolls;
		});

		console.log('==========----------==========>');
		//return q;

		return [{qollTitle : 'saldkjfhaklsfhaklsfhlasdhf', action : 'adslfjhadlsfhaldkjsfhlasdfa123123'}];
	},
	resp_qoll1 : function() {
		console.log("#######################=#######################");
		return Session.get('resp-qolls');
	},
});


Template._qollModal.onCreated(function(){
	console.log( 'xcxcxcxcxcc'+this.questionaire_id + '/' + this.qid + '/' + this.responder_id);

	Session.set('context', QollConstants.CONTEXT.READ);
	var userId = Meteor.userId();
	var _id = this._id;


	SearchConn.subscribe('QOLL_FOR_QUESTIONAIRE_ID_PUBLISHER', 
    	{userId: userId, _id : Session.get('questionnaire_id'), context : Session.get('context')});

});