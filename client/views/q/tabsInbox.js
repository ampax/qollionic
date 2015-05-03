// https://www.discovermeteor.com/blog/template-level-subscriptions/

Template.tabsInbox.helpers({
  all_questionaires: function() {
    return IReceivedQuestionaire.find();
  },
});

Template.tabsInbox.onCreated(function(){
  var userId = Meteor.userId();
    SearchConn.subscribe('RECVD_QUESTIONAIRE_PUBLISHER', {userId: userId});

    qlog.info('Loading inbox for userId ====> ' + userId, filename);

    //QbSummary = new Mongo.Collection('qbank_summary', SearchConn);

    qlog.info('Printing IReceivedQuestionaire ==========> ' + JSON.stringify(IReceivedQuestionaire.find().fetch()));
});