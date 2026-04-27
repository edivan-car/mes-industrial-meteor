import { Meteor } from 'meteor/meteor';
import {ProductionOrders} from "../imports/api/productionOrders/productionOrdersCollection";

import '../imports/api/machines/machinesCollection';
import '../imports/api/machines/machinesMethods';
import '../imports/api/machines/machinesPublications';
import '../imports/api/productionOrders/productionOrdersCollection';
import '../imports/api/productionOrders/productionOrdersMethods';
import '../imports/api/productionOrders/productionOrdersPublications';
import '../imports/api/operators/operatorsCollection';
import '../imports/api/operators/operatorsMethods';
import '../imports/api/operators/operatorsPublications';

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