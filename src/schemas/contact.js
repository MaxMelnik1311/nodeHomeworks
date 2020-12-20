const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema } = mongoose;
const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Person name is required"],
  },
  email: {
    type: String,
    required: [true, "Person name is required"],
  },
  phone: {
    type: String,
    required: [true, "Person name is required"],
  },
  owner: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
});

contactSchema.plugin(mongoosePaginate);

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
