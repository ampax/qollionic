
Template.tabsAllqolls.helpers({
  times: function () {
    var times = [];
    _(20).times(function(n){
      times.push(n);
    });
    return times;
  },

  all_qolls: function() {
  	return QbSummary.find();
  },
});


Template.tabsAllqolls.events({
  'click .view-qoll' : function(event) {
    event.preventDefault();

    qlog.info('I have been clicked for - ');
    console.log(this);
  }
});

Template.tabsAllqolls.onCreated(function(){
	var userId = Meteor.userId();
    SearchConn.subscribe('QBANK_SUMMARY_PUBLISHER', {userId: userId});
    
    qlog.info('Loading inbox for userId ====> ' + userId, filename);

    //QbSummary = new Mongo.Collection('qbank_summary', SearchConn);

    qlog.info('Printing QbSummary ==========> ' + JSON.stringify(QbSummary.find().fetch()));
});