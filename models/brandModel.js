const mongoose = require('mongoose');
const {Schema} = mongoose;

const BrandSchema = new Schema({

    value: {type : String, required: true, unique: true},
    label: {type : String, required: true, unique: true},
}); 


BrandSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  });

module.exports = mongoose.model('Brand', BrandSchema);

