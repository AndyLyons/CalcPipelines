var assert = require("assert");
var pl = require("../.");

describe('Pipeline', function() {

    describe('#returnTrue()', function() {

        it('should return true every time', function() {
            var pipeline = new pl.Pipeline();
            assert(pipeline.returnTrue());
        });
        
    });

});