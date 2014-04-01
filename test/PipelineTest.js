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
            pipeline.addStage(["Test"], function() {});
            var stages = pipeline.getStages();

            assert.equal(stages.length, 1);
        });

        it('returns two stages when two have been added', function() {
            pipeline.addStage(["Test"], function() {});
            pipeline.addStage(["MoreTest"], function() {});
            var stages = pipeline.getStages();

            assert.equal(stages.length, 2);
        });

        it('returns a stage that has the correct dependencies ', function() {
            pipeline.addStage(["Test"], function() {});
            var stages = pipeline.getStages();
            var dependencies = stages[0].getDependencyIds();

            assert.equal(dependencies.length, 1);
            assert.equal(dependencies[0], "Test");
        });

        it('returns a stage that executes the correct execution function ', function() {
            var hasExecuted = false;
            function execution() {
                hasExecuted = true;
            }

            pipeline.addStage(["Test"], execution);
            var stages = pipeline.getStages();
            stages[0].execute();

            assert(hasExecuted);
        });

    });

});