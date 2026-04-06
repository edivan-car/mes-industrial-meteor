import { Mongo } from 'meteor/mongo';

// Export the collection of production orders
export const ProductionOrders = new Mongo.Collection('productionOrders');