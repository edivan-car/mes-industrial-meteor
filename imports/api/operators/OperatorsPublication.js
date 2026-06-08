import { Meteor } from "meteor/meteor";
import { OperatorsCollection } from "./OperatorsCollection";

Meteor.publish("operators", function (){
    return OperatorsCollection.find();
});