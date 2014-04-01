/**
 * Links together all the PiplinesJS files under a common namespace
 */

var Pipeline = require("./Pipeline");
var DependencyTranslator = require("./DependencyTranslator");

exports = module.exports = {
    Pipeline: Pipeline,
    DependencyTranslator: DependencyTranslator
};