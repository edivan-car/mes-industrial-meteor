import { Mongo } from 'meteor/mongo';

// Export the collection of production orders [1, 2]
export const ProductionOrders = new Mongo.Collection('productionOrders');