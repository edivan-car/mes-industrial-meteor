import { Meteor } from "meteor/meteor";
import { OperatorsCollection } from "./OperatorsCollection";
import {data} from "autoprefixer";

Meteor.publish("operators", function (){
    return OperatorsCollection.find();
});