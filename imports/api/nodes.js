import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Nodes = new Mongo.Collection('nodes');

Meteor.methods({
  'nodes.insert'(title, position) {
    check(title, String);
    check(position, { x: Number, y: Number });

    Nodes.insert({
      createdAt: new Date(),
      title,
      position,
    });
  },

  'nodes.remove'(nodeId) {
    check(nodeId, String);

    Nodes.remove(nodeId);
  },

  'nodes.update'(nodeId, updates) {
    // check(nodeId, String);
    Nodes.update(nodeId, updates);
  },
});

if (Meteor.isServer) {
  Meteor.publish('nodes', function nodesPublication() {
    return Nodes.find({});
  })
}