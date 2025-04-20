import mongoose, {Document, Schema, Model, NumberSchemaDefinition} from 'mongoose';

interface ITennis extends Document {
    name: string,
    description: string,
    date: Date,
    time: string,
    location: string,
    price: number,
    num_: number,
    id: string,
}

const TennisSchema: Schema<ITennis> = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
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
    location: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    num_: {
        type: Number,
        required: true
    }
})

const Tennis : Model <ITennis> =
    mongoose.models.Tennis ||
    mongoose.model<ITennis>("Tennis", TennisSchema)

export default Tennis;
