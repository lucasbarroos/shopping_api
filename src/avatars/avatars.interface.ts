import { Document } from 'mongoose';
export interface avatarInterface extends Document {    
    readonly originalName: string,
    readonly fileName: string,
    readonly path: string,
    readonly size: number,
    readonly type: string,
}