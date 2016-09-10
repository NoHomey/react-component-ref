import ComponentRef from './../src';
import { TestComponent, TestProps } from './../__fixtures__/TestComponent';
import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

describe('ComponentRef', function () {

    it("should obtain ref", function () {
        const componentRef: ComponentRef<TestComponent> = new ComponentRef<TestComponent>();
        const wrapper: ShallowWrapper<TestProps, void> = shallow<TestProps, void>(<TestComponent type="e2e" count={1} />);
        componentRef.ref(wrapper.instance() as TestComponent);
        expect(componentRef.getComponent().getType()).toBe("e2e");
        expect(componentRef.getComponent().getCount()).toBe(1);
    });

    it("should help you stay DRY", function () {
        const componentRef1: ComponentRef<TestComponent> = new ComponentRef<TestComponent>();
        const wrapper1: ShallowWrapper<TestProps, void> = shallow<TestProps, void>(<TestComponent type="e2e" count={1} />);

        const componentRef2: ComponentRef<TestComponent> = new ComponentRef<TestComponent>();
        const wrapper2: ShallowWrapper<TestProps, void> = shallow<TestProps, void>(<TestComponent type="test" count={2} />);

        componentRef1.ref(wrapper1.instance() as TestComponent);
        expect(componentRef1.getComponent().getType()).toBe("e2e");
        expect(componentRef1.getComponent().getCount()).toBe(1);

        componentRef2.ref(wrapper2.instance() as TestComponent);
        expect(componentRef2.getComponent().getType()).toBe("test");
        expect(componentRef2.getComponent().getCount()).toBe(2);
    });
});