import mongoose from "mongoose";
import MongooseError from "../helpers/MongooseError.js";

const { Schema, model } = mongoose;

const dashboardSchema = new Schema(
  {
    name: { type: String, required: true },
    backgroundURL: { type: String, default: null },
    icon: { type: String, default: "" },
    currentDashboard: { type: Boolean, default: false, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  { versionKey: false, timestamps: true, strictPopulate: false }
);

dashboardSchema.post("save", MongooseError);

const Dashboard = model("dashboard", dashboardSchema);
export default Dashboard;
