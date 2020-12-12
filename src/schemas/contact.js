const mongoose = require("mongoose");
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

  features: {
    type: Array,
    set: (data) => (!data ? [] : data),
  },
});

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
