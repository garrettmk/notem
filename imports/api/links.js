import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Links = new Mongo.Collection('links');

Meteor.methods({
  'links.insert'(sourceId, targetId, type, meta = {}) {
    check(sourceId, String);
    check(targetId, String);
    check(type, String);
    check(meta, Object);

    Links.insert({
      createdAt: new Date(),
      sourceId,
      targetId,
      type,
      meta
    });
  },

  'links.remove'(linkId) {
    check(linkId, String);

    Links.remove(linkId);
  },

  'links.update'(linkId, updates) {
    check(linkId, String);
    check(updates, Object);

    Links.update(linkId, updates);
  },
});

if (Meteor.isServer) {
  Meteor.publish('links', function linksPublication() {
    return Links.find({});
  })
}