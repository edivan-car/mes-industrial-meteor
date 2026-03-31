import { Meteor } from 'meteor/meteor';
import { Operators } from './collection';

Meteor.methods({
    'operators.insert'(data) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized');
        }
        // Add the operator with the shift.
        return Operators.insertAsync({
            name: data.name,
            shift: data.shift, // Turno: A, B, C
            createdAt: new Date()
        });
    },
    'operators.remove'(operatorId) {
        if (!this.userId) throw new Meteor.Error('Not authorized');
        return Operators.removeAsync(operatorId);
    }
});