import mongoose, {Document, Model, Schema} from 'mongoose';

interface IMarathon extends Document{
    name: string;
    date: Date;
    time: string;
    description: string;
    location: string;
    price: number;
    id: string;
    num_: number;
};

const MarathonSchema: Schema<IMarathon> = new mongoose.Schema({
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
        required: true,
    },
});

const Marathon: Model<IMarathon> = 
    mongoose.models.Marathon ||
    mongoose.model<IMarathon>("Marathon", MarathonSchema)

export default Marathon;