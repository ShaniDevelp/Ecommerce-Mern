const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProductSchema = new Schema({

    title: {type : String, required: true},
    description: {type : String, required: true},
    price: {type: Number, required: true, min: [1, 'wrong min value'], max:[10000, 'wrong max value']},
    discountPercentage: {type: Number,  min: [1, 'wrong min discountPercentage'], max:[99,'wrong max discountPercentage']},
    rating: {type: Number, required: true, min: [0, 'wrong min rating'], max:[5, 'wrong max rating'], default: 0},
    stock: {type: Number, required: true, min: [1, 'wrong min rating'], default: 0},
    brand: {type: String, required: true, },
    category: {type: String, required: true, },
    thumbnail: {type: String, required: true, },
    deleted: {type: Boolean,default:false },
    images: {type: [String], required: true },
    


}); 


ProductSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  });

module.exports = mongoose.model('Product', ProductSchema);

