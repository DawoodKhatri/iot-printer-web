import { Schema, model, models } from "mongoose";

const serverConfigSchema = new Schema(
  {
    type: { type: String, required: true },
    data: { type: Object, required: true },
  },
  { versionKey: false }
);

const ServerConfig =
  models.ServerConfig || model("ServerConfig", serverConfigSchema);

export default ServerConfig;
