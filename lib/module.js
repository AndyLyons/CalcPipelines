/**
 * Links together all the PiplinesJS files under a common namespace
 */

var Pipeline = require("./Pipeline");

exports = module.exports = {
    Pipeline: Pipeline,
    DependencyTranslator: DependencyTranslator
};