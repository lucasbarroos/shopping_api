import * as mongoose from 'mongoose';

export const AvatarsSchema = new mongoose.Schema({
    originalName: String,
    fileName: String,
    path: String,
    size: Number,
    type: String,
});