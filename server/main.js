import { Meteor } from 'meteor/meteor';
import {ProductionOrders} from "../imports/api/productionOrders/collection";

import '../imports/api/machines/collection';
import '../imports/api/machines/methods';
import '../imports/api/machines/publications';
import '../imports/api/productionOrders/collection';
import '../imports/api/productionOrders/methods';
import '../imports/api/productionOrders/publications';
import '../imports/api/operators/collection';
import '../imports/api/operators/methods';
import '../imports/api/operators/publications';

Meteor.startup(async () => {
    // 1. We check if there are already OPs in the database.
    const opCount = await ProductionOrders.find().countAsync();

    if (opCount === 0) {
        console.log('--- PPCP Simulation: Initializing Production Orders ---');

        // 2. We read your JSON from the private folder.
        try {
            const jsonContent = await Assets.getTextAsync('production_orders.json');
            const opsData = JSON.parse(jsonContent);

            for (const op of opsData) {
                await ProductionOrders.insertAsync({
                    ...op,
                    createdAt: new Date(),
                    status: 'RELEASED' // Standard for production-ready work orders.
                });
            }

            console.log(`Sucesso: ${opsData.length} OPs carregadas.`);
        } catch (err) {
            console.error('Erro ao importar JSON de OPs: ', err);
        }
    }
});