Template.single_qoll_options.helpers({
	qoll_type_abbr : function(idx) {
		qlog.info('GOT IX 2' + idx, filename);
		return alphabetical[idx];
	},
	qoll_abbr_class : function(idx, context) {
		qlog.info('GOT IXXXXXX ' + idx + '/' + context, filename);
		console.log(context);
		if(context === QollConstants.CONTEXT.WRITE){
			return "class_" + idx;
		} else {
			return 'white_bg_5';
		}
	},
	transform_txt : function(txt, cat, context, fib) {
    qlog.info('Printing fill in the blanks - ' + fib, filename);
    if(cat != QollConstants.QOLL_TYPE.BLANK)
      return txt;

    var disabled = '';
    if(context === QollConstants.CONTEXT.READ)
      disabled = 'DISABLED';

    if(txt.match(QollRegEx.fib_transf))
      qlog.info('hell this is printed', filename);

    while (matches = QollRegEx.fib_transf.exec(txt)) {
      //qlog.info('matches - ' + matches, filename);
      var idx = matches[0].substring(1, matches[0].length-1);
      idx = Number(idx)+1;

            var placeholder = '';
            var fib_val = '';
            if(context === QollConstants.CONTEXT.READ) {
              //put the read only values for fib
              placeholder = idx + ':' + fib[idx-1];
            } else {
              if(fib == undefined)
                fib_val = '';
              else fib_val = fib[idx-1] == undefined ? '' : fib[idx-1];
              placeholder ='';
            }
            
            txt = txt.replace(matches[0], '<input class="textbox fib fib_write" type="text" placeholder="'+placeholder+ '" ' +disabled+' value="'+fib_val+'">');
            //cntr++;
            qlog.info('##############=> ' + idx, filename);
            //break;
        }

    return txt;
  },
  is_correct_answer : function(qollTypesX, context) {
  	console.log(qollTypesX);

		if(context === QollConstants.CONTEXT.WRITE) return false;

		if (qollTypesX == undefined)
			return false;
		if (qollTypesX.isCorrect) {
			return true;
		}
		
		return false;
	},
  get_qoll_resp_class : function(context) {
    console.log(context);
    if(context === QollConstants.CONTEXT.WRITE) {
      return 'qoll-response-val';
    } else return 'qoll-response-val-none';
  },
  is_chk_selected : function(idx,qoll) {
    //qlog.info('is chk selected: ' + JSON.stringify(this.parent.qollTypeReg), filename);
    if(qoll.myresponses && qoll.myresponses.length>idx){
      if(qoll.myresponses[idx]){
        return 'border-selected';
      }else{
        return '';
      }
    }
    var qollTypeReg = this.qollTypeReg
    if (qollTypeReg == undefined)
      return '';
    if (qollTypeReg[idx] === 1)
      return 'border-selected';
  },
});


Template.single_qoll_options.events({
  'click .qoll-response-val' : function(event) {
    event.preventDefault();
    var chk = $(event.target);
    console.log(this);
    console.log(chk);
    console.log(event.target);
    // console.log(event);
    var qoll =this.qoll;
    var qollType = this.qollType;
    var answered_or_unanswered;
    //If not a multiple choice question, remove the border-selected
    qlog.info('Printing ooooif this is multiple - ' + qoll.qollText + '/' + qoll.isMultiple);
    
    if (!qoll.isMultiple) {
      $(chk).parent().parent().parent().find('.border-selected').removeClass('border-selected');
      $(chk).addClass('border-selected');
      
    } else {
      if (chk.hasClass('border-selected')) {
        chk.removeClass('border-selected');
        answered_or_unanswered = 'unanswered';
      } else {
        chk.addClass('border-selected');
        answered_or_unanswered = 'answered';
      }
    }

    var qollId = this.qoll._id;
    var qollstionnaireId = this.qoll._qollstionnaireid;
    var answerIndex = qollType.index;
    var answerVal = qollType.type;
    var userId = Meteor.userId();

    qlog.info('youclicked: ' + qollstionnaireId, filename);
    qlog.info('youclickedon: ' + event, filename);
    qlog.info('youclickedid: ' + qollId, filename);
    qlog.info('the aindex =' + answerVal + '/' + answerIndex, filename);

    if (qollstionnaireId) {
      SearchConn.call('AddQollstionnaireResponseRemote', 
        {qollstionnaireId : qollstionnaireId, qollId : qollId, answerVal : answerVal, 
          answerIndex : answerIndex, userId : userId, answered_or_unanswered : answered_or_unanswered}, 
        function(err, qollRegId) {
        if (err) {
          qlog.error('Failed registering the qoll: ' + qollId + ' : ' + err, filename);
        } else {
          qlog.info('Registered qoll with id: ' + qollRegId + answerVal, filename);
          var saved_target = $('#' + qollId).find('span.saved-msg');
          saved_target.html('Response saved ...');
          saved_target.fadeOut(6400, 'swing', function() {
            saved_target.html('');
            saved_target.removeAttr("style");
          });
          qlog.info('The target is ----->' + chk.attr('class'), filename);
        }
      });
    } else {
      SearchConn.call('registerQollCustom', qollId, answerVal, answerIndex, function(err, qollRegId) {
        if (err) {
          qlog.error('Failed registering the qoll: ' + qollId + ' : ' + err, filename);
        } else {
          qlog.info('Registered qoll with id: ' + qollRegId + answerVal, filename);
          var saved_target = $('#' + qollId).find('span.saved-msg');
          saved_target.html('Response saved ...');
          saved_target.fadeOut(6400, 'swing', function() {
            saved_target.html('');
            saved_target.removeAttr("style");
          });
          qlog.info('The target is ----->' + chk.attr('class'), filename);
        }
      });
    }
    //$(event.target).closest("[class='qoll-response-val']").addClass('bg-orange');
  },
});

Template.single_qoll_options.onCreated(function(){
  // SearchConn.subscribe('images_cluster');

  qlog.info(">>>=========================<<<", filename);
  // console.log(Posts.find().fetch())


  var remote = DDP.connect('http://localhost:3000/');
  Items = new Meteor.Collection('images', remote); 

  remote.subscribe('images', function() {
    var items = Items.find();
    console.log('================== STARTING ON REMOTE CONNECTION ===================');
    console.log(items.count());  // get 1         
  });
});



