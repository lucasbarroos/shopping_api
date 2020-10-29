import * as mongoose from 'mongoose';

export const AvatarsSchema = new mongoose.Schema({
    originalName: String,
    filename: String,
    path: String,
    size: Number,
    type: String,
});