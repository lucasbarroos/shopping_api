import * as mongoose from 'mongoose';

export const ImagesSchema = new mongoose.Schema({
    originalName: String,
    filename: String,
    size: Number,
    type: String,
    url: String,
});