const mongoose = require('mongoose');
const {Schema} = mongoose;

const CategorySchema = new Schema({

    value: {type : String, required: true, unique: true},
    label: {type : String, required: true, unique: true},
}); 


CategorySchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  });

module.exports = mongoose.model('Category', CategorySchema);

