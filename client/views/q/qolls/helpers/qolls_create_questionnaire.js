Template.qolls_create_questionnaire.helpers({

	tocreatequest_qolls : function() {
		var selected_qoll_ids = Session.get('selected_qoll_ids');
		console.log("toshare_qolls =====");
		console.log(selected_qoll_ids);

		if(selected_qoll_ids) return AllMyActiveQolls.find( { _id : { $in : selected_qoll_ids }} );
		return [];
	}
});

Template.qolls_create_questionnaire.events({
	'click a.store-quest' :function(event) {
		event.preventDefault();

		var userId = Meteor.userId();

		var selected_qoll_ids = Session.get('selected_qoll_ids');
		if(!selected_qoll_ids) Router.go('tabs.allqolls');

		var title = jQuery("input#quest_title").val();

		var recips = jQuery("input#share_with").val();

		var emailsandgroups = [];
		var accessGroups = [];
		$.each(recips.split(/;|,/), function(ix, email) {
			email = $.trim(email);
			if (email.length > 0) {
				emailsandgroups.push(email);
			}
		});

		qlog.info('storing questionaire --- ');

		SearchConn.call("addQollstionnaire", emailsandgroups, title, ['test'], QollConstants.STATUS.STORED, selected_qoll_ids, userId, 
			function(err){
			if(err) console.log(err);
			else console.log('created new questionnaire.... ');
		});
		Session.set('selected_qoll_ids', []);
		Router.go('tabs.allqolls');
	},
	'click a.send-quest' :function(event) {
		event.preventDefault();

		var userId = Meteor.userId();

		var selected_qoll_ids = Session.get('selected_qoll_ids');
		if(!selected_qoll_ids) Router.go('tabs.allqolls');

		var title = jQuery("input#quest_title").val();

		var recips = jQuery("input#share_with").val();

		var emailsandgroups = [];
		var accessGroups = [];
		$.each(recips.split(/;|,/), function(ix, email) {
			email = $.trim(email);
			if (email.length > 0) {
				emailsandgroups.push(email);
			}
		});

		qlog.info('creating/send questionaire --- ');
		console.log(selected_qoll_ids);
		console.log(emailsandgroups);
		console.log(title);
		
		SearchConn.call("addQollstionnaire", emailsandgroups, title, ['test'], QollConstants.STATUS.SENT, selected_qoll_ids, userId, 
			function(err){
			if(err) console.log(err);
			else console.log('created new questionnaire.... ');
		});
		
		Session.set('selected_qoll_ids', []);

		Router.go('tabs.allqolls');
	}
});


Template.qolls_create_questionnaire.onCreated(function(){
	var selected_qoll_ids = Session.get('selected_qoll_ids');
	if(!selected_qoll_ids) Router.go('tabs.allqolls');


  	var userId = Meteor.userId();
    SearchConn.subscribe('All_MY_ACTIVE_QOLLS', {userId: userId});

    qlog.info('Loading share-qolls for userId ====> ' + userId, filename);

	// qlog.info('Printing Qoll for Ids ==========> ' + JSON.stringify(QollForIds.find().fetch()));
});