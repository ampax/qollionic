Template.tabsSentqolls.helpers({
  all_questionaires: function() {
  	return ISentQuestionaire.find();
  },
  sent_on : function(sent_on) {
  		return moment(sent_on).format('MMM Do YYYY, h:mm a');
  },
  closed_on : function(closed_on) {
  	if(closed_on) {
			// return qollstionnaireSubmittedOn;
			return ", <span class='red_1'>Closed On: "+moment(closed_on).format('MMM Do YYYY, h:mm a')+"</span>";
		}
	},
});


Template.tabsSentqolls.onCreated(function(){
	var userId = Meteor.userId();
    SearchConn.subscribe('SENT_QUESTIONAIRE_PUBLISHER', {userId: userId});
    
    qlog.info('Loading inbox for userId ====> ' + userId, filename);

    //QbSummary = new Mongo.Collection('qbank_summary', SearchConn);

    qlog.info('Printing ISentQuestionaire ==========> ' + JSON.stringify(ISentQuestionaire.find().fetch()));
});