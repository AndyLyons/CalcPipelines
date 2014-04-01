var assert = require("assert");
var Stage = require("../lib/Stage");

describe('Stage', function() {

    describe('#getDependencyIds', function() {

        it('returns no dependency IDs when an empty array was passed in to the constructor', function() {
            var stage = new Stage(null, [], null);
            var dependencyIds = stage.getDependencyIds();

            assert.equal(dependencyIds.length, 0);
        });

        it('returns one dependency ID when an one was passed in to the constructor', function() {
            var stage = new Stage(null, ["Test"], null);
            var dependencyIds = stage.getDependencyIds();

            assert.equal(dependencyIds.length, 1);
        });

        it('returns the same dependency ID that was passed in to the constructor', function() {
            var stage = new Stage(null, ["Test"], null);
            var dependencyIds = stage.getDependencyIds();

            assert.equal(dependencyIds[0], "Test");
        });

    });

    describe('#execute', function() {

        it('executes the function that was passed in to the constructor', function() {
            var hasExecuted = false;
            function execute() {
                hasExecuted = true;
            }

            var stage = new Stage(null, null, execute);
            stage.execute({});
            assert(hasExecuted);
        });

    });

});