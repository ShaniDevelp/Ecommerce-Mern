const mongoose = require('mongoose');
const {Schema} = mongoose;

const OrderSchema = new Schema({

    items: {type : [Schema.Types.Mixed], required: true,},
    user: {type : mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    status: {type : String, required: true,},
    totalAmount: {type : Number, required: true,},
    totalItems: {type : Number, required: true,},
    paymentMethod: {type : String, required: true,},
    selectedAddress: {type : [Schema.Types.Mixed], required: true,},


}); 


OrderSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  });

module.exports = mongoose.model('Order', OrderSchema);

