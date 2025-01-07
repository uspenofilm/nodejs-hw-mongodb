import { Schema, model } from "mongoose";

const sessionsSchema = new Schema({
  userId: { type: String, required: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  accessTokenValidUntil: { type: Date, required: true },
  refreshTokenValidUntil: { type: Date, required: true },
});

const SessionsCollection = model("sessions", sessionsSchema);

export default SessionsCollection;
