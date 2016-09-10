import ComponentRef from './../src';
import TestComponent from './../fixtures/TestComponent';

describe('ComponentRef', function () {

    describe('constructor', function () {

        it('creates new ComponentRef', function () {
            const componentRef: ComponentRef<TestComponent> = new ComponentRef<TestComponent>();
            expect(componentRef.getComponent()).toBe(null);
        });

        it('stores callback to call when non null ref is obtained', function () {
            const onRef: jest.Mock<TestComponent> = jest.fn<TestComponent>();
            const componentRef: ComponentRef<TestComponent> = new ComponentRef<TestComponent>(onRef);
            expect(componentRef.getComponent()).toBe(null);
            expect(onRef).not.toBeCalled();
        });
    });

    describe('ref', function () {

        it('sets component ref', function () {
            const component: TestComponent = new TestComponent({ type: "test", count: 9 });
            const componentRef: ComponentRef<TestComponent> = new ComponentRef<TestComponent>();
            componentRef.ref(component);
            expect(componentRef.getComponent()).toBe(component);
        })
    })
});