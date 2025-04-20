import mongoose, { Document, Model, Schema } from "mongoose";

interface IPickerBall extends Document {    
    name: string;
    date: Date;
    time: string;
    description: string;
    num_: number;
    location: string;
    price: number;
    id: string;
}

const PickerBallSchema: Schema<IPickerBall> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  num_: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const PickerBall: Model<IPickerBall> =
  mongoose.models.PickerBall ||
  mongoose.model<IPickerBall>("PickerBall", PickerBallSchema);

export default PickerBall;