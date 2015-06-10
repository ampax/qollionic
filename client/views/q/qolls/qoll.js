Template.single_qoll.helpers({
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
  get_units_html : function(q) {
    var unit_name = undefined, units = undefined;
    qlog.info('Printing unit values - ' + unit_name, + ' **/** ' + units, filename);
    console.log(q);
    if (units == undefined || units && units.length === 0)
      return '';

    var qollTypeVal = this.qollTypeVal;
    var unitSelected = qollTypeVal ? qollTypeVal.unitSelected : '';

    var units_html = '<div class="input-group">';
    if (unit_name)
      units_html += unit_name + ': ';
    else
      unit_name += 'Unit: ';
    units.map(function(unit) {
      var checked = '';
      if (unit === unitSelected)
        checked = 'checked';
      units_html += '<input name="unit" value="' + unit + '" type="radio" ' + checked + '>' + unit + '&nbsp;&nbsp;';
    });
    units_html += '</div>';

    return units_html;
  },
  is_unit_selected : function(unit_selected) {
    return this.toString() === unit_selected ? 'checked' : '';
  },
  get_hint_visibility : function(usedHint, context, hint) {
    if(usedHint) {
      return '';
    } else {
      return 'is-invisible';
    }
  },
  is_not_blank_type : function(cat) {
    return !_.contains([QollConstants.QOLL_TYPE.BLANK, QollConstants.QOLL_TYPE.BLANK_DBL], cat);
  },
  has_images : function(img_ids) {
    // console.log('=========>' + img_ids);
    if(img_ids != undefined && img_ids.length > 0) {
      qlog.info('Returning true ....');
      return true;
    } else {
      return false;
    }
  },
  imgs1 : function(img_ids) {
      console.log('------------------------');
      console.log(img_ids);

      if(!img_ids) return [];
      var imgs1 = SearchConn.call("images_for_ids", img_ids);
      var imgs2 = FetchImages.find({'_id': {$in: img_ids}});
      console.log('------------------------');
      console.log(imgs1);
      console.log('------------------------');
      console.log(imgs2.fetch());
      return img_ids;
    },
    imgs: function(img_ids) {
      console.log(img_ids);
      if(!img_ids) return [];
      var imgs1 = QollImages.find({'_id': {$in: img_ids}});
      return imgs1;
      //return [];
    },
    is_blank_type : function(cat) {
    return _.contains([QollConstants.QOLL_TYPE.BLANK, QollConstants.QOLL_TYPE.BLANK_DBL], cat);
  },
  get_register_class : function(context) {
    console.log(context);
    if(context === QollConstants.CONTEXT.READ) {
      return 'register-blank-none';
    } else return 'register-blank';
  },
  get_register_bg_class : function(context) {
    console.log(context);
    if(context === QollConstants.CONTEXT.READ) {
      return 'white_bg_5';
    } else return 'green_bg_1';
  },
});

Template.single_qoll.events({
  'click button#show_hint' : function(event) {
    event.preventDefault();
    var target = $(event.target);
    qlog.info('show hint clicked', filename);
    target.parent().find('#hint').removeClass('is-invisible');

    var qollId = this.q._id;
    var qollstionnaireId = this.q._qollstionnaireid;

    qlog.info('qollid/qollstionnaireId ' + qollId + '/' + qollstionnaireId);
    
    Meteor.call('registerHint', qollId, qollstionnaireId, function(err, qollstid) {
      if (err) {
        qlog.error('Failed registering hint: ' + qollId + ' : ' + err, filename);
      } else {
        qlog.info('Used hint for the qoll ... ', filename);
      }
    });
  },
});

Template.single_qoll.onCreated(function(){
  this.subscribe('images');
  
  // SearchConn.subscribe('images');
    
  qlog.info('Loading inbox for userId ====> ' + userId, filename);

  //QbSummary = new Mongo.Collection('qbank_summary', SearchConn);

  // qlog.info('Printing images ==========> ' + JSON.stringify(FetchImages.find().fetch()));
});


