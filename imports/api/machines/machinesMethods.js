import { Meteor } from 'meteor/meteor';
import { Machines } from './machinesCollection';

Meteor.methods({
    'machines.insert'(data) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        const machine = {
            name: data.name,
            status: 'STOPPED', // initial pattern
            createdAt: new Date(),
        };

        return Machines.insertAsync(machine);
    },

    'machines.updateStatus'(machineId, status) {
        const allowedStatus = ['RUNNING', 'STOPPED', 'FAILURE'];

        if (!allowedStatus.includes(status)) {
            throw new Meteor.Error('invalid-status');
        }

        return Machines.updateAsync(machineId, {
            $set: { status },
        });
    },
});