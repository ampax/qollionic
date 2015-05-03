var filename='client/views/q/qolls/view_qoll.js';

Template.view_qoll.helpers({
	qoll : function() {
		qlog.info('Called to get the qoll here ...', filename);
		console.log(RawQollForId.find());
		return RawQollForId.find({_id : Session.get('qoll_id')});
	},
	qollId : function() {
		return Session.get('qoll_id');
	},
	qollById : function() {
		var qoll = SearchConn.call("getQollById", Session.get('qoll_id'));
		qlog.info('.......................... ');
		console.log(qoll);
		return qoll;
	}
});


Template.view_qoll.onCreated(function(){
	var userId = Meteor.userId();
	var _id = this._id;

	var dataContext = Template.currentData();
	console.log(dataContext);
	console.log(this);

    SearchConn.subscribe('RAW_QOLL_FOR_ID_PUBLISHER', {userId: userId, _id : Session.get('qoll_id')});

    SearchConn.subscribe('images');
    
    qlog.info('Loading inbox for userId/_id ====> ' + userId + '/' + _id + '/' + Session.get('qoll_id'), filename);

    qlog.info('Printing RawQollForId ==========> ' + JSON.stringify(RawQollForId.find().fetch()));
});


Template.view_qoll.onDestroyed(function () {
  // deregister from some central store
  Session.set('qoll_id', undefined);
});