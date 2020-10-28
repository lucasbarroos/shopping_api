import * as mongoose from 'mongoose';

const { Types } = mongoose;

export const ProductSchema = new mongoose.Schema({
    name: String,
    brand: String,
    amount: Number,
    image: { type: Types.ObjectId, ref: '' },
});