
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

  is_selected: function(qollid) {
    var sel_qolls = Session.get("selected_qoll_ids");
    
    if(sel_qolls && _.indexOf(sel_qolls, qollid) != -1) {
      return true;
    } else {
      return false;
    }

  }
});


Template.tabsAllqolls.events({
  'click .view-qoll' : function(event) {
    event.preventDefault();

    qlog.info('I have been clicked for - ');
    console.log(this);
  },
  'click .add-for-quest' : function(event) {
    event.preventDefault();
    console.log(this);

    var sel_qolls = Session.get("selected_qoll_ids");

    qlog.info('Qoll id is - ' + "qoll"+this._id);
    // target.toggleClass('qoll-thumbs-toggle');
    /** jQuery("button#qoll"+this._id).removeClass('add-for-quest button-calm').addClass('remove-for-quest button-positive');
    jQuery("button#qoll"+this._id +" > i.icon").removeClass("ion-plus").addClass('ion-minus'); **/

    jQuery("a#qoll"+this._id).removeClass('add-for-quest ion-android-radio-button-off').addClass('remove-for-quest ion-android-radio-button-on');
    // jQuery("a#qoll"+this._id +" > i.icon").removeClass("ion-plus").addClass('ion-minus');

    var selected_qoll_ids = Session.get('selected_qoll_ids');
    selected_qoll_ids.push(this._id);
    Session.set("selected_qoll_ids", selected_qoll_ids);
    // $( "p" ).removeClass( "myClass noClass" ).addClass( "yourClass" );

    /** var sel_imgs_tmp = _.without(sel_imgs, this._id);

    if(sel_imgs.length === sel_imgs_tmp.length) {
        sel_imgs_tmp.push(this._id);
    }

    //Session.set("selected_images", sel_imgs);
    Session.set("selected_qoll_ids", sel_imgs_tmp); **/

  },
  'click .remove-for-quest' : function(event) {
    event.preventDefault();
    qlog.info('clicked to remove this id');

    /** jQuery("button#qoll"+this._id).removeClass('remove-for-quest button-positive').addClass('add-for-quest button-calm');
    jQuery("button#qoll"+this._id +" > i.icon").removeClass("ion-minus").addClass('ion-plus'); **/

    jQuery("a#qoll"+this._id).removeClass('remove-for-quest ion-android-radio-button-on').addClass('add-for-quest ion-android-radio-button-off');

    var selected_qoll_ids = Session.get('selected_qoll_ids');
    var selected_qoll_ids_tmp = _.without(selected_qoll_ids, this._id);
    Session.set("selected_qoll_ids", selected_qoll_ids_tmp);
  },
});

Template.tabsAllqolls.onCreated(function(){
	var userId = Meteor.userId();
    SearchConn.subscribe('QBANK_SUMMARY_PUBLISHER', {userId: userId});
    
    if(!Session.get('selected_qoll_ids'))
      Session.set("selected_qoll_ids", new Array());
});

