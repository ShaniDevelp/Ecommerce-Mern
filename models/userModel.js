const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({

    email: {type : String, required: true, unique:true},
    password: {type : Buffer, required: true},
    role: {type : String, required: true, dafault: 'user'},
    addresses: {type : [Schema.Types.Mixed]},
    salt: Buffer


}); 


UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
    },
  });

module.exports = mongoose.model('User', UserSchema);

