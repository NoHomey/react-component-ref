import ComponentRef from './../src';
import TestComponent from './../__fixtures__/TestComponent';

describe('ComponentRef', function () {

    describe('constructor', function () {

        it('creates new ComponentRef', function () {
            const componentRef: ComponentRef<TestComponent> = new ComponentRef<TestComponent>();
            expect(componentRef instanceof ComponentRef).toBeTruthy();
        });

        it('creates new ComponentRef and stores callback to call when non null ref is obtained', function () {
            const onRef: jest.Mock<TestComponent> = jest.fn<TestComponent>();
            const componentRef: ComponentRef<TestComponent> = new ComponentRef<TestComponent>(onRef);
            expect(componentRef instanceof ComponentRef).toBeTruthy();
            expect(onRef).not.toBeCalled();
        });
    });

    describe('getComponent', function () {

        it('should return null when ref is not obtained', function () {
            const componentRef: ComponentRef<TestComponent> = new ComponentRef<TestComponent>();
            expect(componentRef.getComponent()).toBe(null);
        });
    });

    describe('ref', function () {

        it('sets component ref', function () {
            const component: TestComponent = new TestComponent({ type: "test", count: 9 });
            const componentRef: ComponentRef<TestComponent> = new ComponentRef<TestComponent>();
            componentRef.ref(component);
            expect(componentRef.getComponent()).toBe(component);
            expect(componentRef.getComponent().getType()).toBe("test");
            expect(componentRef.getComponent().getCount()).toBe(9);
        });

        it('should be this bound', function () {
            const component: TestComponent = new TestComponent({ type: "test", count: 9 });
            const componentRef: ComponentRef<TestComponent> = new ComponentRef<TestComponent>();
            const { ref } = componentRef;
            ref(component);
            expect(componentRef.getComponent()).toBe(component);
        });

        it('dose not call onRef if ref is null', function () {
            const onRef: jest.Mock<TestComponent> = jest.fn<TestComponent>();
            const componentRef: ComponentRef<TestComponent> = new ComponentRef<TestComponent>(onRef);
            componentRef.ref(null);
            expect(onRef).not.toBeCalled();
        });

        it('calls onRef if ref is not null', function () {
            const component: TestComponent = new TestComponent({ type: "test", count: 9 });
            const onRef: jest.Mock<TestComponent> = jest.fn<TestComponent>();
            const componentRef: ComponentRef<TestComponent> = new ComponentRef<TestComponent>(onRef);
            componentRef.ref(component);
            expect(onRef).toBeCalledWith(component);
        });
    });
});