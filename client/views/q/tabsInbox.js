// https://www.discovermeteor.com/blog/template-level-subscriptions/

Template.tabsInbox.helpers({
  all_questionaires: function() {
    return IReceivedQuestionaire.find();
  },
  submitted_on : function(qollstionnaireSubmittedOn) {
		console.log(qollstionnaireSubmittedOn);

		if(!qollstionnaireSubmittedOn) return '';
		else {
			// return qollstionnaireSubmittedOn;
			return "<span class='green_1'>Submitted: "+moment(qollstionnaireSubmittedOn).format('MMM Do YYYY, h:mm a')+"</span>";
		}
	},
  closed_on : function(closed_on) {
      qlog.info('======================> ' + closed_on, filename);
    if(closed_on) {
      // return qollstionnaireSubmittedOn;
      return ", <span class='red_1'>Closed On: "+moment(closed_on).format('MMM Do YYYY, h:mm a')+"</span>";
    }
  },
});

Template.tabsInbox.onCreated(function(){
  var userId = Meteor.userId();
    SearchConn.subscribe('RECVD_QUESTIONAIRE_PUBLISHER', {userId: userId});

    qlog.info('Loading inbox for userId ====> ' + userId, filename);

    //QbSummary = new Mongo.Collection('qbank_summary', SearchConn);

    qlog.info('Printing IReceivedQuestionaire ==========> ' + JSON.stringify(IReceivedQuestionaire.find().fetch()));
});