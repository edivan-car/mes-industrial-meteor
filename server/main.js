import { Meteor } from "meteor/meteor";
import { OperatorsCollection } from "/imports/api/operators/OperatorsCollection";
import "/imports/api/operators/OperatorsPublication";
import fs from "fs";
import path from "path";

Meteor.startup(async () => {

    // TEMPORÁRIO: limpar collection para repopular com novos campos
    // await OperatorsCollection.removeAsync({});

    const count = await OperatorsCollection.find().countAsync();

    if (count === 0) {
        console.log("Populando operadores...");

        const filePath = path.join(process.env.PWD || process.cwd(), "private", "users-mock.json");
        const text = fs.readFileSync(filePath, "utf8");
        const data = JSON.parse(text);

        for (const user of data) {
            await OperatorsCollection.insertAsync(user);
        }

        console.log(`${data.length} operadores inseridos.`);
    }
});