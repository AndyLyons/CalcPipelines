var sinon = require("sinon");
var assert = require("assert");
var Pipeline = require("../lib/Pipeline");

describe('Pipeline', function() {

    describe('#getStages', function () {
        var pipeline;

        beforeEach(function() {
            pipeline = new Pipeline();
        });

        afterEach(function() {
            pipeline = null;
        });

        it('returns a single stage when only one has been added', function() {
            pipeline.addStage(null, null);
            var stages = pipeline.getStages();

            assert.equal(stages.length, 1);
        });

        it('returns two stages when two have been added', function() {
            pipeline.addStage(null, null);
            pipeline.addStage(null, null);
            var stages = pipeline.getStages();

            assert.equal(stages.length, 2);
        });

        it('returns a stage that has the correct dependencies ', function() {
            pipeline.addStage(["Test"], null);
            var stages = pipeline.getStages();
            var dependencies = stages[0].getDependencyIds();

            assert.equal(dependencies.length, 1);
            assert.equal(dependencies[0], "Test");
        });

        it('returns a stage that executes the correct execution function ', function() {
            var execution = sinon.spy();
            pipeline.addStage(null, execution);
            var stages = pipeline.getStages();
            stages[0].execute();

            assert(execution.called);
        });

        it('returns a stage that calls the execution function with a reference to the correct Pipeline object', function() {
            var execution = sinon.spy();
            pipeline.addStage(null, execution)

            var stages = pipeline.getStages();
            stages[0].execute();

            sinon.assert.calledWith(execution, sinon.match.same(pipeline));
        });

    });

});