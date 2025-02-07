import { type SchemaTypeDefinition } from 'sanity';
import chef from './chefs';
import foodSchema from './foods';
import userSchema from './userSchema';
import orderSchema from './orderSchema';
import review from './review';
import order from './order';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [foodSchema, chef, userSchema, orderSchema, review],
};
