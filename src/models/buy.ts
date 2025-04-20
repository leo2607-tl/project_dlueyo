import mongoose, {Document, Model, Schema} from 'mongoose';

interface IBuy extends Document{
    id: string, 
    email: string,
    name: string,
    num_of_tickets: number,
    price_of_ticket: number,
    event_id: string,
}
const BuySchema: Schema<IBuy> = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    num_of_tickets: {
        type: Number,
        required: true,
    },
    price_of_ticket: {
        type: Number,
        required: true,
    },
    event_id: {
        type: String,
        required: true,
    }
})

const Buy: Model<IBuy> = 
    mongoose.models.Buy ||
    mongoose.model<IBuy>("Buy", BuySchema)
    
export default Buy;