import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ProductionLogs } from './collection';

Meteor.methods({
    async 'productionLogs.insert'({ machineId, operatorId, opId, status, reason }) {
        check(machineId, String);
        check(operatorId, String);
        check(opId, String);
        check(status, String); // RUNNING, STOPPED, etc.
        check(reason, String); // Optional or "N/A"

        return await ProductionLogs.insertAsync({
            machineId,
            operatorId,
            opId,
            status,
            reason,
            timestamp: new Date(), // Server schedule (essential for OEE)
        });
    }
});