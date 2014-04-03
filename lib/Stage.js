/**
 * Data model for a Stage of a pipeline. A Stage has a list of dependencies and a function to 
 * execute when the dependencies have changed. It also has a reference to the Pipeline that created
 * it, which is passed into the execution function when it's executed.
 * 
 * @param {Pipeline} pipeline The Pipeline that this stage belongs to
 * @param {Array<String>} dependencyIds A list of dependency IDs that will trigger this Stage
 * @param {Function} executionFunction The function to execute when this stage is triggered
 */
function Stage(pipeline, dependencyIds, executionFunction) {
    this._pipeline = pipeline;
    this._dependencyIds = dependencyIds;
    this._executionFunction = executionFunction;
}

/**
 * @return {Array<String>} Dependency IDs that this stage depends on
 */
Stage.prototype.getDependencyIds = function()
{
    return this._dependencyIds;
};

/**
 * Immediately invokes this Stage's execution function with the pipeline this stage belongs to and 
 * the current dependency values.
 * 
 * @param  {Map} dependencyValues A map of dependency ID to values to execute this stage with.
 */
Stage.prototype.execute = function(dependencyValues)
{
    this._executionFunction(this._pipeline, dependencyValues);
};

/**
 * @param  {String} dependencyId The dependency ID to check
 * 
 * @return {Boolean} Whether this Stage depends on the given dependency ID
 */
Stage.prototype.dependsOn = function(dependencyId)
{
    return this._dependencyIds.indexOf(dependencyId) >= 0;
};

exports = module.exports = Stage;