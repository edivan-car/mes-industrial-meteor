import { Meteor } from 'meteor/meteor';
import { Operators } from './operatorsCollection';

Meteor.publish('operators.all', function () {
    return Operators.find();
});