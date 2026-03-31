import { Meteor } from 'meteor/meteor';

import '../imports/api/machines/collection';
import '../imports/api/machines/methods';
import '../imports/api/machines/publications';
import '../imports/api/productionOrders/collection';
import '../imports/api/productionOrders/methods';
import '../imports/api/productionOrders/publications';

Meteor.startup(() => {
  // código inicial vazio
});