function Stage(pipeline, dependencyIds, executionFunction) {
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
 * Immediately invokes this Stage's execution function with the given dependency values.
 * 
 * @param  {Map} dependencyValues A map of dependency ID to values to execute this stage with.
 */
Stage.prototype.execute = function(dependencyValues)
{
    this._executionFunction();
};

/**
 * @param  {String} dependencyId The dependency ID to check
 * 
 * @return {Boolean} Whether this Stage depends on the given dependency ID
 */
Stage.prototype.dependsOn = function(dependencyId)
{
    // body...
};

exports = module.exports = Stage;