import {Meteor} from 'meteor/meteor';
import {ProductionOrders} from './productionOrdersCollection';

// Publish all work orders for monitoring.
Meteor.publish('productionOrders.all', function () {
    return ProductionOrders.find();
});

// Publish only the active OP of a specific machine.
Meteor.publish('productionOrders.activeByMachine', function (machineId) {
    return ProductionOrders.find({machineId, status: 'IN_PROGRESS'});
});