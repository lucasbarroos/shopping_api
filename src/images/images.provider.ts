import { Connection } from 'mongoose';
import { ImagesSchema } from './images.schema';

export const imageProvider= [
    {
        provide: 'AVATAR_MODEL',
        useFactory: (connection: Connection) => connection.model('Images', ImagesSchema),
        inject: ['DATABASE_CONNECTION'],
    }
]