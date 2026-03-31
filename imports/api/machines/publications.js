import { meteor } from 'meteor/meteor';
import { Machines } from './collection';

Meteor.publish('machines.all', function () {
    return Machines.find();
})