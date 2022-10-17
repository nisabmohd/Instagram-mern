const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports=new mongoose.model('tokens',TokenSchema)