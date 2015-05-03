Template.tabsSentqolls.helpers({
  all_questionaires: function() {
  	return ISentQuestionaire.find();
  },
});


Template.tabsSentqolls.onCreated(function(){
	var userId = Meteor.userId();
    SearchConn.subscribe('SENT_QUESTIONAIRE_PUBLISHER', {userId: userId});
    
    qlog.info('Loading inbox for userId ====> ' + userId, filename);

    //QbSummary = new Mongo.Collection('qbank_summary', SearchConn);

    qlog.info('Printing ISentQuestionaire ==========> ' + JSON.stringify(ISentQuestionaire.find().fetch()));
});