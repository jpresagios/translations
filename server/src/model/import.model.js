import { Schema, model } from "mongoose";

const importSchema = new Schema({
  file: { type: String, required: true },
  data: [{ type: Schema.Types.ObjectId, ref: "TranslationData" }],
  createdAt: { type: Date, default: Date.now }
});


export default model("Import", importSchema);
