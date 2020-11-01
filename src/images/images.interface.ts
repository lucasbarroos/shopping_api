import { Document } from 'mongoose';
export interface imageInterface extends Document {
    readonly originalName: string,
    readonly filename: string,
    readonly size: number,
    readonly type: string,
    readonly url: string,
}