import * as mongoose from 'mongoose';

const { Types } = mongoose;

export const ProductSchema = new mongoose.Schema({
    name: String,
    brand: String,
    amount: Number,
    images: [{ type: Types.ObjectId, ref: 'images', default: null }],
});