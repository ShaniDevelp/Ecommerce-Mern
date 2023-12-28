const mongoose = require('mongoose');
const {Schema} = mongoose;

const CartSchema = new Schema({

    quantity: {type : Number, required: true,},
    product: {type : mongoose.Schema.Types.ObjectId, ref: 'Product'},
    user: {type : mongoose.Schema.Types.ObjectId, ref: 'User'},


}); 


CartSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  });

module.exports = mongoose.model('Cart', CartSchema);

