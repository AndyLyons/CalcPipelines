var sinon = require("sinon");
var assert = require("assert");
var DependencyManager = require("../lib/DependencyManager");
var DependencyTranslator = require("../lib/DependencyTranslator");

describe('DependencyManager', function() {
    var dependencyManager;

    beforeEach(function() {
        dependencyManager = new DependencyManager();
    });

    afterEach(function() {
        dependencyManager = null;
    });

    describe('#getDependencyTranslator', function() {

        it('returns null if no translator has been added', function() {
            var translator = dependencyManager.getDependencyTranslator("Test");

            assert.equal(translator, null);
        });

        it('returns a matching translator if one has been registered', function() {
            var translator = {};
            dependencyManager.addDependencyTranslator(translator, ["Test"]);

            var testTranslator = dependencyManager.getDependencyTranslator("Test");
            assert.equal(testTranslator, translator);
        });

        it('returns a matching translator if multiple dependencies have been registered to the same one', function() {
            var translator = {};
            dependencyManager.addDependencyTranslator(translator, ["Test", "Test2"]);

            var testTranslator = dependencyManager.getDependencyTranslator("Test");
            assert.equal(testTranslator, translator);

            var test2Translator = dependencyManager.getDependencyTranslator("Test2");
            assert.equal(test2Translator, translator);
        });

        it('returns matching translators if multiple dependencies have been registered to different translators', function() {
            var translator1 = {};
            var translator2 = {};
            dependencyManager.addDependencyTranslator(translator1, ["Test"]);
            dependencyManager.addDependencyTranslator(translator2, ["Test2"]);

            var testTranslator = dependencyManager.getDependencyTranslator("Test");
            assert.equal(testTranslator, translator1);

            var test2Translator = dependencyManager.getDependencyTranslator("Test2");
            assert.equal(test2Translator, translator2);
        });

        it('throws an error if a dependency has already been registered', function() {
            dependencyManager.addDependencyTranslator({}, ["Test"]);

            function throwsError() {
                dependencyManager.addDependencyTranslator({}, ["Test"]);
            }

            assert.throws(throwsError, Error);
        });

        it('still registers translators for dependency IDs given after the duplicate', function() {
            dependencyManager.addDependencyTranslator({}, ["Test2"]);
            var translator = {};
            var errorThrown = false;
            try {
                dependencyManager.addDependencyTranslator(translator, ["Test1", "Test2", "Test3"]);
            } catch(e) {
                // We expect an error to be thrown but we want to check the state afterwards, so we
                // just catch it and log that it was thrown
                errorThrown = true;
            }
            assert(errorThrown, "Expected error was not thrown");

            var test1Translator = dependencyManager.getDependencyTranslator("Test1");
            var test3Translator = dependencyManager.getDependencyTranslator("Test3");

            assert.equal(test1Translator, translator);
            assert.equal(test3Translator, translator);
        });

        it('logs all duplicated IDs in the error message when a dependency ID is already registered', function() {
            dependencyManager.addDependencyTranslator({}, ["Test1", "Test2"]);

            function throwsError() {
                dependencyManager.addDependencyTranslator({}, ["Test1", "Test2", "Test3"]);
            }

            function messageContainsDuplicatedIds(error) {
                return error.message.indexOf("Test1") >= 0 && error.message.indexOf("Test2") >= 0;
            }

            assert.throws(throwsError, messageContainsDuplicatedIds, "The error message did not contain all duplicate IDs");
        });

    });

    describe('[DependencyTranslator proxy functions]', function() {
        
        var translator1;
        var translator2;

        beforeEach(function() {
            // DependencyTranslator is an interface so has no implementation, but we just want these
            // to use as spies/stubs/mocks
            translator1 = new DependencyTranslator();
            translator2 = new DependencyTranslator();

            dependencyManager.addDependencyTranslator(translator1, ["Test1"]);
            dependencyManager.addDependencyTranslator(translator2, ["Test2", "Test3"]);
            dependencyManager.addDependencyTranslator(translator1, ["Test4"]);
        });

        afterEach(function() {
            translator1 = null;
            translator2 = null;
        });

        describe('#setDependency', function() {

            it('calls setDependency on the correct DependencyTranslator', function() {
                sinon.spy(translator1, "setDependency");

                dependencyManager.setDependency("Test1", "Foo");

                sinon.assert.calledWith(translator1.setDependency, "Test1", "Foo");
            });

            it('calls setDependency on the correct DependencyTranslator when multiple are set', function() {
                sinon.spy(translator2, "setDependency");

                dependencyManager.setDependency("Test3", "Bar");

                sinon.assert.calledWith(translator2.setDependency, "Test3", "Bar");
            });

        });

        describe('#getDependency', function() {

            it('calls getDependency on the correct DependencyTranslator', function() {
                sinon.spy(translator1, "getDependency");
                
                dependencyManager.getDependency("Test1");

                sinon.assert.calledWith(translator1.getDependency, "Test1");
            });

            it('calls getDependency on the correct DependencyTranslator when multiple are set', function() {
                sinon.spy(translator2, "getDependency");

                dependencyManager.getDependency("Test3");

                sinon.assert.calledWith(translator2.getDependency, "Test3");
            });

        });

        describe('#getDependencies', function() {

            it('calls getDependencies on the correct DependencyTranslator when only one dependency is requested', function() {
                sinon.spy(translator1, "getDependencies");
                
                dependencyManager.getDependencies(["Test1"]);

                sinon.assert.calledWith(translator1.getDependencies, ["Test1"]);
            });

            it('calls getDependencies on the correct DependencyTranslator when multiple are requested from the same one', function() {
                sinon.spy(translator1, "getDependencies");

                dependencyManager.getDependencies(["Test1", "Test4"]);

                sinon.assert.calledWith(translator1.getDependencies, ["Test1", "Test4"]);
            });

            it('calls getDependencies on all the correct DependencyTranslators when multiple dependencies are requested from different ones', function() {
                sinon.spy(translator1, "getDependencies");
                sinon.spy(translator2, "getDependencies");

                dependencyManager.getDependencies(["Test1", "Test2", "Test3", "Test4"]);

                sinon.assert.calledWith(translator1.getDependencies, ["Test1", "Test4"]);
                sinon.assert.calledWith(translator2.getDependencies, ["Test2", "Test3"]);
            });

        });
    
    });

});