var Stage = require("./Stage");
var DependencyManager = require("./DependencyManager");
var DependencyTranslator = require("./DependencyTranslator");

/**
 * A pipeline that consists of various stages, each with a set of dependencies. The stages will be
 * automatically triggered when dependencies are changed, but later stages that depend on other 
 * stages will wait until after the earlier stage has completed before executing. This saves on
 * needless processing.
 */
function Pipeline() {
    this._stages = [];
    this._dependencyManager = new DependencyManager();
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

Pipeline.prototype.getDependencyManager = function()
{
    return this._dependencyManager;
};

exports = module.exports = Pipeline;