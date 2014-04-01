var sinon = require("sinon");
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
            var execute = sinon.spy();
            var stage = new Stage(null, null, execute);
            stage.execute(null);

            sinon.assert.called(execute);
        });

        it('passes the pipeline object the Stage was constructed with into the execution function', function() {
            var pipeline = {};
            var execution = sinon.spy();

            var stage = new Stage(pipeline, null, execution);
            stage.execute(null);

            sinon.assert.calledWith(execution, sinon.match.same(pipeline));
        });

        it('passes the given dependency values into the execution function as the second argument', function() {
            var execution = sinon.spy();
            var dependencyValues = { Test : true };

            var stage = new Stage(null, null, execution);
            stage.execute(dependencyValues);

            sinon.assert.calledWith(execution, sinon.match.any, dependencyValues);
        });

    });

    describe('#dependsOn', function() {

        it('returns true if the dependency ID is in the list of dependencies passed in to the constructor', function() {
            var stage = new Stage(null, ["Test"], null);
            var dependsOnTest = stage.dependsOn("Test");

            assert(dependsOnTest);
        });

        it('returns false if the dependency ID is not in the list of dependencies passed in to the constructor', function() {
            var stage = new Stage(null, ["Test"], null);
            var dependsOnTest = stage.dependsOn("Foo");

            assert(!dependsOnTest);
        });

    });

});