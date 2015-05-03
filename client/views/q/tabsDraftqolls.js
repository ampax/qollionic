Template.tabsDraftqolls.helpers({
  all_questionaires: function() {
  	return IStoredQuestionaire.find();
  },
});

Template.tabsDraftqolls.onCreated(function(){
	var userId = Meteor.userId();
    SearchConn.subscribe('STORED_QUESTIONAIRE_PUBLISHER', {userId: userId});
    
    qlog.info('Loading inbox for userId ====> ' + userId, filename);

    //QbSummary = new Mongo.Collection('qbank_summary', SearchConn);

    qlog.info('Printing IStoredQuestionaire ==========> ' + JSON.stringify(IStoredQuestionaire.find().fetch()));
});