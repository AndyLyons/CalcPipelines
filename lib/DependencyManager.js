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

};

DependencyManager.prototype.getDependency = function(dependencyId)
{
    
};

DependencyManager.prototype.getDependencies = function(dependencyIds)
{
    
};

DependencyManager.prototype.listenToDependency = function(dependencyId, changeCallback)
{
    
};

exports = module.exports = DependencyManager;