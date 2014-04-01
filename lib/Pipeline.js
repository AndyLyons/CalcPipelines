var Stage = require("./Stage");

function Pipeline() {
    this._stages = [];
}

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
    this._stages.push(new Stage(null, dependencyIds, executionFunction));
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
 * Sets the value of the dependency with the given ID, and triggers any pipeline stages that depend 
 * on it. The dependency ID will be resolved by the first {DependencyTranslator} added that is 
 * registered to handle it. If no {DependencyTranslator} is registered the default {VariableDependencyTranslator}
 * will be used.
 * 
 * @param {String} dependencyId The ID of the dependency whose value should be set
 * @param {Value} value The value to set the dependency to
 */
Pipeline.prototype.setDependency = function(dependencyId, value)
{

};

/**
 * Gets the value of the dependency with the given ID. The dependency ID will be resolved by the 
 * first {DependencyTranslator} added that is registered to handle it. If no {DependencyTranslator} 
 * is registered the default {VariableDependencyTranslator} will be used.
 * 
 * @param  {String} dependencyId The ID of the dependency whose value should be retrieved
 * 
 * @return {Value} The current value of the dependency with the given ID
 */
Pipeline.prototype.getDependency = function(dependencyId)
{
    
};

/**
 * Gets the value of all the dependencies with the given IDs. The dependency IDs will be resolved by 
 * the first {DependencyTranslator} added that is registered to handle them. If no {DependencyTranslator} 
 * is registered the default {VariableDependencyTranslator} will be used.
 * 
 * @param  {Array<String>} dependencyIds The IDs of the dependencies whose values should be retrieved
 * 
 * @return {Map<String, Value>} A map of dependency IDs to current dependency values
 */
Pipeline.prototype.getDependencies = function(dependencyIds)
{
    
};

/**
 * Adds a change callback to the dependency with the given ID which will be called any time the
 * value of the dependency is changed.
 * 
 * @param  {String} dependencyId The ID of the dependency whose value should be retrieved
 * @param  {Function} changeCallback A function to be called when the value of the given dependency
 *                                   is changed. The signature of the function is as follows:
 *                                       function(dependencyId, newValue, oldValue) {}
 */
Pipeline.prototype.listenToDependency = function(dependencyId, changeCallback)
{
    
};

exports = module.exports = Pipeline;