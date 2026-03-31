import {Meteor} from 'meteor/meteor';
import {ProductionOrders} from './collection';

Meteor.methods({
    'productionOrders.insert'(data) {
// Basic authentication validation
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

// Business rule: check if the machine already has an active work order.
        const activeOrder = ProductionOrders.findOne({
            machineId: data.machineId,
            status: 'IN_PROGRESS'
        });

        if (activeOrder) {
            throw new Meteor.Error('A máquina selecionada já possui uma OP em andamento.');
        }

// Insert the new production order
        return ProductionOrders.insertAsync({
            product: data.product,
            quantityPlanned: data.quantityPlanned,
            status: 'IN_PROGRESS', // It starts automatically when in progress or 'PLANNED'.
            machineId: data.machineId,
            createdAt: new Date(),
            createdBy: this.userId
        });
    },

    'productionOrders.updateStatus'(orderId, newStatus) {
// Status list based on requirements.
        const allowedStatus = ['IN_PROGRESS', 'PAUSED', 'FINISHED'];

        if (!allowedStatus.includes(newStatus)) {
            throw new Meteor.Error('Status inválido');
        }

        return ProductionOrders.updateAsync(orderId, {
            $set: {status: newStatus}
        });
    }
});