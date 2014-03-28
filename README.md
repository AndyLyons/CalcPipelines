CalcPipelines
=============

Manages calculations, triggering them in the correct order based on their dependencies

Notes
-----

Calc = new CalculationPipeline();

// Adds a FieldTranslator class which retrieves fields in a specific way (e.g. from trade model)
// and takes a list of fields that it should provide
Calc.addFieldTranslator(fieldTranslator, fields);

// Adds a calculation that is triggered when any of the inputs changes. 
// Records its outputs so Calc knows that anything with those outputs an 
// inputs depends on this calc first. Calculation is triggered on a timeout
// so that if two fields are changed in the same thread, the calc is performed
// once they're all changed
Calc.calculation = function(inputs, outputs, calcFunction);

// Sets the value of the field. Some kind of plugins to know how to set fields (e.g. trade model, plain old vars)
// Uses the registered field translator for that field. If none is provided falls back to a default (e.g. plain old vars)
FieldTranslator.set("Bid", value)
Calc.set("Bid", value); 

// returns "Bid" field. Some kind of plugins to know how to get fields (e.g. trade model, plain old vars)
// Uses the registered field translator for that field. If none is provided falls back to a default (e.g. plain old vars)
FieldTranslator.get("Bid")
Calc.get("Bid") 

// Listens to field "Bid" value changing. Some kind of plugins to know how to listen to fields (e.g. trade model, plain old vars)
// Uses the registered field translator for that field. If none is provided falls back to a default (e.g. plain old vars)
FieldTranslator.listen("Bid")
Calc.listen("Bid") 

// E.g. Bid changes to 2
// Two functions depend on bid. The second also depends on Bid and Ask
Calc.calculation(["Bid", "Ask"], function(dependencyValues) {
   Calc.set("Mid", (dependencyValues["Bid"]+dependencyValues["Ask"])/2 )
});
Calc.calculation(["Bid", "Ask", "Mid"], function() {});
Calc.calculation(["Ask","Mid"] function() {});