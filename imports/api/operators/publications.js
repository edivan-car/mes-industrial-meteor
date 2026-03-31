import { Meteor } from 'meteor/meteor';
import { Operators } from './collection';

Meteor.publish('operators.all', function () {
    return Operators.find();
});