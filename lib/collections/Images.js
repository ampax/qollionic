var filename='lib/collections/Images.js';

/** 
SearchConn1 = Cluster.discoverConnection('qollserver');
var Posts = new Mongo.Collection('images', SearchConn1);

var createSquareThumb = function(fileObj, readStream, writeStream) {
  var size = '96';
  gm(readStream).autoOrient().resize(size, size + '^').gravity('Center').extent(size, size).stream('PNG').pipe(writeStream);
};

thumbStore_1 = new FS.Store.GridFS("thumbs_1", { transformWrite: createSquareThumb});

QollImagesPub =  new Mongo.Collection('qoll-images');

imageStore = new FS.Store.GridFS("images1");

QollImages = new FS.Collection("images", {
    stores: [
      thumbStore_1,
      new FS.Store.GridFS("images"),
      new FS.Store.GridFS("thumbs", {
        transformWrite: function(fileObj, readStream, writeStream) {
          // Transform the image into a 10x10px thumbnail
          gm(readStream, fileObj.name()).resize('40', '40').stream().pipe(writeStream);
        }
      })
    ],
    filter: {
      allow: {
        contentTypes: ['image/*'] //allow only images in this FS.Collection
      }
    }
});

QollImages.allow({
 download: function(userId, doc){
  return true;//return doc && Meteor.userId && userId == doc.userId;
 }
});**/

