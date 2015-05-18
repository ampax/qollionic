Schemas = {};

Template.registerHelper("Schemas", Schemas);


/******* Single quick qoll collectoin less schema *******/
quick_qoll = new SimpleSchema({
  /** send_to: {
    type: [String],
    label: "Send To",
    // regEx: SimpleSchema.RegEx.Email,
    max: 500,
    // optional: true
  }, **/
  title: {
    type: String,
    label: "Title",
    max: 50
  },
  text: {
    type: String,
    label: "Qoll",
    min: 10,
    max: 200
  },
  image: {
    type: String,
    label: "Image",
    min: 60,
    max: 400,
    optional: true
  },
  options: {
    type: Array,
    label: "Qoll Options",
    optional: false
  },
  'options.$': {
    type: String
  }
});


//Products = new Mongo.Collection('products');

//Schemas.quick_qoll = new SimpleSchema({
//Products.attachSchema(new SimpleSchema({
product = new SimpleSchema({
  url: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: 'Product URL'
    },
    max: 200
  },
  name: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: 'Product Name'
    },
    max: 200
  },
  tagline: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: 'Tagline'
    },
    max: 200
  },
  userId: {
    type: String,
    autoValue: function () {
      if (this.isSet) {
        return;
      }
      if (this.isInsert) {
        return Meteor.userId();
      } else {
        this.unset();
      }
    }
  },
  voterIds: {
    type: [String],
    optional: true,
    defaultValue: []
  },
  numberOfVotes: {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  numberOfComments: {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  createdAt: {
    type: Date
  }
})
//)
;
