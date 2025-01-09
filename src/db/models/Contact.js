import { Schema, model } from "mongoose";
import { contactTypeList } from "../../constants/contacts.js";

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: String,
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      enum: contactTypeList,
      required: true,
      default: "personal",
    },
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  { timestamps: true, versionKey: false }
);

const ContactCollection = model("contact", contactSchema);

export default ContactCollection;
