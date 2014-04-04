/**
 * Manages dependencies and the dependency translators registered to them
 */
function DependencyManager() {
    this._dependencyTranslators = {};
}

/**
 * Adds a {DependencyTranslator} class which provides functions for translating dependency ID strings
 * to actual data stores. The object passed in must implement all function defined in the {DependencyTranslator}
 * interface, or a TypeError will be thrown.
 * 
 * @param {DependencyTranslator} dependencyTranslator A {DependencyTranslator} object
 * @param {Array} dependencyIds The dependency IDs that the added translator can provide
 */
DependencyManager.prototype.addDependencyTranslator = function(dependencyTranslator, dependencyIds)
{
    var duplicateIds = [];

    var pipeline = this;
    function registerDependency(dependencyId) {
        if(pipeline._dependencyTranslators.hasOwnProperty(dependencyId)) {
            duplicateIds.push(dependencyId);
        }
        pipeline._dependencyTranslators[dependencyId] = dependencyTranslator;
    };

    dependencyIds.forEach(registerDependency);

    if(duplicateIds.length) {
        var idList = duplicateIds.join(", ");
        throw new Error("The dependencies with IDs '" + idList + "' already have DependencyTranslator's registered.");
    }
};

/**
 * Gets the first {DependencyTranslator} object that is registered to translate the given dependencyId.
 * @param  {String} dependencyId The ID of the dependency whose translator is required
 * 
 * @return {DependencyTranslator} The translator for the given dependency ID
 */
DependencyManager.prototype.getDependencyTranslator = function(dependencyId)
{
    return this._dependencyTranslators[dependencyId] || null;
};

/****************************************************
 * DependencyTranslator interface
 * 
 * These are convenience methods to easily work with dependencies without having to manually go
 * through the DependencyTranslator objects. The DependencyManager class hands these requests off to 
 * the DependencyTranslator class that has been registered to handle dependencies with that ID.
 ****************************************************/
DependencyManager.prototype.setDependency = function(dependencyId, value)
{
    var dependencyTranslator = this.getDependencyTranslator(dependencyId);
    dependencyTranslator.setDependency(dependencyId, value);
};

DependencyManager.prototype.getDependency = function(dependencyId)
{
    var dependencyTranslator = this.getDependencyTranslator(dependencyId);
    dependencyTranslator.getDependency(dependencyId);
};

/**
 * The manager provides some extra functionality over just proxying the getDependencies call to the
 * DependencyTranslator objects, as it also combines the responses into a single map.
 */
DependencyManager.prototype.getDependencies = function(dependencyIds)
{
    var dependencies = {};

    var translators = this._gatherDependencyTranslatorsForIds(dependencyIds);
    for(var i = 0, l = translators.length; i < l; ++i)
    {
        var translatorInfo = translators[i];
        var translator = translatorInfo.translator;
        var translatorDependencyIds = translatorInfo.dependencyIds;

        var translatorDependencies = translator.getDependencies(translatorDependencyIds);
        this._mergeMaps(dependencies, translatorDependencies);
    }

    return dependencies;
};

DependencyManager.prototype.listenToDependency = function(dependencyId, changeCallback)
{

};

/******************************************
 * Private
 ******************************************/
// Builds an array of objects, where each object contains a reference to a dependency translator and 
// the dependency IDs it provides
DependencyManager.prototype._gatherDependencyTranslators = function()
{
    var translators = [];

    function translatorMatches(translatorToMatch, translatorInfo) {
        return translatorInfo.translator === translatorToMatch;
    }

    for(var dependencyId in this._dependencyTranslators) {
        var dependencyTranslator = this.getDependencyTranslator(dependencyId);
        var matchingTranslators = translators.filter(translatorMatches.bind(this, dependencyTranslator));
        if(matchingTranslators.length === 0) {
            translators.push({
                translator: dependencyTranslator,
                dependencyIds: [dependencyId]
            });
        } else {
            matchingTranslators[0].dependencyIds.push(dependencyId);
        }
    }

    return translators;
};

DependencyManager.prototype._gatherDependencyTranslatorsForIds = function(dependencyIds)
{
    function dependencyIsInRequestedList(dependencyId) {
        return dependencyIds.indexOf(dependencyId) >= 0;
    }

    function translatorProvidesARequestedDependency(translatorInfo) {
        translatorInfo.dependencyIds = translatorInfo.dependencyIds.filter(dependencyIsInRequestedList);
        return translatorInfo.dependencyIds.length >= 0;
    }

    var translators = this._gatherDependencyTranslators();
    return translators.filter(translatorProvidesARequestedDependency);
};

// Adds all the key/values from the second map to the first. This modifies the original object, and
// any duplicate keys are overwritten
DependencyManager.prototype._mergeMaps = function(mergeInto, mergeFrom)
{
    for(var key in mergeFrom) {
        mergeInto[key] = mergeFrom[key];
    }
};

exports = module.exports = DependencyManager;