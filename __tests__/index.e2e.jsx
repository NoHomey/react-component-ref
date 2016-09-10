"use strict";
var src_1 = require('./../src');
var TestComponent_1 = require('./../fixtures/TestComponent');
var enzyme_1 = require('enzyme');
describe('ComponentRef', function () {
    it("should obtain ref", function () {
        var componentRef = new src_1.default();
        var wrapper = enzyme_1.shallow(<TestComponent_1.TestComponent type="e2e" count={1} ref={componentRef.ref}/>);
        expect(componentRef.getComponent().getType()).toBe("e2e");
    });
});
