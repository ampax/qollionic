

/**Meteor.publish('images', function() {
  qlog.info('================> Received publish image from ionic (probably) <====================', filename);
  return QollImages.find();
});**/

/** Meteor.publish("images", function(){
  return Images.find();
}); **/

Meteor.publish('images', function() {
  qlog.info('Received publish image from ionic (probably)', filename);

  console.log(QollImages.find().fetch());

  return QollImages.find();
});

Meteor.methods({
  images_for_ids : function(img_ids) {
    qlog.info('Received request for images for ids - ' + img_ids, filename);
    var imgs_found = QollImages.find({'_id': {$in: img_ids}}).fetch();
    qlog.info('=====================> ' + imgs_found);
    return imgs_found;
  },
});