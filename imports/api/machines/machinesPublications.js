import { meteor } from 'meteor/meteor';
import { Machines } from './machinesCollection';

Meteor.publish('machines.all', function () {
    return Machines.find();
})