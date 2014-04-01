/**
 * An interface that needs to be implemented in order to provide dependencies to a Pipeline.
 */
function DependencyTranslator() {}

/**
 * Sets the value of the dependency with the given ID.
 * 
 * @param {String} dependencyId The ID of the dependency whose value should be set
 * @param {Value} value The value to set the dependency to
 */
DependencyTranslator.prototype.setDependency = function(dependencyId, value) {};

/**
 * Gets the value of the dependency with the given ID.
 * 
 * @param  {String} dependencyId The ID of the dependency whose value should be retrieved
 * 
 * @return {Value} The current value of the dependency with the given ID
 */
DependencyTranslator.prototype.getDependency = function(dependencyId) {};

/**
 * Gets the value of all the dependencies with the given IDs.
 * 
 * @param  {Array<String>} dependencyIds The IDs of the dependencies whose values should be retrieved
 * 
 * @return {Map<String, Value>} A map of dependency IDs to current dependency values
 */
DependencyTranslator.prototype.getDependencies = function(dependencyIds) {};

/**
 * Adds a change callback to the dependency with the given ID which will be called any time the
 * value of the dependency is changed.
 * 
 * @param  {String} dependencyId The ID of the dependency whose value should be retrieved
 * @param  {Function} changeCallback A function to be called when the value of the given dependency
 *                                   is changed. The signature of the function is as follows:
 *                                       function(dependencyId, newValue, oldValue) {}
 */
DependencyTranslator.prototype.listenToDependency = function(dependencyId, changeCallback) {};

exports = module.exports = DependencyTranslator;