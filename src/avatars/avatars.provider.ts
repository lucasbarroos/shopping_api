import { Connection } from 'mongoose';
import { AvatarsSchema } from '../avatars/avatars.schema';

export const avatarProvider= [
    {
        provide: 'AVATAR_MODEL',
        useFactory: (connection: Connection) => connection.model('Avatars', AvatarsSchema),
        inject: ['DATABASE_CONNECTION'],
    }
]