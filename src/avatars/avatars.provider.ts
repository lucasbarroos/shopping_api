import { Connection } from 'mongoose';
import { ProductSchema } from '../products/products.schema';

export const avatarProvider= [
    {
        provide: 'PRODUCT_MODEL',
        useFactory: (connection: Connection) => connection.model('Products', ProductSchema),
        inject: ['DATABASE_CONNECTION'],
    }
]