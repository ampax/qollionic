Template.tabsDraftqolls.helpers({
  all_questionaires: function() {
  	return IStoredQuestionaire.find();
  },
});

Template.tabsDraftqolls.events({
	'click .quest-button-send' : function(event) {
		//event.preventDefault();
		var questid = this._id;
		var userId = Meteor.userId();
		qlog.info('Clicked to send this questionnaire ' + questid, filename);
		// Will be sending the emails on the server side

		SearchConn.call("sendQuestionnaire", questid, function(err) {
			if(err) console.log(err);
			else {
				console.log('Created new questionnaire .... ');
				SearchConn.call("sendQollstionnaireMail", questid, userId, function(err) {
					if(err) console.log(err);
					else {
						console.log('Sent questionnaire email .... ');
					}
				});
			}
		});
	},
});

Template.tabsDraftqolls.onCreated(function(){
	var userId = Meteor.userId();
    SearchConn.subscribe('STORED_QUESTIONAIRE_PUBLISHER', {userId: userId});
    
    qlog.info('Loading inbox for userId ====> ' + userId, filename);

    //QbSummary = new Mongo.Collection('qbank_summary', SearchConn);

    qlog.info('Printing IStoredQuestionaire ==========> ' + JSON.stringify(IStoredQuestionaire.find().fetch()));
});