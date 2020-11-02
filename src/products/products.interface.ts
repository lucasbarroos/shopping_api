import { Document } from 'mongoose';
export interface productInterface extends Document {
    readonly name: string;
    readonly brand: string;
    readonly amount: number;
    readonly images: any;
}