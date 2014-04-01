var Stage = require("./Stage");
var DependencyTranslator = require("./DependencyTranslator");

/**
 * A pipeline that consists of various stages, each with a set of dependencies. The stages will be
 * automatically triggered when dependencies are changed, but later stages that depend on other 
 * stages will wait until after the earlier stage has completed before executing. This saves on
 * needless processing.
 */
function Pipeline() {
    this._stages = [];
}

Pipeline.prototype = Object.create(DependencyTranslator.prototype);

/**
 * Adds an execution stage to this pipeline. An execution stage depends on various dependencies 
 * which will trigger the execution function. The execution order of stages in the pipeline will be
 * dynamically managed to ensure each dependency is only called once in a given execution stack.
 * 
 * @param  {String} dependencyIds The IDs of the dependencies for this stage
 * @param  {Function} executionFunction The function that will be executed when any of the 
 *                                      dependencies have changed. The function should perform any 
 *                                      functions required and has the signature:
 *                                          function(pipeline, dependencyValues) {}
 */
Pipeline.prototype.addStage = function(dependencyIds, executionFunction)
{
    this._stages.push(new Stage(this, dependencyIds, executionFunction));
};

/**
 * Gets an array of all stages added to this pipeline. A stage is represented by a Stage object.
 * 
 * @return {Array<Stage>} An array of stages added to this pipeline
 */
Pipeline.prototype.getStages = function()
{
    return this._stages;
};

/**
 * Adds a {DependencyTranslator} class which provides functions for translating dependency ID strings
 * to actual data stores. The object passed in must implement all function defined in the {DependencyTranslator}
 * interface, or a TypeError will be thrown.
 * 
 * @param {DependencyTranslator} dependencyTranslator A {DependencyTranslator} object
 * @param {Array} dependencyIds The dependency IDs that the added translator can provide
 */
Pipeline.prototype.addDependencyTranslator = function(dependencyTranslator, dependencyIds)
{
    
};

/**
 * Gets the first {DependencyTranslator} object that is registered to translate the given dependencyId.
 * @param  {String} dependencyId The ID of the dependency whose translator is required
 * 
 * @return {DependencyTranslator} The translator for the given dependency ID
 */
Pipeline.prototype.getDependencyTranslator = function(dependencyId)
{
    
};

/**
 * Get all registered DependencyTranslator objects.
 * 
 * @return {Array} An array of objects containing all DependencyTranslator objects in the order they
 *                 are used to resolve dependency IDs, along with the dependency IDs they are 
 *                 registered to resolve. Each object in the array takes the format:
 *                     {
 *                         dependencyTranslator : <DependencyTranslator object>,
 *                         dependencyIds : [dependencyId, ...]
 *                     }
 */
Pipeline.prototype.getDependencyTranslators = function()
{
    
};

/**
 * DependencyTranslator interface
 * 
 * The Pipeline class hands these requests off to the DependencyTranslator class that has been
 * registered to handle dependencies with that ID.
 */
Pipeline.prototype.setDependency = function(dependencyId, value)
{

};

Pipeline.prototype.getDependency = function(dependencyId)
{
    
};

Pipeline.prototype.getDependencies = function(dependencyIds)
{
    
};

Pipeline.prototype.listenToDependency = function(dependencyId, changeCallback)
{
    
};

exports = module.exports = Pipeline;