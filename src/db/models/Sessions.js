import { Schema, model } from "mongoose";

const sessionsSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    accessTokenValidUntil: { type: Date, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false }
);

const SessionsCollection = model("sessions", sessionsSchema);

export default SessionsCollection;
