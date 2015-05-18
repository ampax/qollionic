Template.qolls_share.helpers({

	toshare_qolls : function() {
		var selected_qoll_ids = Session.get('selected_qoll_ids');
		console.log("toshare_qolls =====");
		console.log(selected_qoll_ids);

		if(selected_qoll_ids) return AllMyActiveQolls.find( { _id : { $in : selected_qoll_ids }} );
		return [];
	}
});

Template.qolls_share.events({
	'click a.qolls-share' :function(event) {
		event.preventDefault();

		var selected_qoll_ids = Session.get('selected_qoll_ids');
		if(!selected_qoll_ids) Router.go('tabs.allqolls');

		var recips = jQuery("input#share_with").val();

		var emailsandgroups = [];
		var accessGroups = [];
		$.each(recips.split(/;|,/), function(ix, email) {
			email = $.trim(email);
			if (email.length > 0) {
				emailsandgroups.push(email);
			}
		});

		qlog.info('sharing qolls --- ');
		console.log(selected_qoll_ids);
		console.log(emailsandgroups);

		SearchConn.call("shareQolls", selected_qoll_ids, emailsandgroups);
		Session.set('selected_qoll_ids', []);
		Router.go('tabs.allqolls');
	}
});


Template.qolls_share.onCreated(function(){
	var selected_qoll_ids = Session.get('selected_qoll_ids');
	if(!selected_qoll_ids) Router.go('tabs.allqolls');

    var userId = Meteor.userId();
    SearchConn.subscribe('All_MY_ACTIVE_QOLLS', {userId: userId});

    qlog.info('Loading share-qolls for userId ====> ' + userId, filename);

	// qlog.info('Printing Qoll for Ids ==========> ' + JSON.stringify(QollForIds.find().fetch()));
});

// 52.5"L x 27.5"W x 5.5"H 